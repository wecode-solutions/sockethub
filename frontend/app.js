const projectForm = document.getElementById("projectForm");
const projectNameInput = document.getElementById("projectName");
const projectList = document.getElementById("projectList");

const API_BASE_URL = "/api/projects";

// Fetch and display all projects
const fetchProjects = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    const projects = await response.json();

    projectList.innerHTML = projects
      .map(
        (project) => `
                <li class="flex justify-between items-center p-2 border-b border-gray-300">
                    <span>${project.name}</span>
                    <button
                        class="bg-green-500 text-white px-4 py-1 rounded"
                        onclick="navigator.clipboard.writeText('${project.apiKey}')"
                    >
                        Copy Key
                    </button>
                </li>`
      )
      .join("");
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};

// Handle project creation
projectForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const projectName = projectNameInput.value;

  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: projectName }),
    });

    if (response.ok) {
      projectNameInput.value = "";
      fetchProjects(); // Refresh the project list
    } else {
      console.error("Error creating project:", await response.text());
    }
  } catch (error) {
    console.error("Error creating project:", error);
  }
});

// Initialize
fetchProjects();
