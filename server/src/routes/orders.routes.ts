import express from 'express';
import {
    createOrder,
    addProductToOrder,
    getOrders,
    getOrder,
    getOrdersByUser,
    getOrdersByDate,
    updateOrder,
    deleteOrder,
    deleteProductFromOrder
} from "../controllers/orders.controller";


const router = express.Router();

router
.post("/orders", createOrder)
.post("/orders/:id", addProductToOrder)
.get("/orders", getOrders)
.get("/orders/:id", getOrder)
.get("/orders/user/:user_id", getOrdersByUser)
.get("/orders/date/:date", getOrdersByDate)
.put("/orders/:id", updateOrder)
.delete("/orders/:id", deleteOrder)
.delete("/orders/:id/:product_id", deleteProductFromOrder);

export default router;