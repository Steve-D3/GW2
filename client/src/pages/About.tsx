import AboutUsPlasticCounter from "../components/AboutUsPlasticCounter";
import Breadcrumb from "../components/Breadcrumb";
import styles from "../styles/AboutUs.module.css";

const About = () => {
  return (
    <>
      <section className={styles["about-us-container"]}>
        <div>
          <img src="/wall-unsplash.jpg" alt="" />
        </div>
        <div>
          <h1>About Us</h1>
          <Breadcrumb />
        </div>
      </section>
      <section className={styles["about-us-text-container"]}>
        <div>
          {" "}
          <h2>
            Because there is no Planet B, every choice we make today shapes the
            world of tomorrow.
          </h2>{" "}
          <AboutUsPlasticCounter />
          <p>
            At <span>SustainLoop</span>, we believe sustainability isn’t just an
            option—it’s a necessity. Our mission is to provide eco-friendly,
            high-quality products that help reduce waste and promote a circular
            economy.
          </p>
          <p>
            We carefully curate sustainable alternatives for everyday
            essentials, partnering with ethical brands that prioritize the
            planet. Whether it’s reusable, biodegradable, or made from recycled
            materials, our products are designed to help you live a greener
            lifestyle without compromising on quality.
          </p>
          <p>
            By choosing <span>SustainLoop</span>, you're not just
            shopping—you’re making a statement. Together, we can close the loop
            on waste and create a cleaner, healthier planet for future
            generations.
          </p>
          <p>Join us on our journey to a greener future.</p>
        </div>
      </section>
    </>
  );
};
export default About;
