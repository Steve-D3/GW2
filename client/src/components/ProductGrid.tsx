import { useEffect, useState } from "react";
import styles from "../styles/ProductGrid.module.css";
import ProductCard from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLimit,
  selectSortBy,
  selectViewType,
  selectCategory,
  selectPriceRange,
  setAmountOfProductsFiltered,
  setAmountOfProductsSelected,
} from "../store/filterSlice";
import { useGetProductsQuery } from "../store/productApiSlice";

const ProductGrid = () => {
  const dispatch = useDispatch();
  const limit = useSelector(selectLimit);
  const sortBy = useSelector(selectSortBy);
  const viewType = useSelector(selectViewType);
  const category = useSelector(selectCategory);
  const priceRange = useSelector(selectPriceRange);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: productsData, isLoading, isError } = useGetProductsQuery();

  useEffect(() => {
    if (productsData) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setCurrentPage(1);
    }
  }, [limit, sortBy, viewType, category, priceRange.min, priceRange.max]);

  if (isLoading) {
    return <div className={styles.loading}>Loading products...</div>;
  }

  if (isError) {
    return <div className={styles.error}>Failed to load products</div>;
  }

  const sortedProducts = productsData
    ? [...productsData].sort((a, b) =>
        sortBy === "name"
          ? a.name.localeCompare(b.name)
          : sortBy === "price"
          ? a.price - b.price
          : 0
      )
    : [];

  const filteredProducts = sortedProducts.filter((product) => {
    const categoryMatch = category === "" || product.category === category;
    const priceInRange =
      product.price >= priceRange.min && product.price <= priceRange.max;
    return categoryMatch && priceInRange;
  });

  const totalPages = Math.ceil(filteredProducts.length / limit);
  const startIndex = (currentPage - 1) * limit;
  const selectedProducts = filteredProducts.slice(
    startIndex,
    startIndex + limit
  );

  const handlePagination = (page: number) => {
    setCurrentPage(page);
  };

  const amountOfProducts = filteredProducts.length;
  const amountofSelectedProducts = selectedProducts.length;
  dispatch(setAmountOfProductsFiltered(amountOfProducts));
  dispatch(setAmountOfProductsSelected(amountofSelectedProducts));

  return (
    <section className={styles["product-container"]}>
      <div
        className={
          viewType === "grid" ? styles["product-grid"] : styles["product-list"]
        }
      >
        {selectedProducts.length === 0 ? (
          <div className={styles.notFoundProductMsg}>
            <p>No products found</p>
          </div>
        ) : (
          selectedProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              viewType={viewType}
            />
          ))
        )}
      </div>

      {amountofSelectedProducts > 0 && (
        <div className={styles["pagination"]}>
          <button
            onClick={() => handlePagination(currentPage - 1)}
            className={currentPage === 1 ? styles["hidden-btn"] : ""}
            aria-label="Previous Page"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePagination(index + 1)}
              className={`${styles["pagination-number-btn"]} ${
                index + 1 === currentPage ? styles["active"] : ""
              }`}
              aria-label={`Page ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePagination(currentPage + 1)}
            className={currentPage === totalPages ? styles["hidden-btn"] : ""}
            aria-label="Next Page"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
