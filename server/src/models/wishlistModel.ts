import mongoose from "mongoose";
import { WishlistType } from "../types";

const wishlistSchema = new mongoose.Schema<WishlistType>({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,  
      ref: "Products", 
      required: true,
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});



export default mongoose.model("Wishlist", wishlistSchema);
