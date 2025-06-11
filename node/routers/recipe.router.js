import { Router } from "express";
import { addRecipe, deleteRecipe, getAllMyRecipes, getAllRecipes, getRecipeById, getRecipeByPreperTime, updateRecipe } from "../controllers/recipe.controller.js";
import { auth } from "../middleweres/checkAuth.middleware.js";

const router=Router();

router.get("/",getAllRecipes);
router.get("/",auth, getAllMyRecipes);
router.get("/:id", getRecipeById);
router.get("/:preper-time", getRecipeByPreperTime);
router.post("/",auth,  addRecipe);
router.put("/:id",auth,  updateRecipe);
router.delete("/:id",auth,  deleteRecipe);

export default router;
