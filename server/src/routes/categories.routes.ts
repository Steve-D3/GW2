import express from 'express';
import {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory,

} from "../controllers/categories.controller";

const router = express.Router();

router
.post('/categories', createCategory)
.get('/categories', getCategories)
.get('/categories/:id', getCategory)
.put('/categories/:id', updateCategory)
.delete('/categories/:id', deleteCategory);

export default router;