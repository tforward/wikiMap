export function featureCollection(feats = []) {
  return {
    type: "FeatureCollection",
    features: feats
  };
}

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
