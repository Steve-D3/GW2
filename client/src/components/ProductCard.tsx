import { PiShareNetworkFill } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import styles from "../styles/ProductCard.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/addToCartSlice";
import { toast } from "react-toastify";
import {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useRemoveOneProductFromWishlistMutation,
} from "../store/wishlistApi";
import { useSelector } from "react-redux";
import { ImHeart } from "react-icons/im";

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
  const currentUser = useSelector(
    (state: {
      signin: { user: { name: string; email: string; _id: string } };
    }) => state.signin.user
  );
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

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    notify();
    e.stopPropagation(); //  Prevents event from bubbling to the <Link>
    e.preventDefault();

    dispatch(addToCart(product));
  };

  const { data: wishlistData } = useGetWishlistQuery(
    { user_id: currentUser?._id },
    { skip: !currentUser?._id }
  );

  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveOneProductFromWishlistMutation();
  const handleToggelWishItem = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!currentUser) {
      toast("Please log in to add items to your wishlist!", {
        style: {
          background: "#c08080",
          color: "white",
          borderRadius: "5px",
          padding: "15px",
          fontSize: "16px",
          fontWeight: "500",
        },
      });
      return;
    }
    //if the product is already in the wishlist remove it else add it

    if (wishlistData?.products.includes(product._id)) {
      try {
        await removeFromWishlist({
          user_id: currentUser._id,
          productId: product._id,
        }).unwrap();

        toast("Product removed from wishlist!", {
          style: {
            background: "#d9b3b3",
            color: "white",
            borderRadius: "5px",
            padding: "15px",
            fontSize: "16px",
            fontWeight: "500",
          },
        });
      } catch (error) {
        console.error("Failed to remove from wishlist:", error);
        toast.error("Failed to remove from wishlist. Try again later.", {
          style: {
            background: "#d9534f",
            color: "white",
            borderRadius: "5px",
            padding: "15px",
            fontSize: "16px",
            fontWeight: "500",
          },
        });
      }
    } else {
      try {
        await addToWishlist({
          user_id: currentUser._id,
          productId: product._id,
        }).unwrap();
        toast("Product added to wishlist!", {
          style: {
            background: "	#8d1919",
            color: "white",
            borderRadius: "5px",
            padding: "15px",
            fontSize: "16px",
            fontWeight: "500",
          },
        });
      } catch (error) {
        console.error("Failed to add to wishlist:", error);
        toast("Failed to add to wishlist. Try again later.", {
          style: {
            background: "#d9b3b3",
            color: "white",
            borderRadius: "5px",
            padding: "15px",
            fontSize: "16px",
            fontWeight: "500",
          },
        });
      }
    }

    // try {
    //   const response = await addToWishlist({
    //     user_id: currentUser._id,
    //     productId: product._id,
    //   }).unwrap();

    //   toast("Product added to wishlist!", {
    //     style: {
    //       background: "#5a0000",
    //       color: "white",
    //       borderRadius: "5px",
    //       padding: "15px",
    //       fontSize: "16px",
    //       fontWeight: "500",
    //     },
    //   });

    //   console.log("Wishlist updated:", response);
    // } catch (error) {
    //   console.error("Failed to add to wishlist:", error);
    //   toast.error("Failed to add to wishlist. Try again later.", {
    //     style: {
    //       background: "#d9534f",
    //       color: "white",
    //       borderRadius: "5px",
    //       padding: "15px",
    //       fontSize: "16px",
    //       fontWeight: "500",
    //     },
    //   });
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
          <p>{product.price} Euro</p>
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

            {!currentUser?._id ||
            !wishlistData?.products.includes(product._id) ? (
              <a href="#">
                <i>
                  <FaRegHeart onClick={handleToggelWishItem} />
                </i>{" "}
                Like{" "}
              </a>
            ) : (
              currentUser?._id && (
                <a href="#">
                  <i>
                    <ImHeart
                      onClick={handleToggelWishItem}
                      style={{ color: "	#cc9999" }}
                    />
                  </i>
                </a>
              )
            )}
          </div>
        </div>
      </article>
    </Link>
  );
};
export default ProductCard;
