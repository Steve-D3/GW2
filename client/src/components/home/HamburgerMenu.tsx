import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../../styles/Header.module.css";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { showLogin } from "../../store/signinSlice";
import { showCart, selectTotalCartItems } from "../../store/addToCartSlice";
import { toggelSearch } from "../../store/searchSlice";
import { toggleWishlist } from "../../store/wishlistSlice";

const HamburgerMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectTotalCartItems);

  const handleToggleSearch = () => {
    dispatch(toggelSearch());
    setMenuOpen(false);
  };

  const handleToggleCart = () => {
    dispatch(showCart());
    setMenuOpen(false);
  };

  return (
    <div className={styles.hamburgerContainer}>
      <GiHamburgerMenu
        className={styles.hamburgerIcon}
        onClick={() => setMenuOpen(!menuOpen)}
      />
      {menuOpen && (
        <div
          className={styles.hamburgerMenuOverlay}
          onClick={() => setMenuOpen(false)}
        >
          <div
            className={styles.hamburgerMenu}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeMenu}
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>
            <ul>
              <li>
                <NavLink to="/" onClick={() => setMenuOpen(false)}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/shop" onClick={() => setMenuOpen(false)}>
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" onClick={() => setMenuOpen(false)}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
                  Contact
                </NavLink>
              </li>
            </ul>
            <div className={styles.hamburgerIcons}>
              <button onClick={() => dispatch(showLogin())}>
                <FaRegUser />
              </button>
              <button onClick={handleToggleSearch}>
                <PiMagnifyingGlassBold />
              </button>
              <button onClick={() => dispatch(toggleWishlist())}>
                <FaRegHeart />
              </button>
              <button onClick={handleToggleCart}>
                <MdOutlineShoppingCart />
                {cartItems > 0 && (
                  <span className={styles.cartCount}>{cartItems}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
