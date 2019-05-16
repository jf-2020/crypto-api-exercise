"use strict";

/************/
/* API urls */
/************/

const coinlore = "https://api.coinlore.com/api/tickers/?start=0&limit=16";

/***********/
/* methods */
/***********/

function getCurrencies() {
	/* utilizing the coinlore api, get the actual currencies and some
	   basic info related to each coin */
	fetch(coinlore)
	// convert to json
	.then(response => response.json())
	// now store the data in an intermediate container array
	.then(data => {
		// the coin data is stored in the data property. access it
		const coins = data.data;
		// ---> now, populate the page grid <--- //
		coins.forEach(coin => {
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
		})
	})
}

function main() {
	// main function for running script
	getCurrencies();
}
main();