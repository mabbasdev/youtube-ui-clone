document.addEventListener("DOMContentLoaded", function () {
  // Show loading skeleton
  const skeletonLoader = document.querySelector(".skeleton-loader");
  const channelTabs = document.querySelector(".channel-tabs");
  const tabs = document.querySelectorAll(".channel-tab");
  const sortButton = document.querySelector(".sort-button");
  const showMoreBtn = document.querySelector(".show-more");
  const descriptionText = document.querySelector(".description-text");

  // Show skeleton while loading
  skeletonLoader.style.display = "block";

  // Simulate loading with timeout
  setTimeout(() => {
    skeletonLoader.style.display = "none";
    loadVideos();
    loadShorts();
  }, 1500);

  // Channel tabs scrolling
  if (channelTabs) {
    channelTabs.addEventListener("wheel", function (e) {
      this.scrollLeft += e.deltaY;
      e.preventDefault();
    });
  }

  // Tab switching
  tabs.forEach((tab) => {
    tab.addEventListener("click", function (e) {
      e.preventDefault();
      tabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      // Add animation
      this.classList.add("animate__animated", "animate__fadeIn");
      setTimeout(() => {
        this.classList.remove("animate__animated", "animate__fadeIn");
      }, 300);
    });
  });

  // Sort button functionality
  if (sortButton) {
    sortButton.addEventListener("click", function () {
      // This would show a dropdown in a real implementation
      alert("Sort options would appear here");
    });
  }

  // Show more description
  if (showMoreBtn && descriptionText) {
    showMoreBtn.addEventListener("click", function (e) {
      e.preventDefault();
      descriptionText.style.webkitLineClamp = "unset";
      this.style.display = "none";
    });
  }
});

// objects init
const modal = document.getElementById("modal");
const backdrop = document.getElementById("backdrop");
const closeBtn = document.getElementById("closeBtn");
const subscribeButton = document.querySelector(".subscribe-button");

// Confetti function
function showConfetti() {
  confetti({
    particleCount: 700,
    spread: 100,
    origin: { y: 0.6 },
  });
}

// Open Modal
function openModal() {
  modal.style.display = "block";
  backdrop.style.display = "block";
  setTimeout(() => {
    modal.classList.add("open");
  }, 10);
}

// Close Modal
function closeModal() {
  modal.classList.remove("open");
  backdrop.style.display = "none";
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
}

if (subscribeButton) {
  subscribeButton.addEventListener("click", function () {
    const isSubscribed = this.classList.toggle("subscribed");
    const text = this.querySelector("span");

    if (isSubscribed) {
      text.textContent = "Subscribed";
      // Show confetti animation
      showConfetti();
    } else {
      text.textContent = "Subscribe";
    }

    // Add button press effect
    this.classList.add("animate__animated", "animate__pulse");
    setTimeout(() => {
      this.classList.remove("animate__animated", "animate__pulse");
    }, 300);
  });
}

closeBtn.addEventListener("click", closeModal);
backdrop.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});

const truncateElements = document.querySelectorAll(".truncate");
const elements = document.querySelectorAll(".truncate-2");

// Truncate Text
truncateElements.forEach((el) => {
  const originalText = el.textContent.trim();
  const words = originalText.split(/\s+/);

  if (words.length > 14) {
    const shortText = words.slice(0, 14).join(" ");

    el.innerHTML = `
        ${shortText}
        <span class="more-link" style="color: var(--black-color); font-weight: bold; cursor: pointer;" >...more</span>
      `;

    const moreLink = el.querySelector(".more-link");
    moreLink.addEventListener("click", () => {
      openModal();
    });
  }
});

// Truncate-2
elements.forEach((el) => {
  const text = el.textContent.trim();
  const words = text.split(/\s+/);

  if (words.length > 30) {
    const truncated = words.slice(0, 30).join(" ") + " ";
    el.innerHTML = `
        ${truncated}
        <a href="" class="more-link" style="color: var(--black-color); text-decoration: none !important; font-weight: bold; cursor: pointer;" >...more</a>
      `;
  }
});

// More options drop down
document.querySelectorAll(".video-options").forEach((options) => {
  const toggle = options.querySelector(".options-toggle");
  const menu = options.querySelector(".options-menu");

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    document.querySelectorAll(".options-menu").forEach((m) => {
      if (m !== menu) m.classList.remove("show");
    });
    menu.classList.toggle("show");
  });
});

// Document Click Handler (Global)
document.addEventListener("click", () => {
  document.querySelectorAll(".options-menu").forEach((menu) => {
    menu.classList.remove("show");
  });
});
