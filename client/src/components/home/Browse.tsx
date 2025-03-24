import browseIMG1 from "../../assets/zero-waste.jpg";
import browseIMG2 from "../../assets/sustainable-fashion.jpg";
import browseIMG3 from "../../assets/sustainable-groceries.jpg";
import { setHomeCategory } from "../../store/filterSlice";
import { useDispatch } from "react-redux";

const Browse = () => {
  const dispatch = useDispatch();

  const handleHygiene = () => {
    dispatch(setHomeCategory("67c5f67de9a4850a67fccc72"));
  };
  const handleFashion = () => {
    dispatch(setHomeCategory("67c5f67de9a4850a67fccc75"));
  };
  const handleGroceries = () => {
    dispatch(setHomeCategory("67c5f67de9a4850a67fccc74"));
  };

  return (
    <>
      <section className="browse">
        <div className="text-container">
          <h2>Browse The Range</h2>
          <p>
            We offer a wide range of eco-friendly categorys, from eco-friendly
            fashion to eco-friendly groceries.
          </p>
        </div>
        <div className="images-container">
          <div onClick={handleHygiene}>
            <img src={browseIMG1} alt="placeholder" />
            <p>Zero-Waste Hygiene</p>
          </div>
          <div onClick={handleFashion}>
            <img src={browseIMG2} alt="placeholder" />
            <p>Sustainable fashion</p>
          </div>
          <div onClick={handleGroceries}>
            <img src={browseIMG3} alt="placeholder" />
            <p>Sustainable Groceries</p>
          </div>
        </div>
      </section>
    </>
  );
};
export default Browse;
