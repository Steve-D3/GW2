import mongoose from "mongoose";
import { ProductType } from "../types";


const productsSchema = new mongoose.Schema<ProductType>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    category_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories",
        required: true,
    },
    image_url: {
        type: String,
        required: true,
        trim: true,
    },
    created_at:{
        type: Date,
        default: Date.now,
    }
})

export default mongoose.model("Products", productsSchema);