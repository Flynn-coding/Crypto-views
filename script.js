const cryptoTicker = document.getElementById('crypto-ticker');
const cryptos = [
    { name: 'Bitcoin', symbol: 'BTC' },
    { name: 'Ethereum', symbol: 'ETH' },
    { name: 'Ripple', symbol: 'XRP' },
    { name: 'Litecoin', symbol: 'LTC' }
];
let currentIndex = 0;

async function fetchCryptoPrices() {
    const prices = await Promise.all(cryptos.map(async (crypto) => {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto.symbol.toLowerCase()}&vs_currencies=usd`);
        const data = await response.json();
        return { name: crypto.name, price: data[crypto.symbol.toLowerCase()].usd };
    }));

    return prices;
}

async function updateTicker() {
    const prices = await fetchCryptoPrices();
    cryptos.forEach((crypto, index) => {
        const priceElement = cryptoTicker.children[index];
        priceElement.textContent = `${crypto.name}: $${prices[index].price.toFixed(2)}`;
    });

    // Fade out the current crypto
    cryptoTicker.children[currentIndex].style.opacity = 0;
    
    // Update to the next crypto
    currentIndex = (currentIndex + 1) % cryptos.length;

    // Fade in the next crypto
    cryptoTicker.children[currentIndex].style.opacity = 1;
}

// Fetch prices initially
fetchCryptoPrices().then(updateTicker);

// Change the crypto ticker and update prices every 2 seconds
setInterval(() => {
    updateTicker();
}, 2000);

// Initial fade in for the first crypto
cryptoTicker.children[currentIndex].style.opacity = 1;
