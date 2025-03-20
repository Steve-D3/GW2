const registerForm = document.querySelector("#register-form");
const loginForm = document.querySelector("#login-form");

const logoutBtn = document.querySelector("#logoutBtn");
const deleteBtns = document.querySelectorAll("#deleteBtn");

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
      }, 1000);
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

    window.location.href = "/";
  } catch (error) {
    errorDiv.textContent = error.message;
    errorDiv.style.display = "block";
    successDiv.style.display = "none";
    console.error("Error during registration:", error);
  }
});

const removeVehicle = async (id) => {
  const response = await fetch(`/api/vehicles/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  console.log(data);
};

deleteBtns.forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    await removeVehicle(e.target.dataset.id);
    location.reload();
  });
});