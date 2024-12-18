const stockPricesElement = document.getElementById("stockPrices");
const apiKey = "YourApiKey";

const fallbackValues = {
    "AAPL": 224.69,
    "GOOGL": 181.49,
    "AMZN": 208.84,
    "NVDA": 148.29,
    "INTC": 24.17
};

async function fetchStockPrices() {
    const stockSymbols = ["AAPL", "GOOGL", "AMZN", "NVDA", "INTC"];
    let stockText = "Stocks you might like -- ";

    for (const symbol of stockSymbols) {
        try {
            const response = await fetch(``);
            const data = await response.json();

            if (data["Time Series (5min)"]) {
                const latestTime = Object.keys(data["Time Series (5min)"])[0];
                const price = data["Time Series (5min)"][latestTime]["1. open"];
                stockText += `${symbol}: $${parseFloat(price).toFixed(2)} | `;
            } else {
                stockText += `${symbol}: $${fallbackValues[symbol].toFixed(2)}  | `;
            }
        } catch (error) {
            stockText += `${symbol}: Error fetching  `;
            console.error("Error fetching stock data:", error);
        }
    }

    stockPricesElement.textContent = stockText;
}

fetchStockPrices();
setInterval(fetchStockPrices, 30000); 

const NYTIMES_API_KEY = "YourApiKey";

async function fetchFinancialNews() {
    const financialNewsElement = document.getElementById("financialNews");
    try {
        const response = await fetch(``);
        const data = await response.json();
        const articles = data.results.slice(0, 5);
        financialNewsElement.innerHTML = articles.map(article => `
            <p><a href="${article.url}" target="_blank">${article.title}</a></p>
        `).join('');
    } catch (error) {
        financialNewsElement.innerHTML = "Unable to load financial news.";
        console.error("Error fetching financial news:", error);
    }
}

async function fetchTechNews() {
    const techNewsElement = document.getElementById("techNews");
    try {
        const response = await fetch(``);
        const data = await response.json();
        const articles = data.results.slice(0, 5);
        techNewsElement.innerHTML = articles.map(article => `
            <p><a href="${article.url}" target="_blank">${article.title}</a></p>
        `).join('');
    } catch (error) {
        techNewsElement.innerHTML = "Unable to load tech news.";
        console.error("Error fetching tech news:", error);
    }
}

fetchFinancialNews();
fetchTechNews();
