import { houses } from "./data.js";
import { formatPrice, encodeLocation } from "./utils.js";
import { toggleWishlist, isWishlisted } from "./wishlist.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const container = document.getElementById("details-content");

const house = houses.find(h => String(h.id) === String(id));

function renderHouse(house) {
  const mapUrl = `https://maps.google.com/maps?q=$${encodeLocation(house.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  const liked = isWishlisted(house.id);
  // Dummy WhatsApp number
  const waNumber = "27820000000"; 
  const waMessage = encodeURIComponent(`Hi ${house.hostDetails.hostName}, I am interested in booking ${house.label} on stay4now.`);

  return `
    <header class="details-header">
      <button class="action-btn" onclick="window.history.back()">←</button>
      <button id="btn-favorite" class="action-btn ${liked ? 'active' : ''}">
        ${liked ? '♥' : '♡'}
      </button>
    </header>

    <div class="home-hero">
      <img src="../images/home-thumbnails/${house.thumbnailID}.png" alt="${house.label}">
    </div>

    <div class="content-body">
      <div class="title-section">
        <h1>${house.label}</h1>
        <p class="meta-info">★ ${house.rating} · ${house.location}</p>
        <p>${house.guests} guests · ${house.bedrooms} bedrooms · ${house.bathrooms} baths</p>
      </div>

      <div class="divider"></div>

      <div class="host-section" id="host-trigger">
        <div class="host-avatar">
          <img src="../images/home-thumbnails/${house.thumbnailID}.png" alt="Host">
        </div>
        <div class="host-info">
          <h3>Hosted by ${house.hostDetails.hostName}</h3>
          <p>Hosting for ${house.hostDetails.hostingPeriod}</p>
        </div>
      </div>

      <div class="divider"></div>

      <div class="amenities-section">
        <h3>What this place offers</h3>
        <ul class="amenities-list">
          ${house.offers.map(o => `<li>✓ ${o}</li>`).join("")}
        </ul>
      </div>

      <div class="divider"></div>

      <div class="map-section">
        <h3>Where you'll be</h3>
        <div class="map-container">
          <iframe width="100%" height="250" style="border:0" loading="lazy" src="${mapUrl}"></iframe>
        </div>
      </div>
    </div>

    <div id="host-modal" class="modal-overlay hidden">
      <div class="modal-content">
        <button class="close-modal-btn close-host">×</button>
        <div class="host-avatar large">
          <img src="../images/home-thumbnails/${house.thumbnailID}.png" alt="Host">
        </div>
        <h2>${house.hostDetails.hostName}</h2>
        <p class="text-muted">Hosting for ${house.hostDetails.hostingPeriod}</p>
        <p class="host-bio">${house.hostDetails.hostName} is a verified host dedicated to providing great stays for guests.</p>
        <a href="https://wa.me/${waNumber}?text=${waMessage}" target="_blank" class="contact-host-btn" style="display: block; text-decoration: none;">Message Host</a>
      </div>
    </div>

    <div id="reserve-modal" class="modal-overlay hidden">
      <div class="modal-content">
        <button class="close-modal-btn close-reserve">×</button>
        <h2 style="margin-bottom: 20px;">Complete Your Booking</h2>
        <p class="text-muted" style="margin-bottom: 25px;">How would you like to proceed with your reservation for <strong>${house.label}</strong>?</p>
        
        <div style="display: flex; flex-direction: column; gap: 15px;">
          <a href="https://wa.me/${waNumber}?text=${waMessage}" target="_blank" class="contact-host-btn" style="background: var(--clr-emerald); display: block; text-decoration: none;">Contact Host (WhatsApp)</a>
          <button id="btn-in-app-reserve" class="contact-host-btn" style="background: var(--clr-midnight);">Reserve on App</button>
        </div>
      </div>
    </div>

    <div class="booking-bar">
      <div class="price-block">
        <p><span class="amount">${formatPrice(house.priceCents)}</span></p>
        <p>Total for 2 nights</p>
      </div>
      <button id="btn-initiate-reserve" class="reserve-btn">Reserve</button>
    </div>
  `;
}

if (house) {
  container.innerHTML = renderHouse(house);

  // 1. Favorite Toggle
  const btnFavorite = document.getElementById('btn-favorite');
  btnFavorite.addEventListener('click', () => {
    toggleWishlist(house.id);
    const isNowLiked = isWishlisted(house.id);
    btnFavorite.classList.toggle('active', isNowLiked);
    btnFavorite.innerText = isNowLiked ? '♥' : '♡';
  });

  // 2. Modals Logic
  const hostTrigger = document.getElementById('host-trigger');
  const btnInitiateReserve = document.getElementById('btn-initiate-reserve');
  
  const hostModal = document.getElementById('host-modal');
  const reserveModal = document.getElementById('reserve-modal');

  // Open Modals
  hostTrigger.addEventListener('click', () => hostModal.classList.remove('hidden'));
  btnInitiateReserve.addEventListener('click', () => reserveModal.classList.remove('hidden'));

  // Close Modals via buttons
  document.querySelector('.close-host').addEventListener('click', () => hostModal.classList.add('hidden'));
  document.querySelector('.close-reserve').addEventListener('click', () => reserveModal.classList.add('hidden'));

  // Close modals when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === hostModal) hostModal.classList.add('hidden');
    if (e.target === reserveModal) reserveModal.classList.add('hidden');
  });

  // App Reservation Button
  document.getElementById('btn-in-app-reserve').addEventListener('click', () => {
    alert("In-app reservations are coming soon! Please contact the host via WhatsApp for now.");
    reserveModal.classList.add('hidden');
  });

} else {
  container.innerHTML = `<div class="content-padding"><h1>Property not found</h1><a href="../index.html">Go back</a></div>`;
}