import {houses} from "./houses.js";

function generateCard(house) {
  return `
    <div class="property-container">
      <div class="property-thumbnail-container">
        <img class="property-thumbnail" src="images/home-thumbnails/${house.thumbnailID}.png" alt="no image">
      </div>
      <div class="property-details-container">
        <p class="property-label">${house.label}</p>
        <p class="property-price-rating">
          R${(house.priceCents / 100).toFixed(2)} for 2 nights <br/> ★ ${house.rating}
        </p>
      </div>
    </div>
  `;
};

let popularHTML = '';
let newHTML = '';
let budgetFriendlyHTML = '';

houses.forEach(house => {
  if (house.rating >= 4) {
    popularHTML += generateCard(house);
  }

  newHTML += generateCard(house);

  if (house.priceCents <= 150000) {
    budgetFriendlyHTML += generateCard(house);
  }
  
});

document.getElementById('popular').innerHTML = popularHTML;
document.getElementById('new').innerHTML = newHTML;
document.getElementById('budget-friendly').innerHTML = budgetFriendlyHTML;
