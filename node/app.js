import express from "express";
import { connectDB } from "./config/db.js";
import { config } from "dotenv";
import userRouter from "./routers/user.router.js";
import recipeRouter from "./routers/recipe.router.js";
import categoryRouter from "./routers/category.router.js";

config();

connectDB();

const app=express();

app.use(userRouter);
app.use(recipeRouter);
app.use(categoryRouter);

app.listen(process.env.PORT||5000, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT||5000}`);
});