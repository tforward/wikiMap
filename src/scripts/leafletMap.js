import { map } from "leaflet";
import "../../node_modules/leaflet/dist/leaflet.css";

("use strict");

const R = require("ramda");

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
  return L.marker([f.geometry.coordinates[1], f.geometry.coordinates[0]], {
    title: f.properties.title,
    alt: f.properties.title,
    riseOnHover: true,
    riseOffset: 250
  })
    .bindPopup(definePopup(f))
    .openPopup();
}

function definePopup(f) {
  const popup = L.popup({ maxWidth: 225 })
    .setContent(`<a target='_blank' href=${f.properties.url}>${
    f.properties.title
  }
  <br></br>${formatThumbnail(f)}
  <p>${f.properties.description} </p>
  <table>
    ${formatCategory(f)}
    ${formatLatLon(f)}
  </table>`);
  return popup;
}

function formatThumbnail(f) {
  if (f.properties.thumbnail !== undefined) {
    return `<img class="thumbnail center-align" src=${
      f.properties.thumbnail.source
    } alt="Smiley face" height=${f.properties.thumbnail.height} width=${
      f.properties.thumbnail.width
    }></a>`;
  }
  return "</a>";
}

function formatCategory(f) {
  if (f.properties.category !== undefined) {
    return `<tr><td>Type: ${f.properties.category}</td></tr>`;
  }
  return "";
}

function formatLatLon(f) {
  const latNum = f.properties.lat.toFixed(3);
  const lonNum = f.properties.lon.toFixed(3);
  return `<tr><td>Lat: ${latNum} Lon: ${lonNum}</td></tr>`;
}

export function addMapMarkers(pointsCollection) {
  return L.geoJson(pointsCollection, {
    pointToLayer(feature) {
      return makeMapMarker(feature);
    }
  });
}

function curAddToMap(myMap, layer) {
  return layer.addTo(myMap);
}

export const addToMap = R.curry(curAddToMap);
