document.addEventListener("DOMContentLoaded", redirectIfAuthenticated);

document
  .getElementById("loginForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("authToken", data.token);
        window.location.href = "dashboard.html";
      } else {
        console.error("Login failed:", data.error);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  });
