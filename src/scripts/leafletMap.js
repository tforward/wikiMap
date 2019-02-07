"use strict";

import { map } from "leaflet";
import "../../node_modules/leaflet/dist/leaflet.css";

export function loadLeaflet(x, y) {
  const OpenStreetMapHot = L.tileLayer(
    "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    {
      maxZoom: 19,
      attribution: false
    }
  );

  const myMap = L.map("mapid", {
    layers: [OpenStreetMapHot]
  }).setView([x, y], 14);
  return myMap;
}

export function makeMapMarker(feature) {
  return L.marker(
    [feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
    {
      title: feature.properties.title,
      riseOnHover: true,
      riseOffset: 250
    }
  )
    .bindPopup(
      `<a target='_blank' href=${feature.properties.url}>${
        feature.properties.title
      }</a><p>Type: ${feature.properties.category} </p>`
    )
    .openPopup();
}
