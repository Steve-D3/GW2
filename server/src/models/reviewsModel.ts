import mongoose from "mongoose";
import { ReviewType } from "../types";


const reviewsSchema = new mongoose.Schema<ReviewType>({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
    },
    comment: {
        type: String,
        required: true,
        trim: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    created_at:{
        type: Date,
        default: Date.now,
    }
})

exports.Reviews = mongoose.model("Reviews", reviewsSchema);