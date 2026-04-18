const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");
const searchBar = document.querySelector(".search-bar-container")

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    tabButtons.forEach(btn => btn.classList.remove("active"));
    const tab = button.dataset.tab;
    tabContents.forEach(content => content.classList.remove("active"));

    button.classList.add("active");

    if (tab === "houses") {
      searchBar.classList.remove("hidden");
    } else {
      searchBar.classList.add("hidden");
    }

    const tabId = button.getAttribute("data-tab");
    document.getElementById(tabId + "-section").classList.add("active");
  });
});