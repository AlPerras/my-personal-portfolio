const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const links = document.querySelectorAll("#nav-links li a");

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    targetSection.scrollIntoView({
      behavior: "smooth",
    });

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

  const setTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    themeToggle.checked = theme === "dark";
  };

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    setTheme(systemPreference);
  }

  themeToggle.addEventListener("change", () => {
    const newTheme = themeToggle.checked ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  });

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      const systemTheme = e.matches ? "dark" : "light";
      if (!localStorage.getItem("theme")) {
        setTheme(systemTheme);
      }
    });
});

const contactForm = document.querySelector("#contact-form");
const submitBtn = document.querySelector(".submit-btn");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const message = document.querySelector("#message");

const publicKey = "YTKVoLI7593DmZmDG";
const serviceID = "service_zjs1s7x";
const templateID = "template_frkz7tk";

emailjs.init(publicKey);

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  submitBtn.innerText = "Sending..";
  const inputField = {
    name: name.value,
    email: email.value,
    message: message.value,
  };
  emailjs.send(serviceID, templateID, inputField).then(
    () => {
      submitBtn.innerText = "Message Sent Successfully";
      name.value = "";
      email.value = "";
      message.value = "";
    },
    (error) => {
      console.log(error);
      submitBtn.innerText = "Something went wrong";
    }
  );
});
