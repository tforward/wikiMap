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
  myApp.map = loadLeaflet(45.44, 12.34, 11);

  // "https://en.wikipedia.org/w/api.php?&origin=*&action=query&format=json&prop=coordinates%7Cpageimages%7Cdescription&titles=Main%20Page&generator=geosearch&colimit=50&coprop=globe%7Ctype%7Cname%7Cdim%7Ccountry%7Cregion&coprimary=primary&pilimit=50&pithumbsize=240&descprefersource=central&ggscoord=40%7C0&ggsradius=10000&ggslimit=50&ggsprop=globe%7Cname%7Cdim%7Ccountry%7Cregion%7Ctype";

  const url =
    "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages%7Cextracts&list=geosearch&generator=geosearch&utf8=1&piprop=thumbnail%7Cname&pithumbsize=240&pilimit=50&exsentences=1&exintro=1&explaintext=1&gscoord=45%7C12&gsradius=10000&gslimit=50&gsprop=globe%7Ctype%7Cname%7Cdim%7Ccountry%7Cregion&ggscoord=45%7C12&ggsradius=10000&ggslimit=20&ggsprop=globe%7Ctype%7Cname%7Cdim%7Ccountry%7Cregion";

  const addMarkersToMap = R.pipe(
    fetchJsonFrom,
    R.then(addMapMarkers),
    R.then(addToMap)
  );

  addMarkersToMap(url);
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
