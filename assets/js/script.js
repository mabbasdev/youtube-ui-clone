document.addEventListener("DOMContentLoaded", function () {
  const menuButtons = document.querySelectorAll(".menu-button");
  const screenOverlay = document.querySelector(".main-layout .screen-overlay");
  const themeButton = document.querySelector(".navbar .theme-button i");
  const searchButton = document.querySelector("#search-button");
  const searchBackButton = document.querySelector("#search-back-button");

  // Toggle sidebar visibility when menu buttons are clicked
  menuButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (document.body.classList.contains("sidebar-hidden")) {
        document.body.classList.remove("sidebar-hidden");
      } else {
        document.body.classList.add("sidebar-hidden");
      }
    });
  });

  // Toggle sidebar visibility when screen overlay is clicked
  screenOverlay.addEventListener("click", () => {
    document.body.classList.toggle("sidebar-hidden");
  });

  // Initialize dark mode based on localStorage
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    themeButton.classList.replace("uil-moon", "uil-sun");
  } else {
    themeButton.classList.replace("uil-sun", "uil-moon");
  }

  // Toggle dark mode when theme button is clicked
  themeButton.addEventListener("click", () => {
    const isDarkMode = document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
    themeButton.classList.toggle("uil-sun", isDarkMode);
    themeButton.classList.toggle("uil-moon", !isDarkMode);
  });

  // Toggle search bar on mobile
  const toggleSearchBar = () => {
    document.body.classList.toggle("show-mobile-search");
  };

  searchButton.addEventListener("click", toggleSearchBar);
  searchBackButton.addEventListener("click", () => searchButton.click());

  // Category scrolling functionality
  const tab = document.querySelector(".category-list"),
    badges = tab.querySelectorAll(".category-button"),
    icons = document.querySelectorAll(".icon span"),
    { clientWidth, scrollWidth } = tab;

  badges.forEach((badge) => {
    badge.addEventListener("click", () => {
      tab.querySelector(".active").classList.remove("active");
      badge.classList.add("active");

      badge.scrollIntoView({ inline: "center" });
    });
  });

  icons.forEach((icon) => {
    icon.addEventListener("click", () => {
      tab.style = "";
      tab.scrollLeft += icon.classList.contains("right-arrow") ? 300 : -300;
    });
  });

  tab.addEventListener("scroll", (e) => {
    updateIcons(e.target.scrollLeft);
  });

  tab.addEventListener("wheel", (e) => {
    tab.style.scrollBehavior = "auto";
    tab.scrollLeft += e.deltaY;
  });

  function updateIcons(scrolled_width) {
    icons[0].parentElement.classList.toggle("hide", scrolled_width <= 1);
    icons[1].parentElement.classList.toggle(
      "hide",
      scrollWidth - (clientWidth + scrolled_width) <= 0
    );
  }

  // Watch page functionality
  // Share
  const shareButton = document.querySelector(".share-button");
  if (shareButton) {
    shareButton.addEventListener("click", function () {
      alert("Share functionality would be implemented here!");
    });
  }

  function updateIconVisibility(button) {
    const uilIcon = button.querySelector(".uil");
    const uisIcon = button.querySelector(".uis");

    if (button.classList.contains("active")) {
      uilIcon.style.display = "none";
      uisIcon.style.display = "inline-block";
    } else {
      uilIcon.style.display = "inline-block";
      uisIcon.style.display = "none";
    }
  }

  const likeButton = document.querySelector(".like-button");
  const dislikeButton = document.querySelector(".dislike-button");

  if (likeButton && dislikeButton) {
    // Initial icon setup
    updateIconVisibility(likeButton);
    updateIconVisibility(dislikeButton);

    likeButton.addEventListener("click", function () {
      const countSpan = this.querySelector("span");
      let count = parseInt(countSpan.textContent);

      if (this.classList.contains("active")) {
        this.classList.remove("active");
        if (count > 0) countSpan.textContent = count - 1;
      } else {
        this.classList.add("active");
        countSpan.textContent = count + 1;
        dislikeButton.classList.remove("active");
      }

      updateIconVisibility(likeButton);
      updateIconVisibility(dislikeButton);
    });

    dislikeButton.addEventListener("click", function () {
      const likeCountSpan = likeButton.querySelector("span");
      let likeCount = parseInt(likeCountSpan.textContent);

      if (!this.classList.contains("active")) {
        this.classList.add("active");

        if (likeButton.classList.contains("active")) {
          likeButton.classList.remove("active");
          if (likeCount > 0) likeCountSpan.textContent = likeCount - 1;
        }
      } else {
        this.classList.remove("active");
      }

      updateIconVisibility(likeButton);
      updateIconVisibility(dislikeButton);
    });
  }

  function updateCommentIcon(button) {
    const uilIcon = button.querySelector(".uil");
    const uisIcon = button.querySelector(".uis");

    if (button.classList.contains("active")) {
      uilIcon.style.display = "none";
      uisIcon.style.display = "inline-block";
    } else {
      uilIcon.style.display = "inline-block";
      uisIcon.style.display = "none";
    }
  }

  // Initial setup for all comment buttons
  document
    .querySelectorAll(".like-comment, .dislike-comment")
    .forEach((btn) => {
      updateCommentIcon(btn);
    });

  // Like Comment
  document.querySelectorAll(".like-comment").forEach((button) => {
    button.addEventListener("click", function () {
      const countSpan = this.querySelector("span");
      const dislikeButton =
        this.parentElement.querySelector(".dislike-comment");
      let count = parseInt(countSpan.textContent);

      if (this.classList.contains("active")) {
        this.classList.remove("active");
        if (count > 0) countSpan.textContent = count - 1;
      } else {
        this.classList.add("active");
        countSpan.textContent = count + 1;

        if (dislikeButton && dislikeButton.classList.contains("active")) {
          dislikeButton.classList.remove("active");
          updateCommentIcon(dislikeButton);
        }
      }

      updateCommentIcon(this);
    });
  });

  // Dislike Comment
  document.querySelectorAll(".dislike-comment").forEach((button) => {
    button.addEventListener("click", function () {
      const likeButton = this.parentElement.querySelector(".like-comment");
      const likeCountSpan = likeButton.querySelector("span");
      let likeCount = parseInt(likeCountSpan.textContent);

      if (!this.classList.contains("active")) {
        this.classList.add("active");

        if (likeButton.classList.contains("active")) {
          likeButton.classList.remove("active");
          if (likeCount > 0) likeCountSpan.textContent = likeCount - 1;
          updateCommentIcon(likeButton);
        }
      } else {
        this.classList.remove("active");
      }

      updateCommentIcon(this);
    });
  });

  // View replies
  document.querySelectorAll(".view-replies").forEach((button) => {
    button.addEventListener("click", function () {
      alert("This would show/hide replies in a full implementation");
    });
  });

  // Sort comments
  const sortComments = document.querySelector(".sort-comments");
  if (sortComments) {
    sortComments.addEventListener("click", function () {
      alert("Sort comments functionality would be implemented here!");
    });
  }

  // Add comment
  const commentInput = document.querySelector(".comment-input");
  if (commentInput) {
    commentInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter" && this.value.trim() !== "") {
        alert(
          "Comment would be posted in a full implementation: " + this.value
        );
        this.value = "";
      }
    });
  }
});
