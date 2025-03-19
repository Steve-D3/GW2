document.addEventListener("DOMContentLoaded", () => {
    console.log(" edit.js is loaded and running!");

    const editProductForm = document.querySelector("#edit-product-form");

    editProductForm?.addEventListener("submit", async (e) => {
        e.preventDefault();

        console.log("Submit button clicked! Preparing update...");

        const productId = document.querySelector("#product_id").value;
        const formData = new FormData(editProductForm);
        const productData = Object.fromEntries(formData);
        delete productData.product_id; // Remove hidden field

        // Convert stock and price to numbers
        productData.stock = Number(productData.stock);
        productData.price = Number(productData.price);

        console.log("🔹 Sending update request with data:", productData);

        const response = await fetch(`/api/products/${productId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData)
        });

        const result = await response.json();
        console.log("🔹 Server Response:", result);

        window.location.href = "/";
    });
});document.addEventListener("DOMContentLoaded", () => {
    console.log("edit.js is loaded and running!");

    const editProductForm = document.querySelector("#edit-product-form");

    editProductForm?.addEventListener("submit", async (e) => {
        e.preventDefault();

        console.log(" Submit button clicked! Preparing update...");

        const productId = document.querySelector("#product_id").value;
        const formData = new FormData(editProductForm);
        const productData = Object.fromEntries(formData);
        delete productData.product_id; // Remove hidden field

        // Convert stock and price to numbers
        productData.stock = Number(productData.stock);
        productData.price = Number(productData.price);

        console.log("🔹 Sending update request with data:", productData);

        const response = await fetch(`/api/products/${productId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData)
        });

        const result = await response.json();
        console.log("🔹 Server Response:", result);

        window.location.href = "/";
    });
});

