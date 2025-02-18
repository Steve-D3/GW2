import { Response, Request } from "express";
import productsModel from "../models/productsModel";



// CRUD
// Create
export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price, stock, category_id, image_url, created_at } = req.body;
        if (!name || !description || !price || !stock || !category_id || !image_url) {
            return res.status(400).json({message: "Missing fields"});
        }
        const newUser = new productsModel({ name, description, price, stock, category_id, image_url, created_at });
        res.status(201).json(newUser);
        return newUser.save();
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
        return error;
    }
};

// Read
export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await productsModel.find();
        res.status(200).json(products);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
};

