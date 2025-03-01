import Breadcrumb from "../components/Breadcrumb";
import styles from "../styles/ContactUsPage.module.css";
const Contact = () => {
  return (
    <section className={styles["contact-us-header"]}>
      <div>
        <img src="/stay-at-work-article-four.jpg" alt="" />
      </div>
      <div>
        <h1>Contact</h1>
        <Breadcrumb />
      </div>
    </section>
  );
};
export default Contact;
