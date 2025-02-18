const mongoose = require('mongoose');

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
        required: true,
        default: "basic",
        enum: ["customer", "admin"],
    },
    created_at:{
        type: Date,
        default: Date.now,
    }
})

export default mongoose.model("Users", usersSchema);