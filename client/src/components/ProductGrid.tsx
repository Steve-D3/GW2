import productsData from "../db.json";
import "../styles/shop.css";

const ProductGrid = () => {
  return (
    <section className="product-contanier">
      <div className="product-grid">
        {productsData.categories.map((category) =>
          category.products.map((product) => (
            <article key={product.id} className="product-card">
              <div>
                <img src={product.image_url} alt={product.name} />
              </div>
              <div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>${product.price}</p>
              </div>
              <div className="productHover">
                <button>Add to cart</button>
                <div>
                  <a href="#">⠪ Share </a>
                  <a href="#">⇄ Compare </a>
                  <a href="#">♡ Like </a>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
