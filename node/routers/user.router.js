import { Router } from "express";
import { deleteUser, getAllUsers, login, register, updatePassword } from "../controllers/user.controller.js";
import { auth } from "../middleweres/checkAuth.middleware.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/", getAllUsers);
router.put("/:id",auth,  updatePassword);
router.delete ("/:id",auth, deleteUser);

export default router;