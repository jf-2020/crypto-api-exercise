"use strict";

/************/
/* API urls */
/************/
const coinlore = "https://api.coinlore.com/api/tickers/?start=0&limit=16";
const coincap = "https://api.coincap.io/v2/assets/bitcoin/history?interval=m15";


/***********/
/* methods */
/***********/
function get(url) {
	/* main getter for API data */
	return fetch(url)
		.then(response => {
			// render the response as json
			return response.json();
		})
		.then(data => {
			// pass out the data
			return data;
		})
		.catch(error => {
			return error;
		});
}

function loadCoinData(url) {
	get(url)
	.then(response => {
		// then add each coin to the grid
		response.data.forEach(coin => {
			addCoin(coin);
		})
	});
}

function addCoin(coin) {
	// get the relevant ul dom element
	const ul = document.querySelector(".currencies");
	// create a li element to populate with said data
	const li = document.createElement("li");
	// extract the data from the coin object and push it to an array
	const name = coin.nameid.charAt(0).toUpperCase() + coin.nameid.substr(1);
	const symbol = coin.symbol;
	const currentPrice = "Current Price: $" + coin.price_usd;
	const marketCap = "Market Cap: $" + coin.market_cap_usd;
	const dataArray = [name, symbol, currentPrice, marketCap];
	// create a sub list to hold a list of the extracted data
	const subList = document.createElement("ul");
	// add in the data to the sub list
	for (let i=0; i<4; i++) {
		// use a list item element to hold the data
		const subItem = document.createElement("li");
		// add in the data to the sub list
		subItem.textContent = dataArray[i];
		// if the coin's name, then add in a class name for styling
		if (i == 0) {
			subItem.className = "coin-name";
		}
		// if the coin's symbol, then add in a class name for styling, too
		if (i == 1) {
			subItem.className = "coin-symbol";
		}
		// then push it to the sub list
		subList.append(subItem);
	}
	// finally, add the sublist to the unordered list
	ul.append(subList);
}

function loadCoinPrices(url) {
	get(url)
	.then(response => {
		// log out the status of the response
		const prices = [];
		const dates = [];
		const times = []; 
		let count = 0;
		// now, the prices are stored in an array of objects
		response.data.forEach(price => {
			// get the current price
			const priceUSD = price.priceUsd;
			// extract the date & time
			const datestring = price.date;
			const dateAndTime = datestring.split("T");
			const day = dateAndTime[0];
			const time = dateAndTime[1].substr(0,5);
			// add it to the price, date & time arrays
			if (count % 16 == 0) {
				// but only if it's every 16th element...
				prices.push(priceUSD);
				dates.push(day);
				times.push(time);
			}
			// bump up the count
			count++;
		})
		return [prices, dates, times];
	})
	.then(arr => {
		buildChart(arr[0], arr[1], arr[2]);
	});
}

function buildChart(prices, dates, times) {
	/* build out a price chart, where each parameter is an array */
	
	// get chart context, which consists of getting the chart canvas
	// from the page & subsequently accessing its dimensional context
	const ctx = document.getElementById("myChart").getContext("2d");
	// create the chart
	const chart = new Chart(ctx, {
		// the type of chart to create
		type: "line",
		// next, the data
		data: {
			// first, add in the graph labels
			labels: dates,
			// second, add in the datasets
			datasets: [{
				// label the first dataset
				label: "Bitcoin",
				// give it a background color
				// backgroundColor: "rgb(255, 99, 132)",
				// style the border
				borderColor: "rgb(255, 99, 132)",
				// add in the data as an array
				data: prices
			}]
		},
		// lastly, configure the options
		options: {}
	});
}

/********/
/* MAIN */
/********/
(function main() {
	// run the script
	loadCoinData(coinlore);
	loadCoinPrices(coincap);
})()