import { Response, Request } from "express";
import productsModel from "../models/productsModel";
import categoriesModel from "../models/categoriesModel";



// CRUD
// CREATE
export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price, stock, category_name, image_url, created_at } = req.body;
        if (!name || !description || !price || !stock || !category_name || !image_url) {
            res.status(400).json({ message: "Missing fields" });
            return;
        }

        const category = await categoriesModel.findOne({ name: category_name });
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }

        const newProduct = new productsModel({
            name,
            description,
            price,
            stock,
            category: category, // Include full category information
            image_url,
            created_at
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const addImage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { image_url } = req.body;

        const product = await productsModel.findById(id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }

        const newImageId = product.image_url.length + 1;
        const newImage = { id: newImageId, url: image_url };

        const updatedProduct = await productsModel.findByIdAndUpdate(
            id,
            { $push: { image_url: newImage } },
            { new: true }
        )

        res.status(200).json({ status: "success", data: updatedProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// READ
export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await productsModel.find();
        res.status(200).json(products);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await productsModel.findById(id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getProductsByCategory = async (req: Request, res: Response) => {
    try {
        const { category_name } = req.params;

        // Find the category by name
        const category = await categoriesModel.findOne({ name: category_name });
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }

        // Find products by category ID
        const products = await productsModel.find({ category_id: category._id });
        if (!products.length) {
            res.status(404).json({ message: "No products found for this category" });
            return;
        }

        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getProductsByPriceRange = async (req: Request, res: Response) => {
    try {
        // Extract lower and upper bounds of the price range from query parameters
        const { lower, upper } = req.query;

        // Validate that both lower and upper bounds are provided
        if (!lower || !upper) {
            res.status(400).json({ message: "Missing price range parameters" });
            return;
        }

        // Find products within the specified price range
        const products = await productsModel.find({
            price: { $gte: Number(lower), $lte: Number(upper) }
        });

        // Check if any products were found
        if (!products.length) {
            res.status(404).json({ message: "No products found within the given price range" });
            return;
        }

        // Return the found products
        res.status(200).json(products);
    } catch (error) {
        // Log the error and return a 500 status code with an error message
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getImages = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await productsModel.findById(id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return
        }
        res.status(200).json(product.image_url);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// UPDATE
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const itemToUpdate = await productsModel.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true }
        )

        if (!itemToUpdate) {
            res.status(404).json({ message: "Product not found" });
            return;
        }

        res.status(200).json({ status: "success", data: itemToUpdate });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// DELETE
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedProduct = await productsModel.findByIdAndDelete({ _id: id });
        if (!deletedProduct) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json({ message: "Product deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteImage = async (req: Request, res: Response) => {
    try {
        const { id, image_id } = req.params;
        const product = await productsModel.findById(id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }

        const updatedImages = product.image_url.filter((image) => image.id !== Number(image_id));
        const updatedProduct = await productsModel.findByIdAndUpdate(
            id,
            { image_url: updatedImages },
            { new: true }
        )

        res.status(200).json({ status: "success", data: updatedProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}