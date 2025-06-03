import { model, Schema } from "mongoose";

const recipeSchema = new Schema({
    name: String,
    description: String,
    categories: [],
    preparationTime: Number,
    difficultyLevel: { type: Number, min: 1, max: 5 },
    dateAdded: { type: Date, default: Date.now },
    arrLayers:[{
        description: String,
        ingredients:[String]
    }],
    instructions:[String],
    img:String,
    isPrivate: { type: Boolean, default: true },
    owner:{}
})
export default model('recipe', recipeSchema);