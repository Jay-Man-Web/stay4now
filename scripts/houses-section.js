let houses = [
  {
    "label": "Hotel in Cape Town City Centre",
    "type": "house",
    "thumbnalID": "0001",
    "priceCents": 276800,
    "rating": 4.5,
    "location": "johannesburg",
    "description": "",
    "bedrooms": 1,
    "guests": 2,
    "bathrooms": 1,
    "offers": [
      "Wifi",
      "Dedicated workspace",
      "Pool",
      "Air Conditioning",
      "Free parking"
    ],
    "listing-date": "2025/02/20"
  },
  {
    "label": "Apartment in Port Elizabeth",
    "type": "house",
    "thumbnalID": "0002",
    "priceCents": 2768,
    "rating": 3.8,
    "location": "johannesburg",
    "description": "",
    "bedrooms": 1,
    "guests": 2,
    "bathrooms": 1,
    "offers": [
      "Wifi",
      "Dedicated workspace",
      "Pool",
      "Air Conditioning",
      "Free parking"
    ]
  },
  {
    "label": "Guesthouse in Rustenburg",
    "type": "house",
    "thumbnalID": "0003",
    "priceCents": 2768,
    "rating": 4.0,
    "location": "johannesburg",
    "description": "",
    "bedrooms": 1,
    "guests": 2,
    "bathrooms": 1,
    "offers": [
      "Wifi",
      "Dedicated workspace",
      "Pool",
      "Air Conditioning",
      "Free parking"
    ]
  },
  {
    "label": "Hotel in Cape Town City Centre",
    "type": "house",
    "thumbnalID": "0004",
    "priceCents": 2768,
    "rating": 4.5,
    "location": "johannesburg",
    "description": "",
    "bedrooms": 1,
    "guests": 2,
    "bathrooms": 1,
    "offers": [
      "Wifi",
      "Dedicated workspace",
      "Pool",
      "Air Conditioning",
      "Free parking"
    ]
  },
  {
    "label": "Hotel in Cape Town City Centre",
    "type": "house",
    "thumbnalID": "0005",
    "priceCents": 2768,
    "rating": 4.5,
    "location": "johannesburg",
    "description": "",
    "bedrooms": 1,
    "guests": 2,
    "bathrooms": 1,
    "offers": [
      "Wifi",
      "Dedicated workspace",
      "Pool",
      "Air Conditioning",
      "Free parking"
    ]
  },
  {
    "label": "Hotel in Cape Town City Centre",
    "type": "house",
    "thumbnalID": "0006",
    "priceCents": 2768,
    "rating": 4.5,
    "location": "johannesburg",
    "description": "",
    "bedrooms": 1,
    "guests": 2,
    "bathrooms": 1,
    "offers": [
      "Wifi",
      "Dedicated workspace",
      "Pool",
      "Air Conditioning",
      "Free parking"
    ]
  }
];

function generateCard(house) {
  return `
    <div class="property-container">
      <div class="property-thumbnail-container">
        <img class="property-thumbnail" src="images/home-thumbnails/${house.thumbnalID}.png" alt="no image">
      </div>
      <div class="property-details-container">
        <p class="property-label">${house.label}</p>
        <p class="property-price-rating">
          R${(house.priceCents / 100).toFixed(2)} for 2 nights · ★ ${house.rating}
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
