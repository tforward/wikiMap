"use strict";

import { fetchJsonFrom } from "./data";
import { addMapMarkers, addToMap } from "./leafletMap";

const R = require("ramda");
const visitedMarkerPng = require("../images/visited-marker-icon.png");
const markerShadow = require("../images/marker-shadow.png");

export function initWikiMap({ lat, lon, recordLimit, myMap }) {
  queryWiki({ lat, lon, recordLimit, myMap });
  myMap.on("click", onMapClick);

  function onMapClick(e) {
    const lat = e.latlng.lat;
    const lon = e.latlng.lng;
    queryWiki({ lat, lon, recordLimit, myMap });
    return [lat, lon];
  }
}

export function queryWiki({ lat, lon, recordLimit, myMap }) {
  const query = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&indexpageids=1&prop=pageimages%7Cextracts&list=geosearch&generator=geosearch&utf8=1&piprop=thumbnail%7Cname&pithumbsize=200&pilimit=${recordLimit}&exsentences=1&exintro=1&explaintext=1&gscoord=${lat}%7C${lon}&gsradius=10000&gslimit=${recordLimit}&gsprop=globe%7Ctype%7Cname%7Cdim%7Ccountry%7Cregion&ggscoord=${lat}%7C${lon}&ggsradius=10000&ggslimit=${recordLimit}&ggsprop=globe%7Ctype%7Cname%7Cdim%7Ccountry%7Cregion`;
  const addToReadyMap = addToMap(myMap);
  const addMarkersToMap = R.pipe(
    fetchJsonFrom,
    R.then(addMapMarkers),
    R.then(addToReadyMap)
  );
  addMarkersToMap(query);
  return true;
}

export function visitedMarkerMoreResults(e) {
  e.target.setIcon(visitedMarkerIcon);
}

const visitedMarkerIcon = L.icon({
  iconUrl: visitedMarkerPng,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
