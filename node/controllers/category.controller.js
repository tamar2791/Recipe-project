import Category from '../models/category.model.js'
export const getAllCategories=async(req,res,next)=>{
    try {
        const categories=await Category.find();
        res.json(categories)
    } catch (error) {
        next({message:error.message})
    }
}

export const getAllCategoriesAndRecipes=async(req,res,next)=>{
    try {
        const categories=await Category.find().populate('recipes');
        res.json(categories)
    } catch (error) {
        next({message:error.message})
    }
}

export const getCategoryById=async(req,res,next)=>{
    try {
        const {_id}=req.params;
        const category=await Category.findById(_id).populate('recipes');
        res.json(category);
    } catch (error) {
        next({message:error.message});
    }
}