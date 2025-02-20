import express from "express";
import { createProduct, getProducts } from "../controllers/product.controller";


const router = express.Router();

router
.get("/products", getProducts)
.post("/products", createProduct);

export default router;