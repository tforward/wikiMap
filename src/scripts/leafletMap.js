"use strict";

import { map } from "leaflet";
import { leaflet_css } from "../../node_modules/leaflet/dist/leaflet.css";

export default function loadLeaflet(x, y) {
  const OpenStreetMapHot = L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: false
  });

  const myMap = L.map("mapid", {
    layers: [OpenStreetMapHot]
  }).setView([x, y], 14);
  return myMap;
}
