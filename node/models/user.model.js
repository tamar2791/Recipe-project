import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi from "joi";

const userSchema=new Schema({
    userName:{ type: String, required: true },
    password:{ type: String, required: true },
    email:{ type: String,unique: true, required: true },
    address:String,
    role:{ type: String, enum: ['admin', 'user'], default: 'user' }
})
userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
})

export const generateToken = (user) => {
    const jwtSecret=process.env.JWT_SECRET || 'JWT_SECRET';
    const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, {
        expiresIn: '5m',
    });
    return token;
}
export default model('user',userSchema)