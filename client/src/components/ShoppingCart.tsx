import { hideCart, selectIsShowCart } from "../store/addToCartSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/ShoppingCart.module.css";
import { TbShoppingBagX } from "react-icons/tb";

// onclick hideCart from slice

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const isShowCart = useSelector(selectIsShowCart);
  return (
    <section className={isShowCart ? styles.showCart : styles.hideCart}>
      <div className={styles.shoppingCart}>
        <h1>Shopping Cart</h1>
        <button onClick={() => dispatch(hideCart())}>
          <TbShoppingBagX />
        </button>
      </div>{" "}
      <div className={isShowCart ? "showCart" : ""}></div>
      <div className={styles.cartItems}>
        <div className={styles.cartItem}>
          <img src="/fashion.jpg" alt="product" />
          <div>
            <h3>Product Name</h3>
            <div>
              <p>1</p>
              <p>X</p>
              <p>100 Euro</p>
            </div>
          </div>
          <button>x</button>
        </div>
      </div>
      <div className={styles.cartTotal}>
        <h3>Subtotal</h3>
        <p>100 Euro</p>
      </div>
      <div className={styles.cartFooterButtons}>
        <button>Cart</button>
        <button>Checkout</button>
        <button>Comparison</button>
      </div>
    </section>
  );
};
export default ShoppingCart;
