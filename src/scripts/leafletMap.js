"use strict";

import { map } from "leaflet";
import "../../node_modules/leaflet/dist/leaflet.css";

export function loadLeaflet(x, y, zoom) {
  const OpenStreetMapHot = L.tileLayer(
    "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    {
      maxZoom: 19,
      attribution: false
    }
  );

  const myMap = L.map("mapid", {
    layers: [OpenStreetMapHot]
  }).setView([x, y], zoom);
  return myMap;
}

export function makeMapMarker(f) {
  console.log(f);
  return (
    L.marker([f.geometry.coordinates[1], f.geometry.coordinates[0]], {
      title: f.properties.title,
      alt: f.properties.title,
      riseOnHover: true,
      riseOffset: 250
    })
      // TODO: Type of undefined handle
      .bindPopup(
        `<a target='_blank' href=${f.properties.url}>${f.properties.title}
        <img src=${
          f.properties.thumbnail.source
        } alt="Smiley face" height=${
          f.properties.thumbnail.height
        } width=${f.properties.thumbnail.width}></a>
        <p>${f.properties.description} </p>
        <p>Type: ${f.properties.category} </p>`
      )
      .openPopup()
  );
}
