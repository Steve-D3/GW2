import { Response, Request } from "express";
import ordersModel from "../models/ordersModel";
import productsModel from "../models/productsModel";

// CRUD
// CREATE
export const createOrder = async (req: Request, res: Response) => {
    try {
        const { user_id, products, total_price } = req.body;
        if (!user_id || !products || !total_price) {
            return res.status(400).json({ message: "Missing fields" });
        }
        const newOrder = new ordersModel({ user_id, products, total_price });
        await newOrder.save();
        res.status(201).json({ user_id, products, total_price });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const addProductToOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { product_id, quantity } = req.body;

        const order = await ordersModel.findById(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const newProduct = { product_id, quantity };

        const updatedOrder = await ordersModel.findByIdAndUpdate(
            id,
            { $push: { products: newProduct } },
            { new: true }
        );

        res.status(200).json({ status: "success", data: updatedOrder });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// READ
export const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await ordersModel.find();
        res.status(200).json({ status: "success", data: orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const getOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const order = await ordersModel.findById(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ status: "success", data: order });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getOrdersByUser = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;
        const orders = await ordersModel.find({ user_id });
        if (!orders) {
            return res.status(404).json({ message: "Orders not found" });
        }
        res.status(200).json({ status: "success", data: orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }

}

export const getOrdersByDate = async (req: Request, res: Response) => {
    try {
        const { startDate, endDate } = req.query;
        if (!startDate || !endDate) {
            return res.status(400).json({ message: "Missing date range" });
        }

        const orders = await ordersModel.find({
            createdAt: {
                $gte: new Date(startDate as string),
                $lte: new Date(endDate as string)
            }
        });

        res.status(200).json({ status: "success", data: orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


// UPDATE

export const updateOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const itemToUpdate = await ordersModel.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true }
        )
        if (!itemToUpdate) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ status: "success", data: itemToUpdate });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}



// DELETE

export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Validate input
        if (!id) {
            return res.status(400).json({ message: "Missing order ID" });
        }

        // Find and delete the order
        const order = await ordersModel.findByIdAndDelete(id);

        // Check if the order was found
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ status: "success", message: "Order deleted", data: order });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteProductFromOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { product_name } = req.body;

        // Validate input
        if (!id || !product_name) {
            return res.status(400).json({ message: "Missing order ID or product name" });
        }

        // Find the product by name
        const product = await productsModel.findOne({ name: product_name });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Find the order and update it by removing the product
        const order = await ordersModel.findByIdAndUpdate(
            id,
            { $pull: { products: { product_id: product._id } } },
            { new: true }
        ).populate("products");

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ status: "success", data: order });
    } catch (error) {
        console.error("Error deleting product from order:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}