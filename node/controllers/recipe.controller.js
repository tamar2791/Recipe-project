/*
    router.get("/",getAllRecipes);✅
    router.get("/",getAllMyRecipes);✅
    router.get("/:id", getRecipeById);✅
    router.get("/:preper-time", getRecipeByPreperTime);✅
    router.post("/", addRecipe);
    router.put("/:id", updateRecipe);
    router.delete("/:id", deleteRecipe);
*/
import Recipe from '../models/recipe.model.js'

export const getAllRecipes = async (req, res, next) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        next({ message: error.message });
    }
}

export const getAllMyRecipes = async (req, res, next) => {
    try {
        const { _id } = req.myUser;
        const recipes = await Recipe.find(r => r.owner._id == _id)
        res.json(recipes)
    } catch (error) {
        next({ message: error.message })
    }
}

export const getRecipeById = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const recipe = await Recipe.findById(_id);
        if (!recipe)
            return next({ message: 'recipe not found', status: 404 })
        res.json(recipe);
    } catch (error) {
        next({ message: error.message });
    }
}

export const getRecipeByPreperTime = async (req, res, next) => {
    try {
        const { preparTime } = req.body;
        const recipes = await Recipe.find(r => r.preparTime <= preparTime)
        res.json(recipes);
    } catch (error) {
        next({ message: error.message });
    }
}

export const addRecipe = async (req, res, next) => {
    try {
        if (!req.myUser)
            return next({ message: 'you must login to add recipe', status: 400 })
        const { _id, userName } = req.myUser
        const recipeData = {
            ...req.body,
            owner: {
                _id: _id,
                name: userName
            }
        };
        const newRecipe = new Recipe(recipeData);
        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (error) {
        next({ message: error.message })
    }
}

export const updateRecipe = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { _id } = req.myUser;
        if (id !== req.body._id)
            return next({ message: 'id conflict', status: 409 })
        const recipe = await Recipe.findById(id)
        if (!recipe)
            return next({ message: 'recipe not found', status: 404 })
        if (recipe.owner._id !== _id)
            return next({ message: `you can't update recipe that you don't own.`, status: 403 })
        const updateRecipe = await Recipe.findByIdAndUpdate(id, {
            $set: { ...recipe, ...req.body }
        })
        res.json(updateRecipe)
    } catch (error) {
        next({ message: error.message })
    }
}

export const deleteRecipe = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { _id } = req.myUser;
        if (id !== req.body._id)
            return next({ message: 'id conflict', status: 409 })
        const recipe = await Recipe.findById(id)
        if (!recipe)
            return next({ message: 'recipe not found', status: 404 })
        if (recipe.owner._id !== _id)
            return next({ message: `you can't delete recipe that you don't own.`, status: 403 })
        await Recipe.findByIdAndDelete(id)
        res.json({message:'Recipe deleted succesfully'})
    } catch (error) {
        next({ message: error.message })
    }
}