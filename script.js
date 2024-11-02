const ticker = document.querySelector('.ticker');
const cryptos = Array.from(document.querySelectorAll('.crypto'));

let currentIndex = 0;

// Function to update ticker position
function updateTicker() {
  ticker.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Event listener for scrolling
ticker.addEventListener('wheel', (event) => {
  if (event.deltaY > 0) {
    // Scroll down: Next item
    currentIndex = (currentIndex + 1) % cryptos.length;
  } else {
    // Scroll up: Previous item
    currentIndex = (currentIndex - 1 + cryptos.length) % cryptos.length;
  }
  updateTicker();
  event.preventDefault();
});

// Initial setup
updateTicker();
