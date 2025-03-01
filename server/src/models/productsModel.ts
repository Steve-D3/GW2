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
        min: 0,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories",
        required: true,
    },
    image_url: [{
        id: {
            type: Number,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        }
    }],
    created_at: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.model("Products", productsSchema);
