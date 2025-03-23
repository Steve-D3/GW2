import express from 'express';
import { 
    addOrCreateWishlist, 
    getWishlist, 

  clearWishlist, 
    deleteProductFromWishlist 
} from '../controllers/wishlist.controller';
import { clear } from 'console';



const router = express.Router();

router
.get('/wishlist/:user_id', getWishlist)
.post('/wishlist/add', addOrCreateWishlist)
// .put('/wishlist/:user_id', addOrUpdateProductInWishlist)
.delete('/wishlist/clear/:user_id', clearWishlist)
.delete('/wishlist/delete/:user_id/:product_id', deleteProductFromWishlist);


export default router;