const R = require("ramda");

export function featureCollection(name, feats = []) {
  return {
    layer: name,
    type: "FeatureCollection",
    features: feats
  };
}

const curryFeatureCollection = R.curry(featureCollection);
export const testPnts = curryFeatureCollection("TestPnts");

export function pointFeature(id, lat, lon, props = {}) {
  return {
    type: "Feature",
    id,
    properties: props,
    geometry: {
      type: "Point",
      coordinates: [lon, lat]
    }
  };
}
