import { Response, Request } from "express";
import wishlistModel from "../models/wishlistModel";

// CRUD
// CREATE
export const createWishlist = async (req: Request, res: Response) => {
    try {
        const { user_id, products } = req.body;
        if (!user_id || !products) {
            return res.status(400).json({ message: "Missing fields" });
        }
        const newWishlist = new wishlistModel({ user_id, products });
        await newWishlist.save();
        res.status(201).json({ user_id, products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// READ
export const getWishlist = async (req: Request, res: Response) => {
    try {
        const wishlist = await wishlistModel.findById(req.params.id);
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }
        res.status(200).json(wishlist);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// UPDATE
export const addOrUpdateProductInWishlist = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;
        const { product_id, quantity } = req.body;

        // Validate input
        if (!user_id || !product_id || !quantity) {
            return res.status(400).json({ message: "Missing fields" });
        }

        // Check if the product already exists in the wishlist
        const wishlist = await wishlistModel.findOne({ user_id, "products.product_id": product_id });

        if (wishlist) {
            // Update the quantity of the existing product
            const updateWishlist = await wishlistModel.findOneAndUpdate(
                { user_id, "products.product_id": product_id },
                { $set: { "products.$.quantity": quantity } },
                { new: true }
            ).populate("products");
            res.status(200).json({ status: "Success", updateWishlist });
        } else {
            // Add the new product to the wishlist
            const updateWishlist = await wishlistModel.findOneAndUpdate(
                { user_id },
                { $addToSet: { products: { product_id, quantity } } },
                { new: true, upsert: true }
            ).populate("products");
            res.status(200).json({ status: "Success", updateWishlist });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}



// DELETE
export const deleteProductFromWishlist = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;
        const { product_id } = req.body;

        // Check if the wishlist exists
        const wishlist = await wishlistModel.findOne({ user_id });
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        const updateWishlist = await wishlistModel.findOneAndUpdate(
            { user_id },
            { $pull: { products: { product_id } } },
            { new: true }
        ).populate("products");
        res.status(200).json({ status: "Success", updateWishlist });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteWishlist = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;

        // Check if the wishlist exists
        const wishlist = await wishlistModel.findOne({ user_id });
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        // Delete the wishlist
        await wishlistModel.deleteOne({ user_id });
        res.status(200).json({ message: "Wishlist deleted successfully" });
    } catch (error) {
        console.error("Error deleting wishlist:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}