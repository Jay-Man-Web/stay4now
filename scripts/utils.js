export function formatPrice(cents) {
  // Adds commas for readability (e.g., R1,850.00)
  return `R${(cents / 100).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;
}

export function encodeLocation(location) {
  return encodeURIComponent(location);
}