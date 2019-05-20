"use strict";

/************/
/* API urls */
/************/

const coinlore = "https://api.coinlore.com/api/tickers/?start=0&limit=100";
const coincap = "https://api.coincap.io/v2/assets/bitcoin-cash-sv/history?interval=m15";

/***********/
/* globals */
/***********/
let ifClicked = false;

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
	let name = coin.name;
	// handle the ripple naming issue
	if (name === "XRP") {
		name = "Ripple";
	}
	const symbol = coin.symbol;

	// function to format the price to into currency 
	const formatterPrice = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
	})
	const currentPrice = "Current Price: " + formatterPrice.format(coin.price_usd);

	// function to format the percent to display a percentage
	const formatterPercentChangeDay = new Intl.NumberFormat('en-US', {
		style: 'percent',
		minimumFractionDigits: 2
	})
	const percentChangeDay = "24h % Change: " + formatterPercentChangeDay.format((coin.percent_change_24h)/100);

	// function to format the market price to not have decimal points
	const formatterMarketCap = new Intl.NumberFormat('en-US', {
		style: 'decimal',
		maximumFractionDigits: 0
	})
	const marketCap = "Market Cap: $" + formatterMarketCap.format(coin.market_cap_usd);

	const dataArray = [name, symbol, currentPrice, percentChangeDay, marketCap];
	// create a sub list to hold a list of the extracted data
	const subList = document.createElement("ul");
	// add in a class name for styling
	subList.className = "grid-cell";
	// add in the click event listener
	subList.addEventListener("click", () => {
		// remove the element from the display (space on page no
		// longer allocated)
		document.querySelector(".coin-data").style.display = "none";
		// only display the graph once
		if (!ifClicked) {
			loadCoinPrices(name.toLowerCase(), name);
			// update click boolean
			ifClicked = true;	
		}
	});
	// add in the data to the sub list
	for (let i=0; i<dataArray.length; i++) {
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

function loadCoinPrices(id, name) {
	// appropriately format id
	if (id.includes(" ")) {
		const words = id.split(" ");
		id = words.join("-");
		console.log(id);
	}
	const url = `https://api.coincap.io/v2/assets/${id}/history?interval=m15`;
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
		buildChart(arr[0], arr[1], arr[2], name);
	});
}

function buildChart(prices, dates, times, name) {
	/* build out a price chart, where each parameter is an array */
	const dateAndTimes = []; // declare/init new labels array
	// loop over the dates array
	for (let i=0; i<dates.length; i++) {
		// grab each 6th date
		if (i%6 == 0) {
			// append to new labels array
			dateAndTimes.push(dates[i]);
		} else {
			// otherwise, push empty string
			dateAndTimes.push("");
		}
	}

	const prettyPrices = []; // declare/init container for formatted prices
	for (let i=0; i<prices.length; i++) {
		// parse string as float, rounding off to hundredths place
		prettyPrices.push(parseFloat(prices[i]).toFixed(2));
	}

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
				label: name,
				// style the border
				borderColor: "white",
				
				// borderColor: "rgb(255, 99, 132)",
				// add in the data as an array
				data: prettyPrices
				
			}]
		},
		
		// lastly, configure the options
		options: {
			legend: {
				labels: {
					fontColor: "white",
					fontSize: 18
				}
			},
			scales: {
				yAxes: [{
					ticks: {
						fontColor: "white",
					}
				}],
				xAxes: [{
					labels: dateAndTimes,
					ticks: {
						fontColor: "white",
					}
				}]
			},
			chartArea: {
				backgroundColor: "white",
			}
		}
	});
}

/********/
/* MAIN */
/********/
(function main() {
	// run the script
	loadCoinData(coinlore);
})()