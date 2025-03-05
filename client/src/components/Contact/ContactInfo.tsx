import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import styles from "../../styles/GetInTouch.module.css";

const ContactInfo: React.FC = () => {
  return (
    <div className={styles.contactInfo}>
      <div className={styles.infoItem}>
        <FaMapMarkerAlt className={styles.icon} />
        <div>
          <h3>Address</h3>
          <p>236 5th SE Avenue, New York NY10000, United States</p>
        </div>
      </div>

      <div className={styles.infoItem}>
        <FaPhone className={styles.icon} />
        <div>
          <h3>Phone</h3>
          <p>Mobile: + (84) 546-6789</p>

          <p>Hotline: + (84) 456-6789</p>
        </div>
      </div>

      <div className={styles.infoItem}>
        <FaClock className={styles.icon} />
        <div>
          <h3>Working Time</h3>
          <p>Monday-Friday: 9:00 - 22:00</p>

          <p>Saturday-Sunday: 9:00 - 21:00</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
