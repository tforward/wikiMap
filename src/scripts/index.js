"use strict";

import { map } from "leaflet";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import css_styles from "../css/styles.css";
import css_formatting from "../css/formatting.css";
import css_alignment from "../css/alignment.css";
import { loadLeaflet } from "./leafletMap";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.min";
import { initWikiMap } from "./wikiMap";

const myApp = Object.create(null);
// =====================================================
// App
// =====================================================

myApp.main = function main() {
  // Maybe Flex for map sizing as better support than Grid
  // https://codepen.io/tforward/pen/JJxYor?editors=0110
  const lat = 45.44;
  const lon = 12.34;
  const zoom = 15;

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
