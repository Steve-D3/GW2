import { Request, Response } from "express";

import profilePictureModel from "../models/profilePictureModel";

export const addProfilePicture = async (req: Request, res: Response) => {
    try {
        const { user_id, image_url } = req.body;
        if (!user_id || !image_url ) {
            res?.status(400).json({ message: "Missing fields" });
            return;
        }
        const newProfilePicture = new profilePictureModel({ user_id, image_url });
        await newProfilePicture.save();
        res?.status(201).json({ user_id, image_url});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}