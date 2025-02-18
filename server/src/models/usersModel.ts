import mongoose from "mongoose";
import { UserType }  from "../types/index";



const usersSchema = new mongoose.Schema<UserType>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        default: "basic"
    },
    created_at:{
        type: Date,
        default: Date.now,
    }
})

export default mongoose.model("Users", usersSchema);