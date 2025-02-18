import { Response, Request } from "express";
import usersModel from "../models/usersModel"



// CRUD
// Create
export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role, created_at } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({message: "Missing fields"});
        }
        const newUser = new usersModel({ name, email, password, role, created_at });
        await newUser.save();
        res.status(201).json(newUser);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});       
    }   
};

// Read
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await usersModel.find();
        res.status(200).json(users);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

