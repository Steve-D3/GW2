import { NavLink } from "react-router";
import styles from "../../styles/Header.module.css";
import { FaRegHeart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";
//import signinslice
import { useDispatch } from "react-redux";
import { showLogin } from "../../store/signinSlice";

// const Header = ({ handelLoginClick }: { handelLoginClick: () => void }) => {
//   const handelLogin = () => {
//     handelLoginClick();
//   };

const Header = () => {
  const dispatch = useDispatch();
  const handelLogin = () => {
    dispatch(showLogin());
  };

  return (
    <header>
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
            {/* onclick show login from slice */}
            <button onClick={handelLogin}>
              {" "}
              <FaRegUser />
            </button>
          </li>
          <li>
            <NavLink to="/">
              <PiMagnifyingGlassBold />
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <FaRegHeart />
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <MdOutlineShoppingCart />
            </NavLink>
          </li>
        </ul>
      </nav>
      <nav className={styles["header-hamburger"]}>
        <NavLink to="/">
          <GiHamburgerMenu />
        </NavLink>
      </nav>
    </header>
  );
};
export default Header;
