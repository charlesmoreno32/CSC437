const menuButton = document.querySelector(".menu-button");
const navBar = document.querySelector("nav-bar");

menuButton.addEventListener("click", () => {
  navBar.classList.toggle("active");
});

document.addEventListener("click", function (event) {
  if (!navBar.contains(event.target) && !menuButton.contains(event.target)) {
    navBar.classList.remove("active");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Check localStorage for dark mode preference
  const isDarkMode = localStorage.getItem("darkMode") === "true";

  // Apply dark mode immediately on page load
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
  }

  // Select the dark mode toggle checkbox
  const darkModeToggle = document.querySelector("#dark-mode-toggle");

  if (darkModeToggle) {
    // Sync the toggle state with localStorage
    darkModeToggle.checked = isDarkMode;

    // Add event listener for change events
    darkModeToggle.addEventListener("change", (event) => {
      const isChecked = event.target.checked;

      // Toggle dark mode class on <body>
      document.body.classList.toggle("dark-mode", isChecked);

      // Save the preference to localStorage
      localStorage.setItem("darkMode", isChecked);
    });
  }
});
