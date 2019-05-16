"use strict";

/************/
/* API urls */
/************/

const coinlore = "https://api.coinlore.com/api/tickers/?start=0&limit=16";

/***********/
/* methods */
/***********/

function get(url) {
	return fetch(url)
		.then(response => {
			return response.json();
		})
		.then(data => {
			console.log("get has run");
			return data;
		})
		.catch(error => {
			return error;
		});
}

function load(url) {
	get(url)
	.then(response => {
		console.log("data has loaded", response);
		// now do stuff
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

function buildChart() {
	/* build out the test chart */
	
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
			labels: ['January', 'February', 'March', 'April',
					 'May', 'June', 'July'],
			// second, add in the datasets
			datasets: [{
				// label the first dataset
				label: "My First Dataset",
				// give it a background color
				backgroundColor: "rgb(255, 99, 132)",
				// style the border
				borderColor: "rgb(255, 99, 132)",
				// add in the data as an array
				data: [0, 10, 5, 2, 20, 30, 45]
			}]
		},

		// lastly, configure the options
		options: {}
	});
}

function main() {
	// main function for running script
	buildChart();
	load(coinlore);
}

main();