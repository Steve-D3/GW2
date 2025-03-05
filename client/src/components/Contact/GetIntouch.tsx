import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import styles from "../../styles/GetInTouch.module.css";

const GetInTouch: React.FC = () => {
  return (
    <section className={styles.getInTouch}>
      <div className={styles.container}>
        <h2 className={styles.title}>Get In Touch With Us</h2>
        <p className={styles.subtitle}>
          For More Information About Our Product & Services, Please Feel Free To
          Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not
          Hesitate!
        </p>

        <div className={styles.content}>
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
