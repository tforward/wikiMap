"use strict";

import css_styles from "../css/styles.css";
import css_formatting from "../css/formatting.css";
import css_alignment from "../css/alignment.css";
import loadLeaflet from "./leafletMap";
import asyncFetch from "./data";

const myApp = Object.create(null);
// =====================================================
// App
// =====================================================

myApp.main = function main() {
  // Start here

  // Maybe Flex for map sizing as better support than Grid
  // https://codepen.io/tforward/pen/JJxYor?editors=0110
  loadLeaflet(45.44, 12.34);
  const result = asyncFetch(
    "https://api.github.com/users/chriscoyier/repos"
  );
  console.log(result.then(response => response));
};

// Handler when the DOM is fully loaded
document.onreadystatechange = function onreadystatechange() {
  if (document.readyState === "complete") {
    myApp.main();
  } else {
    // Do something during loading [opitional]
  }
};

// ===================================================
