import styles from "../styles/ProductFilter.module.css";
import Breadcrumb from "./Breadcrumb";
import { BsViewList } from "react-icons/bs";
import { HiViewGrid } from "react-icons/hi";
import { GiSettingsKnobs } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import {
  setLimit,
  selectLimit,
  setSortBy,
  selectSortBy,
  setViewType,
  selectViewType,
  selectViewFilter,
  toggelFilter,
  selectAmountOfProductsFiltered,
  selectAmountOfProductsSelected,
} from "../store/filterSlice";
import { useGetProductsQuery } from "../store/productApiSlice";
import CustomFilter from "./CustomFilter";

const ProductFilter = () => {
  const limit = useSelector(selectLimit);
  const sortBy = useSelector(selectSortBy);
  const viewType = useSelector(selectViewType);
  const viewFilter = useSelector(selectViewFilter);
  const amountOfProductsFiltered = useSelector(selectAmountOfProductsFiltered);
  const amountofSelectedProducts = useSelector(selectAmountOfProductsSelected);
  const dispatch = useDispatch();

  //to know total products from the server
  const { data: productsData } = useGetProductsQuery();
  if (!productsData) return null;

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLimit(Number(e.target.value)));
  };
  const handleViewChange = (viewType: string) => {
    dispatch(setViewType(viewType));
  };
  const handleViewFilter = () => {
    dispatch(toggelFilter());
    console.log(viewFilter);
  };
  return (
    <>
      <section className={styles["shop-header"]}>
        <div>
          <img src="/shopPanner.jpg" alt="" />
        </div>
        <div>
          <h1>Shop</h1>
          <Breadcrumb />
        </div>
      </section>
      <section className={styles["product-filter"]}>
        <div>
          <div>
            <div>
              <i className={styles.customFilterIcon}>
                <GiSettingsKnobs onClick={handleViewFilter} />
              </i>
              <p>Filter</p>
            </div>

            <i
              className={viewType === "grid" ? styles["active"] : ""}
              onClick={() => handleViewChange("grid")}
            >
              <HiViewGrid />
            </i>
            <i
              className={viewType === "list" ? styles["active"] : ""}
              onClick={() => handleViewChange("list")}
            >
              <BsViewList />
            </i>
            <i>|</i>
            <p>
              {" "}
              Showing {amountofSelectedProducts} of {amountOfProductsFiltered}{" "}
              results
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
            <select
              value={sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value))}
            >
              <option value="relevance">Relevance</option>
              <option value="name">Name</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>
        {viewFilter && <CustomFilter />}
      </section>
    </>
  );
};
export default ProductFilter;
