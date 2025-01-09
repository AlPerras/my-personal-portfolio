// Navigation
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const links = document.querySelectorAll("#nav-links li a");

// Smooth scroll for navigation
links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    targetSection.scrollIntoView({
      behavior: "smooth",
    });

    // Close mobile menu if open
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.querySelector('input[name="color-scheme"]');
  const root = document.documentElement;

  // Function to set the theme
  const setTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    themeToggle.checked = theme === "dark";
  };

  // Check for saved theme in localStorage
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    // Use system preference if no saved theme
    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    setTheme(systemPreference);
  }

  // Listen for theme toggle changes
  themeToggle.addEventListener("change", () => {
    const newTheme = themeToggle.checked ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  });

  // Optional: Listen for system preference changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      const systemTheme = e.matches ? "dark" : "light";
      if (!localStorage.getItem("theme")) {
        setTheme(systemTheme);
      }
    });
});

function sendMail() {
  let parms = {
    name: document.getElementById("name").value,
    subject: document.getElementById("subject").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };
  emailjs
    .send("service_3jpbdpg", "template_lvfwiqa", parms)
    .then(alert("Email Sent!"));
}
