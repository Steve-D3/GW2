import productsData from "../db.json";
import "../styles/shop.css";
import { PiShareNetworkFill } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";

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
                  <a href="#">
                    <PiShareNetworkFill />
                    Share{" "}
                  </a>
                  <a href="#">⇄ Compare </a>
                  <a href="#">
                    <FaRegHeart /> Like
                  </a>
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

//product grid should seprate to card component and product and key should be props

// and style every component to ComponentName.module.css
