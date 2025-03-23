import mongoose from "mongoose";
// import { UserType }  from "../types/index";



const usersSchema = new mongoose.Schema({
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
        enum: ["basic", "admin"],
        default: "basic"
    },
    created_at:{
        type: Date,
        default: Date.now,
    },
    isVerified: {
        type: Boolean,
        default: false,
      },
      verificationToken: { type: String },
})

export default mongoose.model("Users", usersSchema);


