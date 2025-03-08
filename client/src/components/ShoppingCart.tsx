import {
  hideCart,
  selectIsShowCart,
  selectCart,
  removeFromCart,
} from "../store/addToCartSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/ShoppingCart.module.css";
import { TbShoppingBagX } from "react-icons/tb";

interface CartItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  image_url: { url: string }[];
  stock_quantity: number;
  quantity: number;
}
const ShoppingCart = () => {
  const dispatch = useDispatch();
  const isShowCart = useSelector(selectIsShowCart);
  const cartItems = useSelector(selectCart);

  return (
    <section className={isShowCart ? styles.showCart : styles.hideCart}>
      <div className={styles.shoppingCart}>
        <h1>Shopping Cart</h1>
        <button onClick={() => dispatch(hideCart())}>
          <TbShoppingBagX />
        </button>
      </div>
      <div className={isShowCart ? "showCart" : ""}></div>

      {cartItems.length > 0 ? (
        <div className={styles.cartItems}>
          {cartItems.map((item: CartItem) => (
            <div key={item._id} className={styles.cartItem}>
              <img src={item.image_url[0]?.url} alt={item.name} />
              <div>
                <h3>{item.name}</h3>

                <div>
                  <p>{item.quantity}</p>
                  <p>X</p>
                  <p>${item.price}</p>
                </div>
              </div>
              <button onClick={() => dispatch(removeFromCart(item._id))}>
                x
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.emptyCartMessage}>Your cart is empty.</p>
      )}

      {/* Show subtotal */}
      {cartItems.length > 0 && (
        <div className={styles.cartTotal}>
          <h3>Subtotal</h3>
          <p>
            $
            {cartItems.reduce(
              (total: number, item: CartItem) =>
                total + item.price * item.quantity,
              0
            )}
          </p>
        </div>
      )}

      {/* Footer Buttons */}
      <div className={styles.cartFooterButtons}>
        <button>Cart</button>
        <button>Checkout</button>
        <button>Comparison</button>
      </div>
    </section>
  );
};

export default ShoppingCart;
