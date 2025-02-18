const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
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
})

export default mongoose.model("Categories", categoriesSchema);