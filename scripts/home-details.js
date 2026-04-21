/*
import {houses} from '../scripts/houses.js';

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const house = houses.find(h => h.id == id);

const container = document.getElementById("main-content");

if (house) {
  container.innerHTML = `
    <div class="back-btn" role="button"><a href="../index.html">← Back</a></div>
    <div class="favourite-btn" role="button">❤️<img src="" alt=""></div>

    <div class="content">
      <div class="home-images">
        <img src="../images/home-thumbnails/${house.thumbnailID}.png" alt="image">
      </div>
      <div>
        <div class="details">
          <h1>${house.label}</h1>
          <p>${house.location}</p>
          <p>${house.guests} guests &middot; ${house.bedrooms} bedrooms &middot; ${house.bathrooms} &middot; baths</p>
          <p class="rating">${house.rating}<br>★★★★★</p>
        </div>
        <div class="host">
          <div class="host-img-container">
            <img src="../images/home-thumbnails/${house.thumbnailID}.png" alt="icon">
          </div>
          <div class="host-name-period"><p class="host-name">Hosted by ${house.hostDetails.hostName}</p><p class="hosting-period">Hosting for ${house.hostDetails.hostingPeriod}</p></div>
        </div>
        <div>
          <h2>What this place offers</h2>
          <div>
            <ul class="amenities-list">
              ${house.offers.map(offer => `<li>${offer}</li>`).join("")}
            </ul>
          </div>
        </div>
        <div class="gps-location-container">
          <h2>Where you'll be</h2>
          <p><p>${house.location}</p></p>
          <div>
            <iframe
              width="100%"
              height="300"
              style="border:0;"
              loading="lazy"
              src="https://maps.google.com/maps?q=${house.location}&z=12&output=embed">
            </iframe>
          </div>
        </div>
        <div>
          <h2>More stays nearby</h2>
          <div class="section-content" id="places-nearby">
            <div class="property-container">
              <div class="property-thumbnail-container">
                <img class="property-thumbnail" src="images/home-thumbnails/${house.thumbnailID}.png" alt="no image">
              </div>
              <div class="property-details-container">
                <p class="property-label">
                  ${house.label}
                </p>
                <p class="property-price-rating">
                  R<span class="property-price">${house.priceCents}</span> for 2 nights &middot;&starf; <span class="property-rating">${house.rating}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    
    <div class="booking-section">
      <div>
        <p class="price">R${(house.priceCents / 100).toFixed(2)} for 2 nights</p>
        <p>Free cancellation</p>
      </div>
      <div>
        <button class="reserve-btn">Reserve</button>
      </div>
    </div>
  `;
} else {
  container.innerHTML = "<p>House not found</p>";
}
*/


console.log("HOUSES IMPORT:", houses);
console.log("TYPE:", typeof houses);

/* =========================
   house-details.js
   ========================= */
import { houses } from "../scripts/houses.js";
import { formatPrice, encodeLocation } from "./utils.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const house = houses.find(h => String(h.id ?? h.ID) === String(id));
const container = document.getElementById("main-content");

function renderHouse(house) {
  return `
    <div class="back-btn">
      <a href="../index.html">← Back</a>
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
