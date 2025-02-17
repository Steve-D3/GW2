import db from "../../db.json";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/ProductDetails.css";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock_quantity: number;
}

interface Category {
  category_name: string;
  products: Product[];
}

// interface ProductData {
//   categories: Category[];
// }

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get product ID from URL
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      // ✅ Use imported db.json instead of fetch()
      const foundProduct = db.categories
        .flatMap((category) => category.products)
        .find((p) => p.id === Number(id));

      setProduct(foundProduct || null);
    }
  }, [id]);
  // const ProductDetails: React.FC = () => {
  //   const { id } = useParams<{ id: string }>();
  //   const [product, setProduct] = useState<Product | null>(null);

  //   useEffect(() => {
  //     if (id) {
  //       fetch("../db.json")
  //         .then((res) => res.json())
  //         .then((data: ProductData) => {
  //           const foundProduct = data.categories
  //             .flatMap((category) => category.products)
  //             .find((p) => p.id === Number(id));

  //           setProduct(foundProduct || null);
  //         })
  //         .catch((error) => console.error("Error fetching product:", error));
  //     }
  //   }, [id]);

  if (!product) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="product-details-container">
      <div className="product-card">
        <div className="product-image-container">
          <img src={product.image_url} alt={product.name} />
        </div>

        <h1 className="product-title">{product.name}</h1>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${product.price}</p>

        <p
          className={`stock-status ${
            product.stock_quantity > 0 ? "in-stock" : "out-of-stock"
          }`}
        >
          {product.stock_quantity > 0 ? "In Stock" : "Out of Stock"}
        </p>

        <button
          className="add-to-cart"
          onClick={() => alert(`${product.name} added to cart!`)}
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
