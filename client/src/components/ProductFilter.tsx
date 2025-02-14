import styles from "../styles/ProductFilter.module.css";
import Breadcrumb from "./Breadcrumb";
import { BsViewList } from "react-icons/bs";
import { HiViewGrid } from "react-icons/hi";
import { GiSettingsKnobs } from "react-icons/gi";

const ProductFilter = () => {
  return (
    <>
      <section className={styles["product-filter-container"]}>
        <div>
          <img src="/shopPanner.jpg" alt="" />
        </div>
        <div>
          <h1>Shop</h1>
          <Breadcrumb />
        </div>
        <div>
          <div>
            <div>
              <i>
                <GiSettingsKnobs />
              </i>
              <p>Filter</p>
            </div>

            <i>
              <HiViewGrid />
            </i>
            <i>
              <BsViewList />
            </i>
            <i>|</i>
            <p> Showing 1–12 of 15 results</p>
          </div>
          <div>
            <label htmlFor="filter-by-product-numbers">Show</label>
            <select name="showPerPage" id="showPerPage">
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="24">24</option>
            </select>
            <label htmlFor="sort-by">Sort by</label>
            <select name="sort-by" id="sort-by">
              <option value="name">Name</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>
      </section>
    </>
  );
};
export default ProductFilter;
