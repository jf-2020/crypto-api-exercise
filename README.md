# crypt-api-exercise

# CryptoLogic – Front End Project

##### [cryptologic.business – Live Site](http://www.cryptologic.business)

### Description
---
CrytpoLogic is a front-end only application that brings together the multitudinous array of cryptocurrencies under a single domain. The application itself is essentially a dashboard, displaying surface-level information on each currency, sorted by market capitalization. If any particular coin is clicked, a graphical representation of the prior week’s price change is rendered. The overall goal of the site is to provide the user with the necessary tools to make an informed decision regarding their cryptocurrency assets.

### Features
---
* A slide-in blurring effect provides an aesthetically appealing entry point for the navbar.
* A hover effect highlights the coin of interest, so that the current coin is contrasted with surrounding coins.
* Each card provides the following detailed information on the selected coin:
  -	Physical name
  -	Trade ticker
  -	Current price
  -	Last 24 hour percentage change
  -	Market Capitalization
* The last week’s worth of price behavior for any particular coin is presented in graphical form.
  -	Line graph, using cubic interpolants for data given over 4 hour intervals
  -	Each point, when hovered over, provides meta information for coordinate
  -	Date of particular day rendered on x-axis
  -	Legend lists graph color & coin name
* Important educational investing video linked in to navbar

## Technologies
---
* HTML
* CSS
* JavaScript
* CoinLore API
* CoinCap API

## Challenges and Solutions
---
* Pivoting – our team pivoted on two separate occasions. The first application idea didn’t get off the ground in time due to API authorization issues. Whereas the second application we actually finished an MVP, it was, however, somewhat unpleasing to the team, so we decided to pivot a second time. While this led to a fully-finished final product, it was difficult to manage the idea deluge in conjunction with the desire to implement a practical application. We were able to corral the back-and-forth by remaining open and frank in our team meetings and subsequent follow ups.
* Organization – throughout the project development process, the team maintained an open line of communication. It was necessary to leverage the respective strengths of each team member, so that no project gaps became too large and/or unwieldy.
* APIs – while the information made available is both voluminous and well-documented, the data necessary for the project did not necessarily correspond with what was returned. Thus, it was a challenge to slice and dice the JSON per our requirements. Ultimately, reading and re-reading the docs helped to overcome this issue.
* Styling – our development process was not mobile first, so making the design responsive was a process in of itself. We thought simple media queries along with viewport values would directly solve the problem, but it turned out to be more difficult than that. It was necessary to fully redesign the grid to drop to a single column format for the smaller screen sizes. All of this was designed strictly from the devices view made available in dev-tools, and upon deployment, actual devices seemed to not behave per as intended. It turned out a simple meta tag embedded in the head of the html solved this problem.

## MVP
---
* Create a basic front-end application that provides useful information for cryptocurrency traders
* Requirements:
  -	Present basic data on as many currencies as necessary in dashboard format
  -	Render line graph of price behavior for last week of trading
  -	Fully responsive design that accommodates standard devices and browser types

## Stretch Goals
---
* Draw a price graph for a useful period of time
o	Complete
* Implement a search function as opposed to full rendering of currencies on landing page
o	Incomplete

## Authors
---
1.	Igor Popenov
  - Contributions:
    - Concept, DOM Manipulation, Styling & Responsive Design
  -	[GitHub Profile](https://github.com/iggz)
2.	Jack Faulk
  -	Contributions:
    - Concept, DOM Manipulation, Functionality & Styling
  - [GitHub Profile](https://github.com/jf-2020)

## Site Capture
---


![](CryptoLogic.gif)