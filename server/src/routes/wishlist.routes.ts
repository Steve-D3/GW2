import express from 'express';
import { 
    createWishlist, 
    getWishlist, 
    addOrUpdateProductInWishlist, 
    deleteWishlist, 
    deleteProductFromWishlist 
} from '../controllers/wishlist.controller';



const router = express.Router();

router
.get('/wishlist/:id', getWishlist)
.post('/wishlist', createWishlist)
.put('/wishlist/:user_id', addOrUpdateProductInWishlist)
.delete('/wishlist/:id', deleteWishlist)
.delete('/wishlist/:user_id/:product_id', deleteProductFromWishlist);


export default router;