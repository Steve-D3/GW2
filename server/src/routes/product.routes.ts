import express from "express";
import { 
    createProduct, 
    addImage,
    getProducts,
    getProductById,
    getProductsByCategory,
    getProductsByPriceRange,
    getImages,
    updateProduct,
    deleteImage,
    deleteProduct,
} from "../controllers/product.controller";


const router = express.Router();

router
.post("/products", createProduct)
.post("/products/images", addImage)
.get("/products", getProducts)
.get("/products/:id", getProductById)
.get("/products/category/:category_name", getProductsByCategory)
.get("/products/price", getProductsByPriceRange)
.get("/products/images/:id", getImages)
.put("/products/:id", updateProduct)
.delete("/products/images/:id", deleteImage)
.delete("/products/:id", deleteProduct);


export default router;