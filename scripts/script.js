const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    tabButtons.forEach(btn => btn.classList.remove("active"));

    tabContents.forEach(content => content.classList.remove("active"));

    button.classList.add("active");

    const tabId = button.getAttribute("data-tab");
    document.getElementById(tabId + "-section").classList.add("active");
  });
});