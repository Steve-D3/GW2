import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../../styles/Header.module.css";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { showLogin } from "../../store/signinSlice";
import { showCart } from "../../store/addToCartSlice";
import { toggelSearch } from "../../store/searchSlice";
import { toggleWishlist } from "../../store/wishlistSlice";
import { FaUserCheck } from "react-icons/fa";

const HamburgerMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const handleToggleSearch = () => {
    dispatch(toggelSearch());
    setMenuOpen(false);
  };

  const handleToggleCart = () => {
    dispatch(showCart());
    setMenuOpen(false);
  };

  const currentUser = useSelector(
    (state: {
      signin: { user: { name: string; email: string; _id: string } };
    }) => state.signin.user
  );

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
              {/* <button onClick={() => dispatch(showLogin())}>
                <FaRegUser />
              </button> */}

              {currentUser ? (
                <button onClick={() => dispatch(showLogin())}>
                  {" "}
                  <FaUserCheck />
                </button>
              ) : (
                <button onClick={() => dispatch(showLogin())}>
                  {" "}
                  <FaRegUser />
                </button>
              )}
              <button onClick={handleToggleSearch}>
                <PiMagnifyingGlassBold />
              </button>
              <button onClick={() => dispatch(toggleWishlist())}>
                <FaRegHeart />
              </button>
              <button onClick={handleToggleCart}>
                <MdOutlineShoppingCart />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
