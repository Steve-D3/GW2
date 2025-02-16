import { NavLink } from "react-router";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <section className={styles["footer-content"]}>
        <div className={styles["footer-address"]}>
          <h1>SustainLoop</h1>
          <p>Oude Baan 2</p>
          <p>2800 Mechelen</p>
          <p>Belgium</p>
        </div>
        <div className={styles["footer-links"]}>
          <ul>
            <li className={styles["footer-title"]}>Links</li>
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
        </div>
        <div className={styles["footer-help"]}>
          <ul>
            <li className={styles["footer-title"]}>Help</li>
            <li>
              <NavLink to="/">Payment Options</NavLink>
            </li>
            <li>
              <NavLink to="/">Returns</NavLink>
            </li>
            <li>
              <NavLink to="/">Privacy Policies</NavLink>
            </li>
          </ul>
        </div>
        <div className={styles["footer-newsletter"]}>
          <ul>
            <li className={styles["footer-title"]}>Newsletter</li>
            <li>
              <input type="text" placeholder="Enter your email address" />
              <button>Subscribe</button>
            </li>
          </ul>
        </div>
      </section>
      <section className={styles["footer-copyright"]}>
        <div>
          <p>&copy; 2025 Syntra — All rights reserved</p>
        </div>
      </section>
    </footer>
  );
};
export default Footer;
