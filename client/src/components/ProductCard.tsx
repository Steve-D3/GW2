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
    image_url: string | number[];
    stock_quantity: number;
  };
  viewType?: string;
};
const ProductCard = ({ product, viewType }: ProductCardProps) => {
  return (
    <Link to={`/shop/${product.id}/${product.name}`}>
      <article key={product.id} className={styles[`product-card-${viewType}`]}>
        <div>
          {/* "image_url": [
      {
        "_id": "67c5f7686343fd366ed47933",
        "id": 5,
        "url": "https://filecache.mediaroom.com/mr5nra_sfa/177529/The_Fresh_Cap_Neolea_Press_Image.jpg",
        "description": "Main image of the organic olive oil"
      } */}
          <img src={product.image_url[0]?.url} alt={product.name} />
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
