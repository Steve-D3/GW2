import { Response, Request } from "express";
import wishlistModel from "../models/wishlistModel";
import mongoose from "mongoose";

// CRUD
// CREATE
// export const createWishlist = async (req: Request, res: Response) => {
//     try {
//         const { user_id, products } = req.body;
//         if (!user_id || !products ) {
//             res?.status(400).json({ message: "Missing fields" });
//             return;
//         }
//         const newWishlist = new wishlistModel({ user_id, products });
//         await newWishlist.save();
//         res?.status(201).json({ user_id, products});
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// READ
// export const getWishlist = async (req: Request, res: Response) => {
//     try {
//         const  { id } = req.params;
//         const wishlist = await wishlistModel.findById(id);
//         if (!wishlist) {
//             res?.status(404).json({ message: "Wishlist not found" });
//             return;
//         }
//         res?.status(200).json(wishlist);
//     } catch (error) {
//         console.log(error);
//         res?.status(500).json({ message: "Internal server error" });
//     }
// };

// get wishlist by user_id
export const getWishlist = async (request: Request, response: Response) => {
//http://localhost:3000/api/wishlist/67e02844e9804c91febbdd0e
  try {
    const { user_id } = request.params;
    const wishlist = await wishlistModel.findOne({ user_id });
    if (!wishlist) {
      response.status(404).json({ message: "Wishlist not found" });
      return;
    }
    response.status(200).json(wishlist);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal server error" });
  }
};

//create wishlist or add product to wishlist

export const addOrCreateWishlist = async (req: Request, res: Response) => {
  try {
    const { user_id, productId } = req.body; // Expecting user_id and productId in the body

    if (!user_id || !productId) {
      res.status(400).json({ message: "Missing user_id or productId" });
      return;
    }

    // Check if the user already has a wishlist
    let wishlist = await wishlistModel.findOne({ user_id });

    if (!wishlist) {
      // If no wishlist exists, create a new one with the product
      wishlist = new wishlistModel({
        user_id,
        products: [productId],
      });
      await wishlist.save();
      res
        .status(201)
        .json({ message: "Wishlist created and product added", wishlist });
      return;
    }

    // If wishlist exists, check if the product is already in the wishlist
    if (wishlist.products.includes(productId)) {
      res.status(400).json({ message: "Product is already in the wishlist" });
      return;
    }

    // Add the product to the wishlist
    wishlist.products.push(productId);
    await wishlist.save();

    res.status(200).json({ message: "Product added to wishlist", wishlist });
  } catch (error) {
    console.error(error);
   res.status(500).json({ message: "Internal server error" });
  }
};

// UPDATE
export const addOrUpdateProductInWishlist = async (
  req: Request,
  res: Response
) => {
  try {
    const { user_id } = req.params;
    const { product_id } = req.body;

    // Validate input
    if (!user_id || !product_id) {
      res.status(400).json({ message: "Missing fields" });
      return;
    }

    // Check if the product already exists in the wishlist
    const wishlist = await wishlistModel.findOne({
      user_id,
      "products.product_id": product_id,
    });

    if (wishlist) {
      // Update the quantity of the existing product
      const updateWishlist = await wishlistModel
        .findOneAndUpdate(
          { user_id, "products.product_id": product_id },

          { new: true }
        )
        .populate("products");
      res.status(200).json({ status: "Success", updateWishlist });
    } else {
      // Add the new product to the wishlist
      const updateWishlist = await wishlistModel
        .findOneAndUpdate(
          { user_id },
          { $addToSet: { products: { product_id } } },
          { new: true, upsert: true }
        )
        .populate("products");
      res.status(200).json({ status: "Success", updateWishlist });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE

export const deleteProductFromWishlist = async (req: Request, res: Response) => {
  try {
    const { user_id, product_id } = req.params;  // Get from params

    // Check if the wishlist exists
    const wishlist = await wishlistModel.findOne({ user_id });
    if (!wishlist) {
     res.status(404).json({ message: "Wishlist not found" }); return 
    }

    // Remove the product from the wishlist
    const updatedWishlist = await wishlistModel.findOneAndUpdate(
      { user_id },
      { $pull: { products: product_id } },
      { new: true } 
    ).populate("products"); 

    // Respond with the updated wishlist
    res.status(200).json({ status: "Success", updatedWishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// export const deleteWishlist = async (req: Request, res: Response) => {
//   try {
//     const { user_id } = req.params;

//     // Check if the wishlist exists
//     const wishlist = await wishlistModel.findOne({ user_id });
//     if (!wishlist) {
//       res?.status(404).json({ message: "Wishlist not found" });
//       return;
//     }

//     // Delete the wishlist
//     await wishlistModel.deleteOne({ user_id });
//     res.status(200).json({ message: "Wishlist deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting wishlist:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };


export const clearWishlist = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;

    const wishlist = await wishlistModel.findOne({ user_id });
    if (!wishlist) {
      res.status(404).json({ message: "Wishlist not found" });
      return;
    }


    wishlist.products = [];
    await wishlist.save(); 

    res.status(200).json({ message: "Wishlist cleared successfully" });
  } catch (error) {
    console.error("Error clearing wishlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};