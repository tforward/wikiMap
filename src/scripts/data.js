import { map } from "leaflet";
import addGeoJsonToMap from "./leafletMap";

import {
  configPntFeature,
  pointFeature,
  featureCollection,
  addProperties
} from "./typesGeojson";

const R = require("ramda");

function retriveJson(response) {
  return response.json();
}

// Refactor args
function returnQuery(data) {
  return data.query;
}

// Move to main as is program specific
function concatUrl(url, id) {
  return R.concat(url, id.toString());
}

const currConcatUrl = R.curry(concatUrl);
const propWikiUrlID = currConcatUrl("https://en.wikipedia.org/?curid=");

function pickProps(list) {
  // Ramda
  // forEachObjIndexed
  // mergeWithKey
  const geoSearchProps = [
    "pageid",
    "type",
    "lat",
    "lon",
    "dim",
    "dist",
    "name",
    "region",
    "country"
  ];
  // set the keys to the pageId, then merge both objects based on id
  // pop the pageId, make new object with pageid as the key, then
  // assign the remaing values [key] = array
  const pagesProps = ["pageid", "title", "extract", "thumbnail"];
  const geoObj = R.map(R.pick(geoSearchProps), list.geosearch);
  const pagesObj = R.map(R.pick(pagesProps), list.pages);
  console.log(geoObj);
  // console.log(pagesObj);
  return R.map(R.pick(geoSearchProps), list);
}

// https://www.mediawiki.org/wiki/Extension:GeoData#Usage

function addUrlProp(obj) {
  return R.assoc("url", propWikiUrlID(obj.pageid), obj);
}

// TODO Look at refactoring the R.maps into one?
const rtnFeatureCollection = R.pipe(
  fetch,
  R.then(retriveJson),
  R.then(returnQuery),
  R.then(pickProps),
  R.then(R.map(addUrlProp)),
  R.then(R.map(configPntFeature)),
  R.then(R.map(pointFeature)),
  R.then(R.map(addProperties)),
  R.then(featureCollection)
);

export const fetchJsonFrom = rtnFeatureCollection;
