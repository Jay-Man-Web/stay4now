import { houses } from "./houses.js";
import { formatPrice } from "./utils.js";

const searchInput = document.getElementById("searchInput");

function displayResults(results, value) {
  const container = document.getElementById("search-results-container");
  const label = document.getElementById("search-result-label");
  const housesSection = document.getElementById("houses-section");
  const searchSection = document.getElementById("search-results-label-container");

  // Switch view ONCE (not inside loop)
  housesSection.classList.remove("active");
  searchSection.classList.add("active");

  // No results
  if (results.length === 0) {
    label.innerHTML = `
      <button id="search-exit"><</button>
      <p>No results found for "${value}"</p>
    `;
    container.innerHTML = "";
    return;
  }

  // Label
  label.innerHTML = `
    <button id="search-exit"><</button>
    <p>Results for "${value}"</p>
  `;

  let HTML = "";

  results.forEach(house => {
    const price = (house.priceCents / 100).toFixed(0);

    HTML += `
      <div class="search-card">
        <a href="pages/home-details.html?id=${house.id}" class="search-result">
          
          <div class="result-thumbnail-container">
            <img 
              src="images/home-thumbnails/${house.thumbnailID}.png" 
              alt="House image" 
              class="result-thumbnail"
            >
          </div>

          <div class="result-details">
            <p class="result-label">${house.label}</p>
            <p class="result-description">${house.description}</p>
            <p class="result-price-rating">
              R${price} for 2 nights · ★ ${house.rating}
            </p>
          </div>

        </a>
      </div>
    `;
  });

  container.innerHTML = HTML;
  searchInput.value = "";
}

function handleSearch() {
  const value = searchInput.value.toLowerCase().trim();
  if (!value) return;

  const results = houses.filter(house =>
    house.location.toLowerCase().includes(value) ||
    house.label.toLowerCase().includes(value) ||
    house.description.toLowerCase().includes(value)
  );

  displayResults(results, value);
}

// Enter key
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});

// Exit search (delegation)
document.addEventListener("click", (e) => {
  if (e.target.id === "search-exit") {
    document.getElementById("search-results-container").innerHTML = "";
    document.getElementById("search-result-label").innerHTML = "";

    document.getElementById("search-results-label-container").classList.remove("active");
    document.getElementById("houses-section").classList.add("active");
  }
});