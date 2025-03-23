import styles from "../styles/FavoritesPanel.module.css";
import { FaTimes } from "react-icons/fa";
import { useGetProductsQuery } from "../store/productApiSlice";
import { useSelector } from "react-redux";
import {
  useGetWishlistQuery,
  useRemoveAllFromWishlistMutation,
} from "../store/wishlistApi";
import { toggleWishlist } from "../store/wishlistSlice";
import { useDispatch } from "react-redux";
import { selectWishlist } from "../store/wishlistSlice";
import Wishitem from "./WishItem";
import { toast } from "react-toastify";

const FavoritesPanel = () => {
  const dispatch = useDispatch();
  const isShowWishlist = useSelector(selectWishlist);
  const { data: productsData, isLoading: isProductsLoading } =
    useGetProductsQuery();

  const onClose = () => {
    dispatch(toggleWishlist());
  };

  const currentUser = useSelector(
    (state: {
      signin: { user: { name: string; email: string; _id: string } };
    }) => state.signin.user
  );

  console.log("currentUser", currentUser);

  const { data: wishlistData, isLoading: isWishlistLoading } =
    useGetWishlistQuery(
      { user_id: currentUser?._id },
      { skip: !currentUser?._id }
    );

  const [removeAllFromWishlist] = useRemoveAllFromWishlistMutation();

  if (isWishlistLoading || isProductsLoading) {
    console.log("Loading wishlist or products data...");
    return <div>Loading...</div>; // Render a loading state while data is being fetched
  }

  const favoriteProducts = productsData?.filter((product) =>
    wishlistData?.products.includes(product._id)
  );

  console.log("favoriteProducts", favoriteProducts);
  const handleRemoveAllFromWishlist = async () => {
    try {
      await removeAllFromWishlist({ user_id: currentUser._id }).unwrap();
      toast("All items removed from wishlist!", {
        style: {
          background: "#b36666",
          color: "white",
          borderRadius: "5px",
          padding: "15px",
          fontSize: "16px",
          fontWeight: "500",
        },
      });
    } catch {
      toast("Error removing all items from wishlist", {
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
    <div className={`${styles.panel} ${isShowWishlist ? styles.show : ""}`}>
      <div className={styles.header}>
        {currentUser ? (
          <h2>{currentUser.name.split(" ")[0]}'s Favorites</h2>
        ) : (
          <h2>Guest</h2>
        )}
        <button className={styles.closeBtn} onClick={onClose}>
          <FaTimes />
        </button>
      </div>

      <div className={styles.content}>
        {currentUser && favoriteProducts?.length ? (
          <>
            <button
              className={styles.resetBtn}
              onClick={handleRemoveAllFromWishlist}
            >
              Reset Favorites
            </button>
            <div className={styles.grid}>
              {favoriteProducts.map((product) => (
                <Wishitem key={product._id} product={product} viewType="grid" />
              ))}
            </div>
          </>
        ) : (
          <div className={styles.empty}>
            {currentUser ? (
              <p>No favorites yet</p>
            ) : (
              <p>Sign in to see your favorites</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPanel;
