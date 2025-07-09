const body = document.body;
const toggleBtn = document.getElementById("toggleThemeBtn");
const storedTheme = localStorage.getItem("theme");

if (storedTheme === "light") {
  body.classList.add("light-mode");
  toggleBtn.textContent = "Toggle Dark Mode";
}

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  const isLight = body.classList.contains("light-mode");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  toggleBtn.textContent = isLight ? "Toggle Dark Mode" : "Toggle Light Mode";
});
