import styles from "../styles/ProductCard.module.css";
import { Link } from "react-router-dom";
import { useRemoveOneProductFromWishlistMutation } from "../store/wishlistApi";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { toggleWishlist } from "../store/wishlistSlice";

type ProductCardProps = {
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    image_url: { url: string }[];
    stock_quantity: number;
  };
  viewType?: string;
};

const Wishitem = ({ product, viewType }: ProductCardProps) => {
  const dispatch = useDispatch();
  const [removeFromWishlist, { isLoading, isError }] =
    useRemoveOneProductFromWishlistMutation();
  const currentUser = useSelector(
    (state: {
      signin: { user: { name: string; email: string; _id: string } };
    }) => state.signin.user
  );

  const handleRemoveFromWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault(); // Prevent the link from navigating
    if (!currentUser?._id) {
      console.error("User not authenticated");
      return;
    }

    try {
      // Trigger the mutation to remove the product
      await removeFromWishlist({
        user_id: currentUser._id,
        productId: product._id,
      }).unwrap();

      // Show success toast
      toast("Product removed from wishlist!", {
        style: {
          background: "#b36666",
          color: "white",
          borderRadius: "5px",
          padding: "15px",
          fontSize: "16px",
          fontWeight: "500",
        },
      });
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
      toast("Failed to remove product from wishlist", {
        style: {
          background: "#d9534f",
          color: "white",
          borderRadius: "5px",
          padding: "15px",
          fontSize: "16px",
          fontWeight: "500",
        },
      });
    }
  };

  return (
    <Link
      to={`/shop/${product._id}/${product.name}`}
      onClick={() => dispatch(toggleWishlist())}
    >
      <article key={product._id} className={styles[`product-card-${viewType}`]}>
        <div>
          <img src={product.image_url[0]?.url} alt={product.name} />
        </div>
        <div>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>{product.price} Euro</p>
        </div>
        <div className={styles["product-hover"]}>
          <button onClick={handleRemoveFromWishlist} disabled={isLoading}>
            {isLoading ? "Removing..." : "Delete from wishlist"}
          </button>
          {isError && <p className={styles.error}>Error removing product</p>}
        </div>
      </article>
    </Link>
  );
};

export default Wishitem;
