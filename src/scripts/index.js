"use strict";

import { map } from "leaflet";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import css_styles from "../css/styles.css";
import css_formatting from "../css/formatting.css";
import css_alignment from "../css/alignment.css";
import { loadLeaflet, addMapMarkers, addToMap } from "./leafletMap";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.min";
import { fetchJsonFrom } from "./data";

const R = require("ramda");

const myApp = Object.create(null);
// =====================================================
// App
// =====================================================

myApp.main = function main() {
  // Maybe Flex for map sizing as better support than Grid
  // https://codepen.io/tforward/pen/JJxYor?editors=0110
  const lat = 45.44;
  const lon = 12.34;
  // Max 20
  const recordLimit = 20;

  const myMap = loadLeaflet(lat, lon, 15);

  queryWiki({ lat, lon, recordLimit, myMap });
  myMap.on("click", onMapClick);

  function onMapClick(e) {
    const { lat } = e.latlng;
    const lon = e.latlng.lng;
    queryWiki({ lat, lon, recordLimit, myMap });
    return [lat, lon];
  }
};

function queryWiki({ lat, lon, recordLimit, myMap }) {
  const query = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages%7Cextracts&list=geosearch&generator=geosearch&utf8=1&piprop=thumbnail%7Cname&pithumbsize=200&pilimit=${recordLimit}&exsentences=1&exintro=1&explaintext=1&gscoord=${lat}%7C${lon}&gsradius=10000&gslimit=${recordLimit}&gsprop=globe%7Ctype%7Cname%7Cdim%7Ccountry%7Cregion&ggscoord=${lat}%7C${lon}&ggsradius=10000&ggslimit=${recordLimit}&ggsprop=globe%7Ctype%7Cname%7Cdim%7Ccountry%7Cregion`;
  const addToReadyMap = addToMap(myMap);
  const addMarkersToMap = R.pipe(
    fetchJsonFrom,
    R.then(addMapMarkers),
    R.then(addToReadyMap)
  );
  addMarkersToMap(query);
  return true;
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
