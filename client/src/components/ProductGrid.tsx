import productsData from "../db.json";
import "../styles/shop.css";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

const ProductGrid = () => {
  return (
    <section className="product-contanier">
      <div className="product-grid">
        {productsData.categories.map((category) =>
          category.products.map((product) => (
            <Link
              to={`/shop/${product.id}`}
              key={product.id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ProductCard key={product.id} product={product} />
            </Link>
          ))
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
