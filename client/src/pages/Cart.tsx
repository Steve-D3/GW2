import Breadcrumb from "../components/Breadcrumb";
import styles from "../styles/CartPage.module.css";
import { selectCart } from "../store/addToCartSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../store/addToCartSlice";
import { type CartItem } from "../store/addToCartSlice";
import { MdDelete } from "react-icons/md";
import Warranty from "../components/Warranty";
import { Link } from "react-router-dom";
const Cart = () => {
  const cartItems = useSelector(selectCart);
  const dispatch = useDispatch();

  const handleQuantityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const value = event.target.value;

    if (value === "") {
      dispatch(updateQuantity({ _id: id, quantity: 1 }));
    }

    const quantity = parseInt(value, 10);

    if (!isNaN(quantity) && quantity >= 1 && quantity <= 10) {
      dispatch(updateQuantity({ _id: id, quantity }));
    }
  };
  return (
    <>
      <section className={styles.cartPageHeader}>
        <div>
          <img src="/shopPanner.jpg" alt="" />
        </div>
        <div>
          <h1>Cart</h1>
          <Breadcrumb />
        </div>
      </section>

      <section className={styles.cartPageContainer}>
        <div>
          <div>
            {" "}
            <p>Product</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Subtotal</p>
          </div>
          {cartItems.length > 0 ? (
            <div>
              {cartItems.map((item: CartItem) => (
                <div key={item._id} className={styles.cartItem}>
                  <img
                    src={item.image_url[0]?.url}
                    alt={item.name}
                    style={{ width: "100px" }}
                  />

                  <h3>
                    <Link to={`/shop/${item._id}/${item.name}`}>
                      {item.name}
                    </Link>
                  </h3>
                  <p>{item.price} Euro</p>
                  <input
                    type="number"
                    onChange={(event) => handleQuantityChange(event, item._id)}
                    value={item.quantity || ""}
                    max={10}
                    min={1}
                  />
                  <p>{item.price * item.quantity} Euro</p>
                  <button onClick={() => dispatch(removeFromCart(item._id))}>
                    <MdDelete />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p> Your cart is empty.</p>
            </div>
          )}
        </div>

        <div className={styles.cartTotal}>
          {/* Show subtotal */}
          {cartItems.length > 0 ? (
            <>
              <h3>Cart Totals</h3>
              <div>
                <p>Subtotal</p>
                <p>
                  {" "}
                  {cartItems
                    .reduce(
                      (total: number, item: CartItem) =>
                        total + item.price * item.quantity,
                      0
                    )
                    .toFixed(2)}{" "}
                  Euro
                </p>
              </div>
              <div>
                <p>Total</p>
                <p>
                  {" "}
                  {cartItems
                    .reduce(
                      (total: number, item: CartItem) =>
                        total + item.price * item.quantity,
                      0
                    )
                    .toFixed(2)}{" "}
                  Euro
                </p>
              </div>
            </>
          ) : (
            <>
              <h3>Cart Totals</h3>
              <p>
                Subtotal <span>0</span>
              </p>
              <p>
                Total <span>0</span>
              </p>
            </>
          )}
          <Link to="#">Check Out</Link>{" "}
        </div>
      </section>
      <Warranty />
    </>
  );
};
export default Cart;
