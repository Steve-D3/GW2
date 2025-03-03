import { PiShareNetworkFill } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import styles from "../styles/ProductCard.module.css";
import { Link } from "react-router-dom";
type ProductCardProps = {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
    stock_quantity: number;
  };
  viewType?: string;
};
const ProductCard = ({ product, viewType }: ProductCardProps) => {
  return (
    <Link to={`/shop/${product.id}/${product.name}`}>
      <article key={product.id} className={styles[`product-card-${viewType}`]}>
        <div>
          <img src={product.image_url} alt={product.name} />
        </div>
        <div>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>
        </div>
        <div className={styles["product-hover"]}>
          <button>Add to cart</button>
          <div>
            <a href="#">
              <i>
                {" "}
                <PiShareNetworkFill />
              </i>
              Share{" "}
            </a>
            <a href="#">
              {" "}
              <i>⇄</i> Compare{" "}
            </a>
            <a href="#">
              <i>
                <FaRegHeart />
              </i>
              Like
            </a>
          </div>
        </div>
      </article>
    </Link>
  );
};
export default ProductCard;
