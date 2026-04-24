import { houses } from "../scripts/houses.js";
import { formatPrice } from "./utils.js";

const luxuryContainer = document.getElementById("luxury");
const popularContainer = document.getElementById("popular");
const budgetContainer = document.getElementById("budget-friendly");

function generateCard(house) {
  return `
    <div class="property-container" data-id="${house.id}">
      <div class="property-thumbnail-container">
        <img class="property-thumbnail" 
             src="images/home-thumbnails/${house.thumbnailID}.png" 
             alt="${house.label}">
      </div>
      <div class="property-details-container">
        <p class="property-label">${house.label}</p>
        <p class="property-price-rating">
          ${formatPrice(house.priceCents)} for 2 nights <br/>
          ★ ${house.rating}
        </p>
      </div>
    </div>
  `;
}

function render() {
  let luxuryHTML = "";
  let budgetHTML = "";
  let popularHTML = "";

  houses.forEach(house => {
    const isLuxury =
      house.rating >= 4 ||
      house.label.toLowerCase().includes("luxury") ||
      house.description.toLowerCase().includes("luxury");

    const isPopular = house.rating >= 4.5;
    const isBudget = house.priceCents <= 150000;

    if (isLuxury) luxuryHTML += generateCard(house);
    if (isPopular) popularHTML += generateCard(house);
    if (isBudget) budgetHTML += generateCard(house);
  });

  popularContainer.innerHTML = popularHTML;
  luxuryContainer.innerHTML = luxuryHTML;
  budgetContainer.innerHTML = budgetHTML;
}

// navigation
document.addEventListener("click", (e) => {
  const card = e.target.closest(".property-container");
  if (!card) return;

  const id = card.dataset.id;
  window.location.href = `pages/home-details.html?id=${id}`; // adjust if needed
});

render();