import express from "express";
import { connectDB } from "./config/db.js";

connectDB();

const app=express();
app.listen(process.env.PORT||5000, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT||5000}`);
});