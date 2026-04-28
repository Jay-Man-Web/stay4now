import { houses } from './data.js';
import { formatPrice } from './utils.js';
import { getWishlist, toggleWishlist } from './wishlist.js';

// --- DOM Elements ---
const bottomTabs = document.querySelectorAll('.bottom-tab');
const pageViews = document.querySelectorAll('.page-view');
const header = document.getElementById('main-header');
const searchInput = document.getElementById('search-input');
const housesLayout = document.getElementById('houses-layout');
const searchLayout = document.getElementById('search-layout');
const searchResultsContainer = document.getElementById('search-results-container');
const wishlistContainer = document.getElementById('wishlist-container');

// --- Render Helpers ---
function createStandardCard(house) {
  return `
    <div class="property-card" data-id="${house.id}">
      <div class="property-thumbnail-container">
        <img class="property-thumbnail" src="images/home-thumbnails/${house.thumbnailID}.png" alt="${house.label}">
      </div>
      <div class="property-info">
        <h3 class="property-label">${house.label}</h3>
        <p class="property-price-rating">
          <span class="price-bold">${formatPrice(house.priceCents)}</span> night <br/>
          ★ ${house.rating} · ${house.location}
        </p>
      </div>
    </div>
  `;
}

// --- Render Explore Tab ---
function renderHomeLayout() {
  const popularContainer = document.getElementById('popular-container');
  const luxuryContainer = document.getElementById('luxury-container');
  const budgetContainer = document.getElementById('budget-container');

  let popularHTML = '', luxuryHTML = '', budgetHTML = '';

  houses.forEach(house => {
    if (house.rating >= 4 || house.label.toLowerCase().includes("luxury")) luxuryHTML += createStandardCard(house);
    if (house.rating >= 4.5) popularHTML += createStandardCard(house);
    if (house.priceCents <= 150000) budgetHTML += createStandardCard(house);
  });

  popularContainer.innerHTML = popularHTML;
  luxuryContainer.innerHTML = luxuryHTML;
  budgetContainer.innerHTML = budgetHTML;
}

// --- Render Wishlist Tab ---
function renderWishlist() {
  const savedIds = getWishlist();
  
  if (savedIds.length === 0) {
    wishlistContainer.innerHTML = `<p>Your wishlist is currently empty. Start exploring!</p>`;
    return;
  }

  const savedHouses = houses.filter(h => savedIds.includes(String(h.id)));
  
  wishlistContainer.innerHTML = savedHouses.map(house => `
    <div class="wishlist-card">
      <div class="property-thumbnail-container">
        <img class="property-thumbnail" src="images/home-thumbnails/${house.thumbnailID}.png" alt="${house.label}">
      </div>
      <div class="property-info">
        <h3 class="property-label">${house.label}</h3>
        <p class="property-price-rating">★ ${house.rating} · ${house.location}</p>
        <p class="price-bold">${formatPrice(house.priceCents)}</p>
        <div class="wishlist-actions">
          <button class="btn-small btn-view" data-action="view" data-id="${house.id}">View</button>
          <button class="btn-small btn-remove" data-action="remove" data-id="${house.id}">Remove</button>
        </div>
      </div>
    </div>
  `).join('');
}

// --- Event Listeners ---

// Navigation
bottomTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    bottomTabs.forEach(t => t.classList.remove('active'));
    pageViews.forEach(v => v.classList.remove('active'));

    tab.classList.add('active');
    const targetView = tab.getAttribute('data-target');
    document.getElementById(targetView).classList.add('active');

    header.classList.toggle('hidden', targetView !== 'view-explore');
    
    // Refresh wishlist data when navigating to it
    if (targetView === 'view-wishlist') renderWishlist();
  });
});

// Card Clicks (Explore & Search)
document.addEventListener('click', (e) => {
  const card = e.target.closest('.property-card');
  if (card && !e.target.closest('.wishlist-actions')) {
    window.location.href = `pages/home-details.html?id=${card.dataset.id}`;
  }

  // Wishlist Tab Buttons
  if (e.target.classList.contains('btn-view')) {
    window.location.href = `pages/home-details.html?id=${e.target.dataset.id}`;
  }
  
  if (e.target.classList.contains('btn-remove')) {
    toggleWishlist(e.target.dataset.id);
    renderWishlist(); // Re-render immediately
  }
});

// Init
renderHomeLayout();

// --- Search Functionality ---

const btnExitSearch = document.getElementById('btn-exit-search');
const searchResultLabel = document.getElementById('search-result-label');

// Listen for typing in the search bar
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim();
  
  if (query.length > 0) {
    // Hide standard layout, show search layout
    housesLayout.classList.add('hidden');
    searchLayout.classList.remove('hidden');
    
    // Filter houses based on title or location
    const results = houses.filter(house => 
      house.label.toLowerCase().includes(query) || 
      house.location.toLowerCase().includes(query)
    );
    
    searchResultLabel.innerText = `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`;
    
    // Render the results
    if (results.length > 0) {
      searchResultsContainer.innerHTML = results.map(house => createStandardCard(house)).join('');
    } else {
      searchResultsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px 0;">
          <h3 class="text-muted">No properties found.</h3>
          <p class="text-muted">Try searching for a different location or keyword.</p>
        </div>
      `;
    }
  } else {
    // If search is empty, revert to the normal home layout
    exitSearch();
  }
});

// Exit search when clicking the back button
if (btnExitSearch) {
  btnExitSearch.addEventListener('click', exitSearch);
}

// Helper function to reset the view
function exitSearch() {
  searchInput.value = '';
  searchLayout.classList.add('hidden');
  housesLayout.classList.remove('hidden');
}

// --- Filter Functionality ---
const tabBtns = document.querySelectorAll('.tab-btn');
const filterPanel = document.getElementById('filter-panel');
const btnApplyFilters = document.getElementById('btn-apply-filters');

// Tab Switching Logic
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Reset active states
    tabBtns.forEach(t => t.classList.remove('active'));
    btn.classList.add('active');

    if (btn.dataset.category === 'filtered') {
      filterPanel.classList.remove('hidden');
    } else {
      filterPanel.classList.add('hidden');
      exitSearch(); // Reset back to All Stays view
    }
  });
});

// Apply Filters Logic
btnApplyFilters.addEventListener('click', () => {
  const minPrice = parseInt(document.getElementById('filter-min-price').value) || 0;
  const maxPrice = parseInt(document.getElementById('filter-max-price').value) || Infinity;
  const locQuery = document.getElementById('filter-loc').value.toLowerCase().trim();

  // Hide standard layout, show search layout
  housesLayout.classList.add('hidden');
  searchLayout.classList.remove('hidden');

  const results = houses.filter(house => {
    const price = house.priceCents / 100; // Convert cents to Rands for easy filtering
    const matchesPrice = price >= minPrice && price <= maxPrice;
    const matchesLoc = house.location.toLowerCase().includes(locQuery);
    return matchesPrice && matchesLoc;
  });

  searchResultLabel.innerText = `${results.length} Filtered Result${results.length !== 1 ? 's' : ''}`;

  if (results.length > 0) {
    searchResultsContainer.innerHTML = results.map(house => createStandardCard(house)).join('');
  } else {
    searchResultsContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px 0;">
        <h3 class="text-muted">No exact matches.</h3>
        <p class="text-muted">Try adjusting your price range or location.</p>
      </div>
    `;
  }
});