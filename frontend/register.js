document.addEventListener("DOMContentLoaded", redirectIfAuthenticated);

document
  .getElementById("registerForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        window.location.href = "index.html";
      } else {
        console.error("Registration failed:", await response.text());
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  });
