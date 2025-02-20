import { Response, Request } from 'express';
import reviewsModel from '../models/reviewsModel';


// CRUD
// CREATE
export const createReview = async (req: Request, res: Response) => {
    try {
        const { user_id, product_id, comment, rating } = req.body;
        if (!user_id || !product_id || !comment || !rating) {
            res?.status(400).json({ message: "Missing fields" });
            return;
        }
        const newReview = new reviewsModel({ user_id, product_id, comment, rating });
        await newReview.save();
        res?.status(201).json(newReview);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// READ
export const getReview = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const review = await reviewsModel.findById(id);
        if (!review) {
            res?.status(404).json({ message: "Review not found" });
            return;
        }
        res?.status(200).json(review);
    } catch (error) {
        console.log(error);
        res?.status(500).json({ message: "Internal server error" });
    }
}

// UPDATE
export const updateReview = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { comment, rating } = req.body;

        if (!comment || !rating) {
            res.status(400).json({ message: "Missing fields" });
            return;
        }

        const review = await reviewsModel.findByIdAndUpdate(id, { comment, rating }, { new: true });
        if (!review) {
            res.status(404).json({ message: "Review not found" });
            return;
        }
        res.status(200).json({ message: "Review updated", data: review });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


// DELETE
export const deleteReview = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            res?.status(400).json({ message: "Missing fields" });
            return;
        }

        const review = await reviewsModel.findByIdAndDelete(id);
        if (!review) {
            res?.status(404).json({ message: "Review not found" });
            return;
        }
        res?.status(200).json({ message: "Review deleted" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });

    }
}