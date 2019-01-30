"use strict";

import css_ from "../css/styles.css";
import loadLeaflet from "./leafletMap";

const myApp = Object.create(null);
// ======================================================================
// App
// ======================================================================

myApp.main = function main() {
  // Start here

  // Maybe Flex for map sizing as better support than Grid
  // https://codepen.io/tforward/pen/JJxYor?editors=0110
  loadLeaflet(45.44, 12.34);
};

// Handler when the DOM is fully loaded
document.onreadystatechange = function onreadystatechange() {
  if (document.readyState === "complete") {
    myApp.main();
  } else {
    // Do something during loading [opitional]
  }
};

// ======================================================================
