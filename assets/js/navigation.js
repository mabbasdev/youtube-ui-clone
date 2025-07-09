document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".channel-tab");
  const panels = document.querySelectorAll(".tab-panel");
  const indicator = document.getElementById("tabIndicator");

  function getTabName(tab) {
    return tab.textContent.trim().toLowerCase();
  }

  function moveIndicator(tab) {
    if (!indicator) return;
    indicator.style.width = `${tab.offsetWidth}px`;
    indicator.style.left = `${tab.offsetLeft}px`;
  }

  function showTab(tabName) {
    panels.forEach((panel) => {
      panel.classList.remove("active", "show");
      panel.style.display = "none";

      if (panel.id === `${tabName}-tab`) {
        panel.classList.add("active");
        panel.style.display = "block";

        setTimeout(() => {
          panel.classList.add("show");
        }, 20);
      }
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", function (e) {
      e.preventDefault();

      tabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      const tabName = getTabName(this);
      showTab(tabName);
      moveIndicator(this);
      history.pushState(null, null, `#${tabName}`);
    });
  });

  const initialTab = window.location.hash.replace("#", "") || "home";
  const initialTabElement =
    Array.from(tabs).find((tab) => getTabName(tab) === initialTab) || tabs[0];
  initialTabElement.classList.add("active");
  moveIndicator(initialTabElement);
  showTab(getTabName(initialTabElement));

  // Dropdown toggle
  const toggle = document.getElementById("dropdownToggle");
  const menu = document.getElementById("dropdownMenu");

  if (toggle && menu) {
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      menu.classList.toggle("show");
    });

    document.addEventListener("click", function (e) {
      if (!menu.contains(e.target) && e.target !== toggle) {
        menu.classList.remove("show");
      }
    });
  }
});
