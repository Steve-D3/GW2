import ProductCard from "../ProductCard";
import productsData from "../../db.json";
import styles from "../../styles/ProductGridInHome.module.css";

const ProductGridHome = () => {
  const selectedProducts = productsData.slice(0, 10);
  return (
    <section className={styles["product-contanier"]}>
      {" "}
      <h2>Our Products</h2>
      <div className={styles["product-grid"]}>
        {selectedProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <a href="/shop">Show More </a>
    </section>
  );
};

export default ProductGridHome;
