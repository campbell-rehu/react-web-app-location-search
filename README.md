# Simple Google Maps Search App

This app features an input field that uses the GMaps library to search for an entered location and display it on the map. It also allows the user to select Favourite locations which are saved to local storage and displayed on the page for quick reuse. 

I followed the tutorial found [here](http://tutorialzine.com/2015/04/first-webapp-react/?utm_source=ActiveCampaign&utm_medium=email&utm_content=Advanced+Beginner+Challenge%3A+JavaScript+Day+12&utm_campaign=JS+Day+12).

## How to use

```bash
git clone https://github.com/logicalhash/react-web-app-location-search.git react-web-location-search
cd react-web-location-search
npm install
npm run build
# Open the Index.html file
```

# Changes

## assets/styles.css

```css
#map {
	max-width: 500px;
	max-height: 350px; // Added this line
	height: 350px;
	margin: 0 auto;
}
```

I added line 3 because the map height was changing with every search.

## react-dom

I had to install the `react-dom` module with the following terminal command:

```bash
npm install --save react-dom
```

to allow the use of the `findDOMNode()` and `.render()` functions required in the `Search.js` and `main.js` files:

### components/Search.js

```javascript
var ReactDOM = require('react-dom');
...
ReactDOM.findDOMNode(this).querySelector('input').blur();
...
```

### main.js

```javascript
var ReactDOM = require('react-dom');
...

ReactDOM.render(  
    <App />,
    document.getElementById('main')
);
```



