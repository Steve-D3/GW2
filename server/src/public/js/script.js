const deleteBtns = document.querySelectorAll(".deleteBtn");
const registerForm = document.querySelector("#register-form");
const loginForm = document.querySelector("#login-form");

const logoutBtn = document.querySelector("#logoutBtn");
// const deleteBtns = document.querySelectorAll("#deleteBtn");

const errorDiv = document.querySelector(".error");
const successDiv = document.querySelector(".success");

logoutBtn?.addEventListener("click", async () => {
  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message);
    }

    
    // Display success message
    successDiv.textContent = "Logged out successfully!";
    successDiv.style.display = "block";
    errorDiv.style.display = "none";
    
    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  } catch (error) {
    errorDiv.textContent = error.message;
    errorDiv.style.display = "block";
    successDiv.style.display = "none";
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
  
      
      const data = await response.json();
      console.log(data);

      // Display success message
      successDiv.textContent = data.message;
      successDiv.style.display = "block";
      errorDiv.style.display = "none";

      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (error) {
      errorDiv.textContent = error.message;
      errorDiv.style.display = "block";
      successDiv.style.display = "none";
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

    const data = await response.json();
    console.log(data);

    successDiv.textContent = data.message;
    successDiv.style.display = "block";
    errorDiv.style.display = "none";

    setTimeout(() => {
      window.location.href = "/";
    }, 1500);

  } catch (error) {
    errorDiv.textContent = error.message;
    errorDiv.style.display = "block";
    successDiv.style.display = "none";
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
