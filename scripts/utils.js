export function formatPrice(cents) {
  return `R${(cents / 100).toFixed(2)}`;
}

export function encodeLocation(location) {
  return encodeURIComponent(location);
}