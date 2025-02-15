import { NavLink } from "react-router";
import styles from "../../styles/Header.module.css";

const Header = () => {
  return (
    <header>
      <nav className={styles["header-logo"]}>
        <div>
          <img src="logo.svg" alt="SustainLoop" />
        </div>
        <h3>SustainLoop</h3>
      </nav>
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
            <NavLink to="/">AV</NavLink>
          </li>
          <li>
            <NavLink to="/">MG</NavLink>
          </li>
          <li>
            <NavLink to="/">HRT</NavLink>
          </li>
          <li>
            <NavLink to="/">SC</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
