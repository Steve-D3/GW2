import { useGetProductsQuery } from "../store/productApiSlice";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/SearchBar.module.css";
import { toggelSearch } from "../store/searchSlice";
import { useDispatch } from "react-redux";
const ProductsList = () => {
  const dispatch = useDispatch();
  const handleCloseSearch = () => {
    dispatch(toggelSearch());
  };
  const { data: products, error, isLoading } = useGetProductsQuery();

  const [searchName, setSearchName] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchName.toLowerCase())
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products.</p>;

  return (
    <div className={styles["search-container"]}>
      <input
        type="text"
        value={searchName}
        onChange={handleSearchChange}
        placeholder="Search for products"
        className={styles["search-bar"]}
      />

      {/* Show product suggestions only if there is a search query */}
      {searchName && (
        <ul className={styles["product-suggestions"]}>
          {filteredProducts?.map((product) => (
            <li key={product._id} className={styles["product-suggestion"]}>
              <Link
                to={`/shop/${product._id}/${product.name}`}
                onClick={handleCloseSearch}
              >
                <h3>{product.name}</h3>
                <img
                  src={product.image_url[0]?.url}
                  alt={product.name}
                  width={"100px"}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductsList;
