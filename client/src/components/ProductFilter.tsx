import styles from "../styles/ProductFilter.module.css";
import Breadcrumb from "./Breadcrumb";
import { BsViewList } from "react-icons/bs";
import { HiViewGrid } from "react-icons/hi";
import { GiSettingsKnobs } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { setLimit, selectLimit } from "../store/filterSlice";
import { useGetProductsQuery } from "../store/productApiSlice";
const ProductFilter = () => {
  const limit = useSelector(selectLimit);
  const dispatch = useDispatch();
  //to know total products from the server
  const { data: productsData } = useGetProductsQuery();
  if (!productsData) return null;
  const totalProducts = productsData.length;
  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLimit(Number(e.target.value)));
  };
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
            <p>
              {" "}
              Showing {limit} of {totalProducts} results
            </p>
          </div>
          <div>
            <label htmlFor="filter-by-product-numbers">Show</label>
            {/* add filter by product numbers from filterstate limit  */}
            <select
              name="showPerPage"
              id="showPerPage"
              onChange={handleLimitChange}
              value={limit}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
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
