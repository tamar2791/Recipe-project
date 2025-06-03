import { Router } from "express";

const router=Router();

router.get("/",getAllCategories);
router.get("/",getAllCategoriesAndRecipes);
router.get("/:id", getCategoryById);

export default router;
