document
  .querySelector("#add-product-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    console.log("🚀 Adding new product...");

    const name = document.querySelector("#name").value;
    const description = document.querySelector("#description").value;
    const price = document.querySelector("#price").value;
    const stock = document.querySelector("#stock").value;
    const category = document.querySelector("#category").value; 
    const image_url = document.querySelector("#image_url").value;

    const newProduct = {
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      category, 
      image_url,
    };

    console.log(" Sending new product data:", newProduct);

    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });

    const responseData = await response.json();
    console.log("Server Response:", responseData);

    if (response.ok) {
      window.location.href = "/";
    } else {
      alert("Error adding product: " + responseData.message);
    }
  });
