import { Response, Request } from "express";
import usersModel from "../models/usersModel"



// CRUD
// Create
export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role, created_at } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Missing fields" });
        }
        const newUser = new usersModel({ name, email, password, role, created_at });
        await newUser.save();
        res.status(201).json(newUser);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// READ
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await usersModel.find();
        res.status(200).json(users);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await usersModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const searchUsers = async (req: Request, res: Response) => {
    try {
        const {query} = req.query;
        const users = await usersModel.find({
            $or: [
                {name: { $regex: query, $options: "i"}},
                {email: { $regex: query, $options: "i"}}
            ]
        })
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// UPDATE
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedata = await usersModel.findByIdAndUpdate(
            id,
            {...req.body},
            { new: true }
        );

        res.status(200).json({ message: "User updated", updatedata });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// DELETE
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Validate input
        if (!id) {
            return res.status(400).json({ message: "Missing user ID" });
        }

        // Check if the user exists
        const user = await usersModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete the user
        const toDeleteUser = await usersModel.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted", toDeleteUser });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};