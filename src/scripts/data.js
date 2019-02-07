import { map } from "leaflet";
import constant from "./fpUtils";
import addGeoJsonToMap from "./leafletMap";

import {
  configPntFeature,
  pointFeature,
  featureCollection,
  addProperties
} from "./typesGeojson";

const R = require("ramda");

function retriveJson(resp) {
  return resp.json();
}

// Refactor args
function listGeosearch(data) {
  const dataList = [...data.query.geosearch];
  return dataList;
}

// Move to main as is program specific
function concatUrl(url, id) {
  return R.concat(url, id.toString());
}

const currConcatUrl = R.curry(concatUrl);
const propWikiUrlID = currConcatUrl("https://en.wikipedia.org/?curid=");

function mapPickProps(props, list) {
  return R.map(R.pick(props), list);
}

const currPickProps = R.curry(mapPickProps);
const pickProps = currPickProps(["pageid", "title", "type", "lat", "lon"]);

// https://www.mediawiki.org/wiki/Extension:GeoData#Usage

function addUrlProp(obj) {
  return R.assoc("url", propWikiUrlID(obj.pageid), obj);
}

// TODO Look at refactoring the R.maps into one?
const rtnFeatureCollection = R.pipe(
  fetch,
  R.then(retriveJson),
  R.then(listGeosearch),
  R.then(pickProps),
  R.then(R.map(addUrlProp)),
  R.then(R.map(configPntFeature)),
  R.then(R.map(pointFeature)),
  R.then(R.map(addProperties)),
  R.then(featureCollection)
);

export const fetchJsonFrom = rtnFeatureCollection;

// https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261
// https://blogs.windows.com/msedgedev/2016/05/24/fetch-and-xhr-limitations/#wyZ8BREdhyRMFKmi.97
// https://css-tricks.com/using-fetch/
