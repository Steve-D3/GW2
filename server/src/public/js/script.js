const deleteBtns = document.querySelectorAll(".deleteBtn");
const registerForm = document.querySelector("#register-form");
const errorDiv = document.querySelector(".error");
const loginForm = document.querySelector("#login-form");
const logoutBtn = document.querySelector("#logoutBtn");

logoutBtn?.addEventListener("click", async (e) => {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/login";
  } catch (error) {
    console.error("Error during logout:", error);
  }
});

loginForm?.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const inputData = Object.fromEntries(formData);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(inputData),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message);
    }

    console.log(response);
    window.location.href = "/";
  } catch (error) {
    errorDiv.textContent = error.message;
    console.error("Error during registration:", error);
  }
});

registerForm?.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    const formData = new FormData(registerForm);
    const inputData = Object.fromEntries(formData);

    const response = await fetch("/api/auth/register/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(inputData),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message);
    }

    console.log(response);
    window.location.href = "/";
    // location.re
  } catch (error) {
    errorDiv.textContent = error.message;
    console.error("Error during registration:", error);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  console.log("script.js loaded");

  document.body.addEventListener("click", async (event) => {
    if (event.target.classList.contains("deleteBtn")) {
      const productId = event.target.dataset.id;

      if (!confirm("Are you sure you want to delete this product?")) return;

      try {
        console.log("🗑️ Deleting product:", productId);

        const response = await fetch(`/api/products/${productId}`, {
          method: "DELETE",
        });

        const result = await response.json();

        if (!response.ok) throw new Error(result.message);

        console.log(" Product deleted:", result);
        alert("Product deleted successfully!");
        window.location.reload();
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product.");
      }
    }
  });
});
