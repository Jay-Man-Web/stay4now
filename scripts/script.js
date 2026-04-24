const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");
const searchBar = document.querySelector(".search-bar-container");

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    tabButtons.forEach(btn => btn.classList.remove("active"));
    tabContents.forEach(content => content.classList.remove("active"));

    button.classList.add("active");

    const tabId = button.dataset.tab;

    if (tabId === "houses") {
      searchBar.classList.remove("hidden");
    } else {
      searchBar.classList.add("hidden");
    }

    document.getElementById(tabId + "-section").classList.add("active");
  });
});


const bottomTabs = document.querySelectorAll(".bottom-tab");
const bottomTabContents = document.querySelectorAll(".tab-page-content");

bottomTabs.forEach(button => {
  button.addEventListener("click", ()=> {
    const tabNumber = button.getAttribute("data-page-content-tab");

    bottomTabs.forEach(t => t.classList.remove("active"));
    bottomTabContents.forEach(c => c.classList.remove("active"));

    button.classList.add("active");

    if (tabNumber != 1) {
      document.querySelector(".header").classList.add("hidden");
    } else {
      document.querySelector(".header").classList.remove("hidden");
    }

    document.querySelector(`.tab-page-content[data-page-content="${tabNumber}"]`).classList.add("active");

  });
});