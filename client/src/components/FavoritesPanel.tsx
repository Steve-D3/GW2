import styles from "../styles/FavoritesPanel.module.css";
import { FaTimes } from "react-icons/fa";
import ProductCard from "./ProductCard";
import { useGetProductsQuery } from "../store/productApiSlice";
import { useSelector } from "react-redux";
import { useGetWishlistQuery } from "../store/wishlistApi";

type Props = {
  show: boolean;
  onClose: () => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
};

const FavoritesPanel = ({
  show,
  onClose,
  favorites,
  toggleFavorite,
}: Props) => {
  const { data: productsData } = useGetProductsQuery();

  // const favoriteProducts = productsData?.filter((product) =>
  //   favorites.includes(product._id)
  // );
  // console.log("Favorites IDs:", favorites);
  const currentUser = useSelector(
    (state: {
      signin: { user: { name: string; email: string; _id: string } };
    }) => state.signin.user
  );
  const {
    data: wishlistData,
    error,
    isLoading,
    isError,
  } = useGetWishlistQuery({ user_id: currentUser ? currentUser._id : "" });

  if (isLoading) {
    console.log("Loading wishlist data...");
  }

  if (isError) {
    console.error("Error fetching wishlist:", error);
  }

  if (wishlistData) {
    console.log("Wishlist data:", wishlistData);
  }

  const favoriteProducts = productsData?.filter((product) =>
    wishlistData?.products.includes(product._id)
  );
  return (
    <div className={`${styles.panel} ${show ? styles.show : ""}`}>
      <div className={styles.header}>
        {currentUser ? (
          <h2> {currentUser.name.split(" ")[0]}'s Favorites</h2>
        ) : (
          <h2>Guest</h2>
        )}
        <button className={styles.closeBtn} onClick={onClose}>
          <FaTimes />
        </button>
      </div>

      <div className={styles.content}>
        {favoriteProducts?.length ? (
          <div className={styles.grid}>
            {favoriteProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                viewType="grid"
                isFavorite={favorites.includes(product._id)}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </div>
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
