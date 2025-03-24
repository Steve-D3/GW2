import styles from "../styles/CustomFilter.module.css";
import { useDispatch, useSelector } from "react-redux";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {
  selectCategory,
  filterByCategory,
  setPriceRange,
  selectPriceRange,
} from "../store/filterSlice";

const CustomFilter = () => {
  const dispatch = useDispatch();
  const category = useSelector(selectCategory);
  const range = useSelector(selectPriceRange) || { min: 0, max: 500 }; // Ensure default values

  const handleChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      dispatch(setPriceRange({ min: value[0], max: value[1] }));
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterByCategory(e.target.value));
    console.log("Selected category:", e.target.value);
  };

  return (
    <>
      <div className={styles.customFilter}>
        <div>
          {" "}
          <label htmlFor="categoryFilter"> Filter by Category</label>
          <select
            name="categoryFilter"
            id="categoryFilter"
            onChange={handleCategoryChange}
            value={category}
          >
            <option value="">All</option>
            <option value="67c5f67de9a4850a67fccc73">Kitchen</option>
            <option value="67c5f67de9a4850a67fccc72">Hygiene</option>
            <option value="67c5f67de9a4850a67fccc75">Fashion</option>
            <option value="67c5f67de9a4850a67fccc76">Stationery</option>
            <option value="67c5f67de9a4850a67fccc74">Organic Food</option>
          </select>
        </div>
        <div>
          <p> Price Range:</p>
          <Slider
            range
            min={0}
            max={50}
            step={2}
            value={[range.min, range.max]}
            onChange={handleChange}
          />
          <p>
            €{range.min} - €{range.max}
          </p>
        </div>
      </div>
    </>
  );
};

export default CustomFilter;
