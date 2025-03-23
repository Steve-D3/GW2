import express from 'express';
import { 
    addOrCreateWishlist, 
    getWishlist, 
    addOrUpdateProductInWishlist, 
    deleteWishlist, 
    deleteProductFromWishlist 
} from '../controllers/wishlist.controller';



const router = express.Router();

router
.get('/wishlist/:id', getWishlist)
.post('/wishlist/add', addOrCreateWishlist)
.put('/wishlist/:user_id', addOrUpdateProductInWishlist)
.delete('/wishlist/:id', deleteWishlist)
.delete('/wishlist/:user_id/:product_id', deleteProductFromWishlist);


export default router;