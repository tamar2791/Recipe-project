import User, { generateToken } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const login=async (req,res,next)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({ email: email});
        if (!user) {
            return next({ message: 'user not found', status: 401 });
        }
        const isAuth=await bcrypt.compare(password, user.password);
        if (!isAuth) {
            return next({ message: 'user not found', status: 401 });
        }
        const token = generateToken(user);
        res.json({name: user.userName, token, role: user.role});
        next();
    } catch (error) {
        next({ message:error.message});
    }
}

export const register = async (req, res, next) => {
    try {
        const { userName,password,email,address } = req.body;
        const user = new User({ userName,password,email,address });
        await user.save();
        console.log("ggg");
        user.password = '****';
        const token = generateToken(user);
        res.json({ name: user.name, token,role: user.role });
    } catch (error) {
        next({ message: error.message });
    }
}

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        next({ message: error.message });
    }
}

export const updatePassword = async (req, res, next) => {
    try {
        const { _id } = req.myUser;
        const { oldPassword,newPassword } = req.body;
        if(oldPassword!=req.myUser.password)
            return next({ message: 'password conflict', status: 409});
        const user = await User.findById(_id);
        if (!user) {
            return next({ message: 'user not found', status: 404 });
        }
        user.password = newPassword;
        await user.save();
        res.json({ message: 'password updated successfully' });
    } catch (error) {
        next({ message: error.message });
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const { _id } = req.myUser;
        const user = await User.findById(_id);
        if (!user) {
            return next({ message: 'user not found', status: 404 });
        }
        await User.deleteOne({ _id });
        res.json({ message: 'user deleted successfully' });
    } catch (error) {
        next({ message: error.message });
    }
}