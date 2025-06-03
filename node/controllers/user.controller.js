/*
    router.post("/login", login);
    router.post("/register", register);
    router.get("/", getAllUsers);
    router.put("/:id", updatePassword);
    router.delete ("/:id", deleteUser);
*/
import User from "../models/user.model.js";

export const login=async (req,res,next)=>{
    try {
        const {userName,password}=req.body;
        const user=await User.find(u=>u.userName===userName && u.password===password);
        if (!user) {
            return next({ message: 'user not found', status: 401 });
        }
    } catch (error) {
        
    }
}