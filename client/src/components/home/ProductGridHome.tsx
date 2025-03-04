import ProductCard from "../ProductCard";
// import productsData from "../../db.json";
import styles from "../../styles/ProductGridInHome.module.css";
import { useGetProductsQuery } from "../../store/productApiSlice";
const ProductGridHome = () => {
  const { data: productsData } = useGetProductsQuery();
  if (!productsData) return null;
  const selectedProducts = productsData.slice(0, 10);
  return (
    <section className={styles["product-contanier"]}>
      {" "}
      <h2>Our Products</h2>
      <div className={styles["product-grid"]}>
        {selectedProducts?.map((product) => (
          <ProductCard key={product._id} product={product} viewType="grid" />
        ))}
      </div>
      <a href="/shop">Show More </a>
    </section>
  );
};

export default ProductGridHome;
