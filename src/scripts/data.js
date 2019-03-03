import { map } from "leaflet";


import {
  configPntFeature,
  pointFeature,
  featureCollection
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

function pickAndMergeProps(list) {
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
  const pagesProps = ["pageid", "title", "extract", "thumbnail"];
  const geoArry = R.map(R.pick(geoSearchProps), list.geosearch);
  const pagesObj = R.map(R.pick(pagesProps), list.pages);
  const geoObjId = arrayToObjID(geoArry);
  return R.mergeDeepRight(geoObjId, pagesObj);
}

function arrayToObjID(array) {
  return R.reduce(iteratorID, {}, array);
}

function iteratorID(obj, value) {
  obj[value.pageid] = value;
  return obj;
}

// https://www.mediawiki.org/wiki/Extension:GeoData#Usage

function addUrlProp(obj) {
  return R.assoc("url", propWikiUrlID(obj.pageid), obj);
}

function objToArrayOfObjs(data) {
  return R.values(data);
}

// TODO Look at refactoring the R.maps into one?
const rtnFeatureCollection = R.pipe(
  fetch,
  R.then(retriveJson),
  R.then(returnQuery),
  R.then(pickAndMergeProps),
  R.then(R.map(addUrlProp)),
  R.then(objToArrayOfObjs),
  R.then(R.map(configPntFeature)),
  R.then(R.map(pointFeature)),
  R.then(featureCollection)
);

export const fetchJsonFrom = rtnFeatureCollection;
