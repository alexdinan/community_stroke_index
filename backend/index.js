import express from "express";
import cors from "cors";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { pool } from "./db.js";

// setup
const app = express();
app.use(cors()); // change once frontend path is known SECURITY
app.use(express.json());


// middleware to authenticate JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token missing" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token" });
    req.user = user;
    next();
  });
}


// reusable fetch logic from external API
async function fetchFromGolfAPI(endpoint, errorMessages={}) {
    try {
        const response = await fetch(
            `${process.env.GOLF_API_URL}${endpoint}`,
            { headers: { Authorization: `Key ${process.env.GOLF_API_KEY}` } }
        );

        if (!response.ok) {
            const msg = errorMessages[response.status] || "External API error";
            throw { status: response.status, message: msg };
        }

        return await response.json();
    } catch (err) {
        if (err.status && err.message) throw err;
        console.error(err);
        throw { status: 500, message: "Internal server error" };
    }
}


app.post("/register", async (req, res) => {
    const { username, password } = req.body || {};

    // check for missing fields
    if (!username || !password) {
        return res.status(400).json({ error: "Required fields are missing or empty" });
    }

    // check password strength
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!.@#$%^&*()_\-+=<>?{}\[\]~]).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: "Password must be at least 8 characters long, include one " + 
                                            "lowercase, one uppercase, one digit and one special character" });
    }

    try {
        // hash password
        const hashedPassword = await argon2.hash(password);

        // add user to database
        const { rows } = await pool.query(
            "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
            [username, hashedPassword]
        );

        res.status(200).json({ message: "User created", id: rows[0].id });
        
    } catch (err) {
        // check for username uniqueness violation
        if (err.code === "23505") {
            return res.status(400).json({ error: "Username already taken" });
        }

        // server error
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.post("/login", async (req, res) => {
    const { username, password } = req.body || {};

    // check for missing fields
    if (!username || !password) {
        return res.status(400).json({ error: "Required fields are missing or empty" });
    }

    try {
        // get user from database
        const { rows } = await pool.query(
            "SELECT id, password FROM users WHERE username = $1",
            [username]
        );

        // username does not exist
        if (rows.length === 0) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        // check password matches
        const validPassword = await argon2.verify(rows[0].password, password);
        if (!validPassword) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        // generate and sign JWT
        const token = jwt.sign(
            { id: rows[0].id, username },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRY }
        );

        res.status(200).json({ message: "Login success", token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.get("/courses", async (req, res) => {
    const { search } = req.query;

    // check for missing fields
    if (!search) {
        return res.status(400).json({ error: "Required fields are missing or empty" });
    }

    try {
        const data = await fetchFromGolfAPI(
            `/search?search_query=${encodeURIComponent(search)}`,
            {
                401: "External API key is invalid/revoked",
                429: "External API quota exceeded",
            }
        );
        res.status(200).json(data);
    } catch (err) {
        res.status(err.status).json({ error: err.message });
    }
});


app.get("/course/:id", async (req, res) => {
    const { id } = req.params;

    // id must be a positive integer
    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ error: "Course id must be an integer"});
    }

    try {
        const data = await fetchFromGolfAPI(`/courses/${id}`, {
            401: "External API key is invalid/revoked",
            429: "External API quota exceeded",
            404: "No course with provided id exists",
        });
        res.status(200).json(data);
    } catch (err) {
        res.status(err.status).json({ error: err.message });
    }
});


app.post("/assignment", authenticateToken, async (req, res) => {
    const { courseId, teeGender, teeName, assignment } = req.body || {};
    const userId = req.user.id;

    // check for missing fields
    if (!courseId || !teeGender || !teeName || !assignment) {
        return res.status(400).json({error: "Required fields are missing or empty"});
    }
    // ensure tee gender is valid
    if (teeGender != "male" && teeGender != "female") {
        return res.status(400).json({error: "Tee gender must be either male or female"});
    }

    try {
        // fetch course details from external API
        const courseData = await fetchFromGolfAPI(`/courses/${courseId}`, {
            401: "External API key is invalid/revoked",
            404: "No course with provided id exists",
            429: "External API quota exceeded",
        });

        // ensure tee name exists
        const teesForGender = courseData.course.tees[teeGender];
        const selectedTee = teesForGender?.find(tee => tee.tee_name === teeName);
        if (!selectedTee) {
            return res.status(400).json({ error: `Tee '${teeName}' not found for gender '${teeGender}'` });
        }
        
        // check validity of assignments list
        if (!Array.isArray(assignment) || assignment.length === 0) {
            return res.status(400).json({ error: "Assignment must be a non-empty array" });
        }
        const numHoles = selectedTee.holes.length;

        // validate strokeIndex values
        const strokeIndexes = assignment.map(a => a.strokeIndex);
        if (!strokeIndexes.every(idx => Number.isInteger(idx))) {
            return res.status(400).json({ error: "All strokeIndex values must be integers" });
        }
        if (!strokeIndexes.every(idx => idx >= 1 && idx <= numHoles)) {
            return res.status(400).json({ error: `All strokeIndex values must be between 1 and ${numHoles}` });
        }
        const uniqueStrokeIndexes = new Set(strokeIndexes);
        if (uniqueStrokeIndexes.size !== numHoles) {
            return res.status(400).json({ error: `Assigned strokeIndexes must be unique and cover 1 to ${numHoles}` });
        }

        // Validate holeNumber values
        const holeNumbers = assignment.map(a => a.holeNumber);
        if (!holeNumbers.every(h => Number.isInteger(h))) {
            return res.status(400).json({ error: "All holeNumber values must be integers" });
        }
        if (!holeNumbers.every(h => h >= 1 && h <= numHoles)) {
            return res.status(400).json({ error: `All holeNumber values must be between 1 and ${numHoles}` });
        }
        const uniqueHoles = new Set(holeNumbers);
        if (uniqueHoles.size !== numHoles) {
            return res.status(400).json({ error: `holeNumber values must be unique and cover 1 to ${numHoles}` });
        }

    } catch (err) {
        return res.status(err.status || 500).json({ error: err.message });
    }

    let client;
    try {
        client = await pool.connect();
        await client.query("BEGIN");

        // insert into assignments relation
        const { rows } = await client.query(
            `INSERT INTO stroke_index_assignments (user_id, course_id, tee_gender, tee_name)
            VALUES ($1, $2, $3, $4) RETURNING id`,
            [userId, courseId, teeGender, teeName]
        );
        const assignmentId = rows[0].id;

        // insert each S.I value
        const insertPromises = assignment.map(ass =>
            client.query(
                `INSERT INTO stroke_index_values (assignment_id, hole_number, stroke_index)
                VALUES ($1, $2, $3)`,
                [assignmentId, ass.holeNumber, ass.strokeIndex]
            )
        );
        await Promise.all(insertPromises);

        // commit databse changes - atomicity
        await client.query("COMMIT");
        res.status(200).json({ message: "Assignment saved", assignmentId });

    } catch (err) {
        if (client) await client.query("ROLLBACK");
        console.error(err);
        res.status(500).json({ error: "Database error: Failed to save assignment" });
    } finally {
        if (client) client.release();
    }
});


// run server
const PORT = 5555;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});