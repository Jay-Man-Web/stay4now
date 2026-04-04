import {houses} from "./houses.js";

const searchInput = document.getElementById("searchInput");

function displayResults(results, value){
  const container = document.getElementById("search-results-container");

  if (results.length === 0) {
    container.innerHTML = "<p>No results found.</p>";
    return;
  }

  let HTML = `<p>Results for "${value}"</p>`;

  results.forEach(house => {
    const price = (house.priceCents / 100).toFixed(0);

    HTML += `
      <div class="search-result">
        <div class="result-thumbnail-container">
          <img class="result-thumbnail" src="images/home-thumbnails/${house.thumbnailID}.png" alt="no image" class="result-thumbnail">
        </div>
        <div class="result-details">
          <p class="result-label">
            ${house.label}
          </p>
          <p class="result-description">
            ${house.description}
          </p>
          <p class="result-price-rating">
            R${price} for 2 nights · ★ ${house.rating}
          </p>
        </div>
      </div>
    `;
  });

  document.getElementById("houses-section").style.display = "none";
  container.innerHTML = HTML;
  searchInput.value = "";
}

function handleSearch() {
  const value = searchInput.value.toLowerCase().trim();

  const results = houses.filter(house =>
    house.location.toLowerCase().includes(value) || 
    house.label.toLowerCase().includes(value) ||
    house.description.toLowerCase().includes(value)
  );

  displayResults(results, value);
}

searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    handleSearch();
  }
});

