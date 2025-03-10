import { useGetProductsQuery } from "../store/productApiSlice";
import { useState } from "react";
import { Link } from "react-router-dom";
const ProductsList = () => {
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
    <div>
      <input
        type="text"
        value={searchName}
        onChange={handleSearchChange}
        placeholder="Search for products"
      />

      {/* Show product suggestions only if there is a search query */}
      {searchName && (
        <ul
          style={{
            listStyle: "none",
            display: "grid",
            backgroundColor: "white",
          }}
        >
          {filteredProducts?.map((product) => (
            <li key={product._id}>
              <Link to={`/shop/${product._id}/${product.name}`}>
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
