import { model, Schema } from "mongoose";

const userSchema=new Schema({
    userName:{ type: String, required: true },
    password:{ type: String, required: true },
    email:{ type: String,unique: true, required: true },
    address:String,
    role:{ type: String, enum: ['admin', 'user'], default: 'user' }
})
export default model('user',userSchema)