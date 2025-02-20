import mongoose from "mongoose";
import { CategoryType } from "../types";

const categoriesSchema = new mongoose.Schema<CategoryType>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
})

export default mongoose.model("Categories", categoriesSchema);