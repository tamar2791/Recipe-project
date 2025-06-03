import { model, Schema }  from "mongoose";

const categorySchema=new Schema({
    code:Number,
    description:String,
    countRecipes:Number,
    arrRecipes:[]
})
export default model('category',categorySchema)