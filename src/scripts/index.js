"use strict";

import { map } from "leaflet";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import css_styles from "../css/styles.css";
import css_formatting from "../css/formatting.css";
import css_alignment from "../css/alignment.css";
import { loadLeaflet, makeMapMarker } from "./leafletMap";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.min";
import { fetchJsonFrom } from "./data";

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
    R.then(addMapMarkers),
    R.then(addToMap),
    console.log
  );

  test(url);
};

function addMapMarkers(pointsCollection) {
  return L.geoJson(pointsCollection, {
    pointToLayer(feature) {
      return makeMapMarker(feature);
    }
  });
}

function addToMap(layer) {
  return layer.addTo(myApp.map);
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
