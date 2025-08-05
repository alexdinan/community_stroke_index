import express from "express";
import cors from "cors";
import { pool } from "./db.js";


const app = express();


app.use(cors()); // change once frontend path is known SECURITY
app.use(express.json());


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});