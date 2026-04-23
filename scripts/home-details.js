import { houses } from "../scripts/houses.js";
import { formatPrice, encodeLocation } from "./utils.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const house = houses.find(h => String(h.id ?? h.ID) === String(id));
const container = document.getElementById("main-content");

export function renderHouse(house) {
  return `
    <div class="back-btn">
      <a href="../index.html"><img src="../images/icons/left-arrow.svg"></a>
    </div>

    <div class="content">

      <div class="home-images">
        <img src="../images/home-thumbnails/${house.thumbnailID}.png" alt="${house.label}">
      </div>

      <div class="details">
        <h1>${house.label}</h1>
        <p>${house.location}</p>
        <p>${house.guests} guests · ${house.bedrooms} bedrooms · ${house.bathrooms} baths</p>
        <p class="rating">★ ${house.rating}</p>
      </div>

      <div class="host">
        <div class="host-img-container">
          <img src="../images/home-thumbnails/${house.thumbnailID}.png" alt="icon">
        </div>
        <div>
          <p class="host-name">Hosted by ${house.hostDetails.hostName}</p>
          <p class="hosting-period">Hosting for ${house.hostDetails.hostingPeriod}</p>
        </div>
      </div>

      <div class="amenities">
        <h2>What this place offers</h2>
        <ul>
          ${house.offers.map(o => `<li>${o}</li>`).join("")}
        </ul>
      </div>

      <div class="map">
        <h2>Where you'll be</h2>
        <iframe
          width="100%"
          height="300"
          style="border:0"
          loading="lazy"
          src="https://maps.google.com/maps?q=${encodeLocation(house.location)}&z=12&output=embed">
        </iframe>
      </div>

      <div class="nearby">
        <h2>More stays nearby</h2>
        
      </div>

    </div>

    <div class="booking">
      <p>${formatPrice(house.priceCents)} for 2 nights</p>
      <button class="reserve-btn">Reserve</button>
    </div>
  `;
}

if (house) {
  container.innerHTML = renderHouse(house);
} else {
  container.innerHTML = "<p>House not found</p>";
}
