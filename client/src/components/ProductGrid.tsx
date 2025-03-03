// import productsData from "../db.json";
import styles from "../styles/ProductGrid.module.css";
import ProductCard from "./ProductCard";
import { useState } from "react";

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
  const [currentPage, setCurrentPage] = useState(1);
  const { data: productsData } = useGetProductsQuery();
  if (!productsData) return null;

  const totalPages = Math.ceil(productsData.length / 8);
  const startIndex = (currentPage - 1) * 8;
  const selectedProducts = productsData.slice(startIndex, startIndex + 8);

  return (
    <>
      <section className={styles["product-contanier"]}>
        <div className={styles["product-grid"]}>
          {selectedProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className={styles["pagination"]}>
          {/* add numbers of product shown and total  in filter ( will use this in filter compnent )*/}
          {/* <span> Showing 8 of {productsData.length} results</span> */}

          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className={currentPage === 1 ? styles["hidden-btn"] : ""}
          >
            Prev
          </button>
          {/* add numbers of pages */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`${styles["pagination-number-btn"]} ${
                index + 1 === currentPage ? styles["active"] : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
          {/* if there are more pages, show next button if not,  hidden "Next" button*/}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
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
