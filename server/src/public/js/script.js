const registerForm = document.querySelector("#register-form");
const loginForm = document.querySelector("#login-form");
const addProduct = document.querySelector("#add-product-form");

const logoutBtn = document.querySelector("#logoutBtn");
const editUserBtn = document.querySelector("#editUserBtn");
const deleteUserBtns = document.querySelectorAll("#deleteUserBtn");
const deleteProductBtns = document.querySelectorAll("#deleteBtn");


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
      window.location.href = "/login/admin";
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

    const response = await fetch("/api/auth/login/admin", {
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

addProduct?.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    const formData = new FormData(addProduct);
    const inputData = Object.fromEntries(formData);
    
    const newProduct = {
      name: inputData.name,
      description: inputData.description,
      price: Number(inputData.price),
      stock: Number(inputData.stock),
      category: inputData.category,
      image_url: inputData.image_url,
    };

    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newProduct),
    });

    const data = await response.json();

    // Display success message
    successDiv.textContent = "Product added successfully!";
    successDiv.style.display = "block";
    errorDiv.style.display = "none";

    // setTimeout(() => {
    //   window.location.href = "/";
    // }, 1500);
  } catch (error) {
    errorDiv.textContent = error.message;
    errorDiv.style.display = "block";
    successDiv.style.display = "none";
    console.error("Error adding product:", error);
  }
});

editUserBtn?.addEventListener("click", async (e) => {
  try {
    e.preventDefault();
    const userId = document.querySelector("#user_id").value;
    console.log("📝 Editing user data...");

    const updateDataUser = {
      name: document.querySelector("#name").value,
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
      role: document.querySelector("#role").value,
    };


    console.log(JSON.stringify(updateDataUser));

    const response = await fetch(`/api/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateDataUser),
    });

    const responseData = await response.json();
    console.log("Server Response:", responseData);


    if (!response.ok) {
      throw new Error(responseData.message);
    }

    // Display success message
    successDiv.textContent = "User data updated successfully!";
    successDiv.style.display = "block";
    errorDiv.style.display = "none";

    setTimeout(() => {
      window.location.href = "/users";
    }, 1500);

  } catch (error) {
    errorDiv.textContent = error.message;
    errorDiv.style.display = "block";
    successDiv.style.display = "none";
    console.error("Error updating user data:", error);
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

deleteUserBtns?.forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    try {
      const userId = e.target.dataset.id;
      console.log("🗑️ Deleting user:", userId);

      if (!confirm("Are you sure you want to delete this user?")) return;

      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message);

      console.log("User deleted:", result);
      alert("User deleted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  });
});

deleteProductBtns?.forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    try {
      const productId = e.target.dataset.id;
      console.log("🗑️ Deleting product:", productId);

      if (!confirm("Are you sure you want to delete this product?")) return;

      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message);

      console.log("Product deleted:", result);
      alert("Product deleted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  console.log("script.js loaded");
});
