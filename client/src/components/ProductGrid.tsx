import productsData from "../db.json";
import "../styles/shop.css";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  return (
    <section className="product-contanier">
      <div className="product-grid">
        {productsData.categories.map((category) =>
          category.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
