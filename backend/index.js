import express from "express";
import cors from "cors";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { pool } from "./db.js";



// setup
const app = express();

app.use(cors()); // change once frontend path is known SECURITY
app.use(express.json());



// main logic

app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    // check for missing fields
    if (!username || !password) {
        return res.status(400).json({error: "Required fields are missing or empty"});
    }

    // check password strength
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}\[\]~]).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({error: "Password must be at least 8 characters long, include one " + 
                                            "lowercase, one uppercase, one digit and one special character"});
    }

    try {
        // hash password
        const hashedPassword = await argon2.hash(password);

        // add user to database
        const { rows } = await pool.query(
            "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
            [username, hashedPassword]
        );

        res.status(200).json({message: "User created", id: rows[0].id});
        
    } catch (err) {
        // check for username uniqueness violation
        if (err.code === "23505") {
            return res.status(400).json({error: "Username already taken"});
        }

        // server error
        console.error(err);
        res.status(500).json({error: "Internal server error"});
    }
});


app.post("/login", async (req, res) => {
    const { username, password } = req.body;

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






// run server
const PORT = 5555;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});