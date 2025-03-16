import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useGetProductByIdQuery } from "../../store/productApiSlice";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  selectCart,
} from "../../store/addToCartSlice";
import styles from "../../styles/ProductDetailsB.module.css";
import { type CartItem } from "../../store/addToCartSlice";

const ProductDetailsBackup = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(id || "");

  // Ensure we don't access product properties before it's loaded
  const cartItems = useSelector(selectCart);
  const cartItem = product
    ? cartItems.find((item: CartItem) => item._id === product._id)
    : undefined;
  const quantity = cartItem ? cartItem.quantity : 0;

  // Set initial primary image once product data is available
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (product && product.image_url.length > 0) {
      setSelectedImage(product.image_url[0].url);
    }
  }, [product]);

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (isError)
    return <p className="text-center text-gray-500">Error loading product</p>;
  if (!product) return null;

  const handleThumbnailClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleIncrease = () => {
    if (product) {
      dispatch(updateQuantity({ _id: product._id, quantity: quantity + 1 }));
    }
  };

  const handleDecrease = () => {
    if (!product) return;

    if (quantity > 1) {
      dispatch(updateQuantity({ _id: product._id, quantity: quantity - 1 }));
    } else if (quantity === 1) {
      dispatch(removeFromCart({ _id: product._id }));
    }
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.productActionsForMobile}>
        <div className={styles.quantitySelectorForMobile}>
          <button onClick={handleDecrease} disabled={quantity === 0}>
            -
          </button>
          <span>{quantity}</span>
          <button onClick={handleIncrease}>+</button>
        </div>
        {cartItem && cartItem.quantity > 0 ? (
          <>
            <button
              className={styles.addToCartForMobile}
              onClick={() => dispatch(removeFromCart(product._id))}
            >
              Remove from Cart
            </button>
          </>
        ) : (
          <>
            <button
              className={styles.addToCartForMobile}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </>
        )}{" "}
      </div>
      <AnimatePresence>
        <div className={styles.productImgContainer}>
          <div className={styles.thumbnailContainer}>
            {product.image_url.map((image, index) => (
              <motion.img
                key={image.url}
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                className={styles.thumbnail}
                layoutId={`product-${image.url}`}
                onClick={() => handleThumbnailClick(image.url)}
                transition={{ duration: 0.3 }}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            ))}
          </div>

          <div className={styles.mainImageContainer}>
            {selectedImage && (
              <motion.img
                key={selectedImage}
                src={selectedImage}
                alt="Primary Product"
                className={styles.primaryImage}
                layoutId={`product-${selectedImage}`}
                transition={{ duration: 0.3 }}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
              />
            )}
          </div>
        </div>
      </AnimatePresence>

      {/* Product Details */}
      <div className={styles.productDetails}>
        <div className={styles.productInfo}>
          <h1>{product.name}</h1>
          <p>{product.price} Euro</p>
          <div>
            <i>⭐⭐⭐⭐⭐</i> <i> | </i>
            <p>5 Customer Reviews</p>
          </div>
          <p>{product.description}</p>
          <p>
            Our product is crafted with sustainable materials and
            environmentally-conscious processes to reduce our carbon footprint.
            By choosing this product, you contribute to a greener future,
            helping to conserve natural resources, reduce waste, and support
            eco-friendly practices. Make a positive impact on the planet while
            enjoying high-quality, earth-conscious products.
          </p>
        </div>
        <div className={styles.productActions}>
          <div className={styles.quantitySelector}>
            <button onClick={handleDecrease} disabled={quantity === 0}>
              -
            </button>
            <span>{quantity}</span>
            <button onClick={handleIncrease}>+</button>
          </div>
          {cartItem && cartItem.quantity > 0 ? (
            <>
              <button
                className={styles.addToCart}
                onClick={() => dispatch(removeFromCart(product._id))}
              >
                Remove from Cart
              </button>
            </>
          ) : (
            <>
              <button className={styles.addToCart} onClick={handleAddToCart}>
                Add to Cart
              </button>
            </>
          )}{" "}
          <button className={styles.compare}>+ Compare</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsBackup;
