import { model, Schema }  from "mongoose";
import recipeModel from "./recipe.model";

const categorySchema=new Schema({
    code:Number,
    description:String,
    countRecipes:Number,
    arrRecipes:[]
})
export default model('category',categorySchema)