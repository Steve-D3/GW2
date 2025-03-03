// import productsData from "../db.json";
import styles from "../styles/ProductGrid.module.css";
import ProductCard from "./ProductCard";
import { useState } from "react";
import {
  selectLimit,
  selectSortBy,
  selectViewType,
} from "../store/filterSlice";
import { useSelector } from "react-redux";

//get the product from the server http://localhost:3001/products
import { useGetProductsQuery } from "../store/productApiSlice";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock_quantity: number;
};
const ProductGrid = () => {
  const limit = useSelector(selectLimit);
  const sortBy = useSelector(selectSortBy);
  const viewType = useSelector(selectViewType);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: productsData } = useGetProductsQuery();
  if (!productsData) return null;
  const sortedProducts = [...productsData].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "price") {
      return a.price - b.price;
    }
    return 0;
  });
  const totalPages = Math.ceil(sortedProducts.length / limit);
  const startIndex = (currentPage - 1) * limit;
  const selectedProducts = sortedProducts.slice(startIndex, startIndex + limit);

  return (
    <>
      <section className={styles["product-contanier"]}>
        <div
          className={
            viewType === "grid"
              ? styles["product-grid"]
              : styles["product-list"]
          }
        >
          {selectedProducts.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              viewType={viewType}
            />
          ))}
        </div>
        <div className={styles["pagination"]}>
          {/* add numbers of product shown and total  in filter ( will use this in filter compnent )*/}
          {/* <span> Showing 8 of {productsData.length} results</span> */}

          <button
            onClick={() => {
              setCurrentPage(currentPage - 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={currentPage === 1 ? styles["hidden-btn"] : ""}
          >
            Prev
          </button>
          {/* add numbers of pages */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => {
                setCurrentPage(index + 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`${styles["pagination-number-btn"]} ${
                index + 1 === currentPage ? styles["active"] : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
          {/* if there are more pages, show next button if not,  hidden "Next" button*/}
          <button
            onClick={() => {
              setCurrentPage(currentPage + 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={currentPage === totalPages ? styles["hidden-btn"] : ""}
          >
            Next
          </button>
        </div>
      </section>
    </>
  );
};

export default ProductGrid;
