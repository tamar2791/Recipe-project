import express from "express";
import cors from 'cors'
import { connectDB } from "./config/db.js";
import { config } from "dotenv";
import userRouter from "./routers/user.router.js";
import recipeRouter from "./routers/recipe.router.js";
import categoryRouter from "./routers/category.router.js";
import { errorHandler, notFound } from "./middleweres/error.middleware.js";

config();

connectDB();

const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/user',userRouter);
app.use('/recipe',recipeRouter);
app.use('/category',categoryRouter);

app.use(notFound,errorHandler);

app.listen(process.env.PORT||5000, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT||5000}`);
});