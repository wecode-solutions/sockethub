// auth.js
const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  return !!token; // Returns true if token exists
};

const redirectIfAuthenticated = () => {
  if (isAuthenticated()) {
    window.location.href = "dashboard.html";
  }
};

const redirectIfNotAuthenticated = () => {
  if (!isAuthenticated()) {
    window.location.href = "index.html";
  }
};


// logout when id logout is clicked
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("authToken");
  window.location.href = "index.html";
});