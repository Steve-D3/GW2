import { Response, Request } from "express";
import wishlistModel from "../models/wishlistModel";

// CRUD
// CREATE
export const createWishlist = async (req: Request, res: Response) => {
    try {
        const { user_id, products , total_price} = req.body;
        if (!user_id || !products || !total_price) {
            res?.status(400).json({ message: "Missing fields" });
            return;
        }
        const newWishlist = new wishlistModel({ user_id, products , total_price});
        await newWishlist.save();
        res?.status(201).json({ user_id, products, total_price });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// READ
export const getWishlist = async (req: Request, res: Response) => {
    try {
        const  { id } = req.params;
        const wishlist = await wishlistModel.findById(id);
        if (!wishlist) {
            res?.status(404).json({ message: "Wishlist not found" });
            return;
        }
        res?.status(200).json(wishlist);
    } catch (error) {
        console.log(error);
        res?.status(500).json({ message: "Internal server error" });
    }
};

// UPDATE
export const addOrUpdateProductInWishlist = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;
        const { product_id, quantity } = req.body;

        // Validate input
        if (!user_id || !product_id || !quantity) {
            res.status(400).json({ message: "Missing fields" });
            return;
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
            res?.status(404).json({ message: "Wishlist not found" })
            return;
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
            res?.status(404).json({ message: "Wishlist not found" })
            return;
        }

        // Delete the wishlist
        await wishlistModel.deleteOne({ user_id });
        res.status(200).json({ message: "Wishlist deleted successfully" });
    } catch (error) {
        console.error("Error deleting wishlist:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}