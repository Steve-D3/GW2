import Breadcrumb from "../components/Breadcrumb";
import GetInTouch from "../components/Contact/GetIntouch";
import styles from "../styles/ContactUsPage.module.css";
const Contact = () => {
  return (
    <>
      <section className={styles["contact-us-header"]}>
        <div>
          <img src="/shopPanner.jpg" alt="" />
        </div>
        <div>
          <h1>Contact</h1>
          <Breadcrumb />
        </div>
      </section>
      <section className={styles["contact-section"]}>
        <GetInTouch />
      </section>
    </>
  );
};
export default Contact;
