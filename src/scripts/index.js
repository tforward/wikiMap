"use strict";

import { map } from "leaflet";
import css_styles from "../css/styles.css";
import css_formatting from "../css/formatting.css";
import css_alignment from "../css/alignment.css";
import loadLeaflet from "./leafletMap";
import { fetchJsonFrom } from "./data";

import markIcon from "../Images/marker-icon.png";
import markShadow from "../Images/marker-shadow.png";

// import addGeoJsonToMap from "./leafletMap";

const R = require("ramda");

const myApp = Object.create(null);
// =====================================================
// App
// =====================================================

myApp.main = function main() {
  // Start here

  // Maybe Flex for map sizing as better support than Grid
  // https://codepen.io/tforward/pen/JJxYor?editors=0110
  myApp.map = loadLeaflet(45.44, 12.34);

  const url =
    "https://en.wikipedia.org/w/api.php?&origin=*&action=query&format=json&list=geosearch&gsprop=type|name|dim|country|region|globe&gsbbox=45.5%7C12.2%7C45.4%7C12.3&gsradius=2000&gslimit=500";

  const results = fetchJsonFrom(url);

  const test = R.pipe(
    fetchJsonFrom,
    R.then(addToMap),
    console.log
  );

  test(url);
};

function addToMap(data) {
  L.geoJSON(data).addTo(myApp.map);
}

// Handler when the DOM is fully loaded
document.onreadystatechange = function onreadystatechange() {
  if (document.readyState === "complete") {
    myApp.main();
  } else {
    // Do something during loading [opitional]
  }
};

// ===================================================
