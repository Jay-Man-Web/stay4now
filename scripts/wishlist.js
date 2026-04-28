// Manages the wishlist state via LocalStorage
const WISHLIST_KEY = 'stay4now_wishlist';

export function getWishlist() {
  return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
}

export function toggleWishlist(id) {
  let list = getWishlist();
  const strId = String(id);
  
  if (list.includes(strId)) {
    list = list.filter(itemId => itemId !== strId);
  } else {
    list.push(strId);
  }
  
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
  return list;
}

export function isWishlisted(id) {
  return getWishlist().includes(String(id));
}