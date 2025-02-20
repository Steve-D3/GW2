import { Request, Response } from "express";
import categoriesModel from "../models/categoriesModel";

// CRUD
// CREATE
export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({ message: "Missing fields" });
        }
        const newCategory = new categoriesModel({ name, description });
        await newCategory.save();
        res.status(201).json({ name, description });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// READ
export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await categoriesModel.find();
        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getCategory = async (req: Request, res: Response) => {
    try {
        const category = await categoriesModel.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(category);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// UPDATE   
export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.params;
        const { description } = req.body;
        const category = await categoriesModel.findOne({ name: name });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        await categoriesModel.findByIdAndUpdate(
            category._id,
            { description },
            { new: true }
        )

        res.status(200).json({ status: "Category updated", data: category });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// DELETE
export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.params;
        const category = await categoriesModel.findOne({ name: name });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const toDelete = await categoriesModel.findByIdAndDelete(category._id);        
        res.status(200).json({ status: "Category deleted", data: toDelete });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}