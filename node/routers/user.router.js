import { Router } from "express";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/", getAllUsers);
router.put("/:id", updatePassword);
router.delete ("/:id", deleteUser);

export default router;