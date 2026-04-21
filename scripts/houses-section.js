import { houses } from "../scripts/houses.js";
import { formatPrice } from "./utils.js";

const popularContainer = document.getElementById("popular");
const newContainer = document.getElementById("new");
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
  let popularHTML = "";
  let newHTML = "";
  let budgetHTML = "";

  houses.forEach(house => {
    if (house.rating >= 4) popularHTML += generateCard(house);
    newHTML += generateCard(house);
    if (house.priceCents <= 150000) budgetHTML += generateCard(house);
  });

  popularContainer.innerHTML = popularHTML;
  newContainer.innerHTML = newHTML;
  budgetContainer.innerHTML = budgetHTML;
}

// event delegation (clean navigation)
document.addEventListener("click", (e) => {
  const card = e.target.closest(".property-container");
  if (!card) return;

  const id = card.dataset.id;
  window.location.href = `pages/home-details.html?id=${id}`;
});

render();
