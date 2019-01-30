import css_ from "../css/styles.css";

const myApp = Object.create(null);
// ======================================================================
// App
// ======================================================================

myApp.main = function main() {
	// Start here
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
