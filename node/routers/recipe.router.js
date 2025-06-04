import { Router } from "express";

const router=Router();

router.get("/",getAllRecipes);
router.get("/",getAllMyRecipes);
router.get("/:id", getRecipeById);
router.get("/:preper-time", getRecipeByPreperTime);
router.post("/", addRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

export default router;
