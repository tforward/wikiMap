"use strict";

import { geoDataTypeName } from "./typesGeoData";

export function featureCollection(feats) {
  return {
    type: "FeatureCollection",
    features: feats
  };
}

export function pointFeature({
  id,
  lat,
  lon,
  properties = Object.create(null)
}) {
  return {
    type: "Feature",
    id,
    properties,
    geometry: {
      type: "Point",
      coordinates: [lon, lat]
    }
  };
}

const geoTypes = geoDataTypeName();
// If you data is structured differently change/add it here:
// Properties can be extended
export function configPntFeature(data) {
  return {
    id: data.pageid,
    lat: data.lat,
    lon: data.lon,
    properties: {
      title: data.title,
      category: geoTypes[data.type],
      region: data.region,
      description: data.extract,
      lat: data.lat,
      lon: data.lon,
      distance: data.dist,
      size: data.dim,
      url: data.url,
      thumbnail: data.thumbnail
    }
  };
}
