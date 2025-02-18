const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
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
    review: {
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