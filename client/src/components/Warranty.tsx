import styles from "../styles/Warranty.module.css";
import { GrTrophy } from "react-icons/gr";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { TbPackageImport } from "react-icons/tb";
import { MdOutlineSupportAgent } from "react-icons/md";

const Warranty = () => {
  return (
    <div className={styles.warranty}>
      <div className={styles.items}>
        <h2>
          <GrTrophy />
        </h2>
        <span>
          <h1>High Quality</h1>
          <p>crafted from top materials</p>
        </span>
      </div>
      <div className={styles.items}>
        <h2>
          <IoShieldCheckmarkOutline />
        </h2>
        <span>
          <h1>Warranty Protection</h1>
          <p>Over 2 years</p>
        </span>
      </div>
      <div className={styles.items}>
        <h2>
          <TbPackageImport />
        </h2>
        <span>
          <h1>Free Shipping</h1>
          <p>Orders over 150 EUR</p>
        </span>
      </div>
      <div className={styles.items}>
        <h2>
          <MdOutlineSupportAgent />
        </h2>
        <span>
          <h1>24/7 Support</h1>
          <p>Dedicated Support</p>
        </span>
      </div>
    </div>
  );
};
export default Warranty;
