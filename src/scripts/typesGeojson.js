import { geoDataTypeName } from "./typesGeoData";

export function featureCollection(feats = []) {
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

// If you data is structured differently change/add it here:
export function configPntFeature(data) {
  return {
    id: data.pageid,
    lat: data.lat,
    lon: data.lon,
    properties: {
      title: data.title,
      url: data.url,
      type: data.type
    }
  };
}

const geoTypes = geoDataTypeName();

export function addProperties(data) {
  data.properties.category = geoTypes[data.properties.type];
  return data;
}
