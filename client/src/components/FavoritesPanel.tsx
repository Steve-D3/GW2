import styles from "../styles/FavoritesPanel.module.css";
import { FaTimes } from "react-icons/fa";
import ProductCard from "./ProductCard"; // Or a smaller variant if you want
import { useGetProductsQuery } from "../store/productApiSlice";

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

  const favoriteProducts = productsData?.filter((product) =>
    favorites.includes(product._id)
  );
  console.log("Favorites IDs:", favorites);

  return (
    <div className={`${styles.panel} ${show ? styles.show : ""}`}>
      <div className={styles.header}>
        <h2>My Favorites ❤️</h2>
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
            <p>No favorites yet 🥲</p>
            <p>Click the ❤️ on a product to save it here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPanel;
