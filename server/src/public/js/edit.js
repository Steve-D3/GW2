
document
  .querySelector("#edit-product-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    console.log("Submit button clicked! Preparing update...");

    const productId = document.querySelector("#product_id").value;
    const name = document.querySelector("#name").value;
    const description = document.querySelector("#description").value;
    const price = document.querySelector("#price").value;
    const stock = document.querySelector("#stock").value;
    const category = document.querySelector("#category").value; 

    const updateData = {
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      category, 
    };

    console.log(" Sending update request with data:", updateData);

    const response = await fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });

    const responseData = await response.json();
    console.log("Server Response:", responseData);

    if (response.ok) {
      window.location.href = "/";
    } else {
      alert("Error updating product: " + responseData.message);
    }
  });
