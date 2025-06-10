import { model, Schema }  from "mongoose";
import recipeModel from "./recipe.model";

const categorySchema=new Schema({
    desc: { type: String, required: true },
    recipesCount: { type: Number, default: 0 },
    recipesArr: {
        type: [{
            _id: { type: Schema.Types.ObjectId},
            name: { type: String },
            desc: { type: String },
            ownerName: { type: String },
        }],default:[]
    }
})
export default model('category',categorySchema)