// import db from "../../db.json";
// import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/ProductDetails.css";
import { useGetProductByIdQuery } from "../../store/productApiSlice";
// import { useState } from "react";

// interface Product {
//   _id: number;
//   name: string;
//   description: string;
//   price: number;
//   image_url: { url: string }[];
//   stock_quantity: number;
// }

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(id || "");
  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (isError)
    return <p className="text-center text-gray-500">Error loading product</p>;

  // const [product, setProduct] = useState<Product | null>(null);
  // const [quantity, setQuantity] = useState(1);
  // const [selectedSize, setSelectedSize] = useState<string | null>(null);
  // const [selectedColor, setSelectedColor] = useState<string | null>(null);
  // const [activeTab, setActiveTab] = useState("description"); // Tab state

  // useEffect(() => {
  //   if (id) {
  //     const foundProduct = db
  //       .map((item) => item)
  //       .find((p) => p.id === Number(id));
  //     setProduct(foundProduct || null);
  //   }
  // }, [id]);

  // Alternative fetch() method
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
    <div>
      <div className="product-details-container">
        <div className="product-content">
          {/* Thumbnail Sidebar */}
          <div className="thumbnail-container">
            <img
              src={product.image_url[0].url}
              alt="Thumbnail 1"
              className="thumbnail"
            />
            <img
              src={product.image_url[0].url}
              alt="Thumbnail 2"
              className="thumbnail"
            />
            <img
              src={product.image_url[0].url}
              alt="Thumbnail 3"
              className="thumbnail"
            />
            <img
              src={product.image_url[0].url}
              alt="Thumbnail 4"
              className="thumbnail"
            />
          </div>

          {/* Main Product Image */}
          <div className="product-image-container">
            <img
              src={product.image_url[0].url}
              alt={product.name}
              className="product-image"
            />
          </div>

          {/* Product Details */}
          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-price">$ {product.price.toFixed(2)}</p>
            <div className="rating">
              ⭐⭐⭐⭐⭐ <span>5 Customer Reviews</span>
            </div>
            <p className="product-description">{product.description}</p>

            {/* Size Selection */}
            <div className="size-selection">
              <span>Size</span>
              <div className="size-options">
                {["L", "XL", "XS"].map((size) => (
                  <button
                    key={size}
                    // className={`size-button ${
                    //   selectedSize === size ? "selected" : ""
                    // }`}
                    // onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="color-selection">
              <span>Color</span>
              <div className="color-options">
                {["#473bf0", "#000", "#c49c5d"].map((color) => (
                  <button
                    key={color}
                    // className={`color-button ${
                    //   selectedColor === color ? "selected" : ""
                    // }`}
                    // style={{ backgroundColor: color }}
                    // onClick={() => setSelectedColor(color)}
                  ></button>
                ))}
              </div>
            </div>

            {/* Quantity & Buttons */}
            <div className="action-section">
              <div className="quantity-selector">
                <button
                // onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                >
                  -
                </button>
                {/* <span>{pquantity}</span> */}
                {/* <button onClick={() => setQuantity(quantity + 1)}>+</button> */}
              </div>
              <button className="add-to-cart">Add To Cart</button>
              <button className="compare">Compare</button>
            </div>

            {/* Additional Details */}
            <div className="product-meta">
              <p>
                <strong>SKU:</strong> SS001
              </p>
              <p>
                <strong>Category:</strong> Sofas
              </p>
              <p>
                <strong>Tags:</strong> Sofa, Chair, Home, Shop
              </p>
              <div className="social-share">
                <span>Share:</span>
                🔗 📘 🐦 📸
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="product-tab-content">
        {activeTab === "description" && (
          <>
            <p className="tab-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              nec odio. Praesent libero.
            </p>
            <p className="tab-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              sodales ligula in libero.
            </p>

            <div className="image-gallery">
              <img
                src={product.image_url}
                alt="Product View 1"
                className="gallery-image"
              />
              <img
                src={product.image_url}
                alt="Product View 2"
                className="gallery-image"
              />
            </div>
          </>
        )}
      </div> */}
    </div>
  );
};

export default ProductDetails;
