import express from 'express';
import { 
    createReview, 
    getReview, 
    deleteReview, 
    updateReview 
} from "../controllers/reviews.controller";

const router = express.Router();

router
.get('/reviews/:id', getReview)
.post('/reviews', createReview)
.put('/reviews/:id', updateReview)
.delete('/reviews/:id', deleteReview);

export default router;
