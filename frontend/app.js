document.addEventListener("DOMContentLoaded", redirectIfNotAuthenticated);

document.addEventListener("DOMContentLoaded", async () => {
  redirectIfNotAuthenticated();

  const projectForm = document.getElementById("projectForm");
  const projectNameInput = document.getElementById("projectName");
  const projectList = document.getElementById("projectList");

  // Fetch projects on load
  await fetchProjects();

  // Handle project creation
  projectForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const projectName = projectNameInput.value.trim();
    if (!projectName) return;

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ name: projectName }),
      });

      if (response.ok) {
        projectNameInput.value = "";
        await fetchProjects();
      } else {
        console.error("Error creating project:", await response.text());
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  });

  // Fetch and display projects
  async function fetchProjects() {
    try {
      const response = await fetch("/api/projects", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.ok) {
        const projects = await response.json();
        projectList.innerHTML = projects
          .map(
            (project) => `
              <tr>
                <td class="p-2 border">${project.name}</td>
                <td class="p-2 border">
                  <button
                    class="bg-green-500 text-white px-4 py-1 rounded"
                    onclick="navigator.clipboard.writeText('${project.apiKey}')"
                  >
                    Copy Key
                  </button>
                </td>
                <td class="p-2 border text-center">
                  <button
                    class="bg-yellow-500 text-white px-4 py-1 rounded mr-2"
                    onclick="editProject('${project._id}', '${project.name}')"
                  >
                    Edit
                  </button>
                  <button
                    class="bg-red-500 text-white px-4 py-1 rounded"
                    onclick="deleteProject('${project._id}')"
                  >
                    Delete
                  </button>
                </td>
              </tr>`
          )
          .join("");
      } else {
        console.error("Error fetching projects:", await response.text());
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }

  // Edit project
  window.editProject = async (projectId, currentName) => {
    const newName = prompt("Enter new project name:", currentName);
    if (!newName || newName === currentName) return;

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ name: newName }),
      });

      if (response.ok) {
        await fetchProjects();
      } else {
        console.error("Error updating project:", await response.text());
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  // Delete project
  window.deleteProject = async (projectId) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.ok) {
        await fetchProjects();
      } else {
        console.error("Error deleting project:", await response.text());
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };
});
