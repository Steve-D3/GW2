import productsData from "../db.json";

const ProductGrid = () => {
  return (
    <div>
      {productsData.categories.map((category) => (
        <div key={category.category_name}>
          {/* <h2>{category.category_name}</h2> */}
          <div className="product-list">
            {category.products.map((product) => (
              <div key={product.id} className="product-card">
                <img
                  src={product.image_url}
                  alt={product.name}
                  style={{ width: "200px" }}
                />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>${product.price}</p>
                <p>Stock: {product.stock_quantity}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default ProductGrid;
