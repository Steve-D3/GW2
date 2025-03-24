import { NavLink } from "react-router";

const Banner = () => {
  return (
    <>
      <section className="banner-section">
        <div className="home-banner">
          <div className="banner-div-text">
            <p>New Arrival</p>
            <h2>Eco-Friendly Essentials</h2>
            <p>
              Eco friendly products that help reduce waste and promote a
              circular economy for future generations .
            </p>
          </div>
          <NavLink to="/shop">
            <button>SHOP NOW</button>
          </NavLink>
        </div>
      </section>
    </>
  );
};
export default Banner;
