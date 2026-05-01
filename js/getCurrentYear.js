const currentYear = new Date().getFullYear();
const container = document.querySelector('[data-current-year-key]');

currentYear > 2025 ? container.innerHTML = `2025 - ${currentYear}` : container.innerHTML = currentYear;