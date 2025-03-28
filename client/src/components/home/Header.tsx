import { NavLink } from "react-router";
import styles from "../../styles/Header.module.css";
import { FaRegHeart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { showLogin } from "../../store/signinSlice";
import { showCart } from "../../store/addToCartSlice";
import ShoppingCart from "../ShoppingCart";
import { useSelector } from "react-redux";
import { selectTotalCartItems } from "../../store/addToCartSlice";
import { selectIsShowSearch } from "../../store/searchSlice";
import { toggelSearch } from "../../store/searchSlice";
import SearchBar from "../../components/SearchBar";
import { toggleWishlist } from "../../store/wishlistSlice";
import FavoritesPanel from "../FavoritesPanel";
import HamburgerMenu from "./HamburgerMenu";
import { FaUserCheck } from "react-icons/fa";

const Header = () => {
  const currentUser = useSelector(
    (state: {
      signin: { user: { name: string; email: string; _id: string } };
    }) => state.signin.user
  );
  const dispatch = useDispatch();
  const handelLogin = () => {
    dispatch(showLogin());
  };
  const cartItems = useSelector(selectTotalCartItems);

  const handleSearchChange = useSelector(selectIsShowSearch);
  return (
    <header>
      <section className={styles.mainHeaderNav}>
        <NavLink to="/">
          <nav className={styles["header-logo"]}>
            <div>
              <img src="logo.svg" alt="SustainLoop" />
            </div>
            <h3>SustainLoop</h3>
          </nav>
        </NavLink>
        <nav className={styles["header-nav"]}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/shop">Shop</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </nav>
        <nav className={styles["header-icons"]}>
          <ul>
            <li>
              {/* <button onClick={handelLogin}>
                {" "}
                <FaRegUser />
              </button> */}
              {currentUser ? (
                <button onClick={handelLogin}>
                  {" "}
                  <FaUserCheck />
                </button>
              ) : (
                <button onClick={handelLogin}>
                  {" "}
                  <FaRegUser />
                </button>
              )}
            </li>
            <li>
              <NavLink to="#">
                <PiMagnifyingGlassBold
                  onClick={() => dispatch(toggelSearch())}
                />
              </NavLink>
            </li>
            <li>
              <NavLink to="#">
                <FaRegHeart onClick={() => dispatch(toggleWishlist())} />
              </NavLink>
            </li>
            <li>
              <NavLink to="#">
                <MdOutlineShoppingCart onClick={() => dispatch(showCart())} />
                <div
                  className={
                    cartItems > 0 ? styles.showCartCount : styles.hideCartCount
                  }
                >
                  <p>{cartItems}</p>
                </div>
              </NavLink>
            </li>
          </ul>
        </nav>
        <nav className={styles["header-hamburger"]}>
          <HamburgerMenu />
        </nav>
      </section>
      <ShoppingCart />
      <FavoritesPanel />
      {handleSearchChange && (
        <div className={styles.showSearch}>
          <button
            className={styles.closeSearch}
            onClick={() => dispatch(toggelSearch())}
          >
            ✕
          </button>
          <SearchBar />
        </div>
      )}
    </header>
  );
};
export default Header;
