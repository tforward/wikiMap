"use strict";

import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import css_styles from "../css/styles.css";
import { loadLeaflet } from "./leafletMap";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.min";
import { initWikiMap } from "./wikiMap";

const myApp = Object.create(null);

// =====================================================
// App
// =====================================================

myApp.main = function main() {
  const lat = 45.434;
  const lon = 12.34;
  const zoom = 17;

  // Max Record Limit is 20
  const recordLimit = 20;
  const myMap = loadLeaflet(lat, lon, zoom);
  initWikiMap({ lat, lon, recordLimit, myMap });
};

// Handler when the DOM is fully loaded
document.onreadystatechange = function onreadystatechange() {
  if (document.readyState === "complete") {
    myApp.main();
  } else {
    // Do something during loading [optional]
  }
};

// ===================================================
