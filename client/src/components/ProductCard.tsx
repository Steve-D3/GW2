import { PiShareNetworkFill } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import styles from "../styles/ProductCard.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/addToCartSlice";
import { toast } from "react-toastify";
type ProductCardProps = {
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    image_url: { url: string }[];
    stock_quantity: number;
  };
  viewType?: string;
};

const ProductCard = ({ product, viewType }: ProductCardProps) => {
  const dispatch = useDispatch();
  const notify = () =>
    toast("Product added to cart successfully", {
      style: {
        background: "#b88e2f",
        color: "white",
        borderRadius: "5px",
        padding: "20px",
        fontSize: "16px",
        fontWeight: "500",
      },
    });

  //addtocart onclick handler , to add the product to the cart
  // and onclick anywhere else will navigate to details page
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    notify();
    e.stopPropagation(); //  Prevents event from bubbling to the <Link>
    e.preventDefault();

    dispatch(addToCart(product));
  };

  return (
    <Link to={`/shop/${product._id}/${product.name}`}>
      <article key={product._id} className={styles[`product-card-${viewType}`]}>
        <div>
          <img src={product.image_url[0]?.url} alt={product.name} />
        </div>
        <div>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>
        </div>
        <div className={styles["product-hover"]}>
          <button onClick={handleAddToCart}>Add to cart</button>
          <div>
            <a href="#">
              <i>
                <PiShareNetworkFill />
              </i>
              Share
            </a>
            <a href="#">
              <i>⇄</i> Compare
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
