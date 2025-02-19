import { Response, Request } from "express";
import ordersModel from "../models/ordersModel";


// CRUD
// CREATE
export const createOrder = async (req: Request, res: Response) => {
    try {
        const { user_id, products, total_price } = req.body;
        if (!user_id || !products || !total_price) {
            return res.status(400).json({message: "Missing fields"});
        }
        const newOrder = new ordersModel({ user_id, products, total_price });
        await newOrder.save();
        res.status(201).json({ user_id, products, total_price });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
};


// READ
export const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await ordersModel.find();
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getOrder = async (req: Request, res: Response) => {
    try {
        const order = await ordersModel.findById(req.params.id);
        if (!order) {
            return res.status(404).json({message: "Order not found"});
        }
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }   
};


// UPDATE



// DELETE