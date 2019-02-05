import constant from "./fpUtils";

import { pointFeature, testPnts } from "./typesGeojson";

const R = require("ramda");

function rtnData(data) {
  return data;
}

function retriveJson(resp) {
  return resp.json();
}

function listGeosearch(data) {
  const dataList = [...data.query.geosearch];
  return dataList;
}

function concatUrl(url, data) {
  return R.concat(url, data.toString());
}

const currConcatUrl = R.curry(concatUrl);
const propWikiUrlID = currConcatUrl("https://en.wikipedia.org/?curid=");

function mapPickProps(props, list) {
  return R.map(R.pick(props), list);
}

const currPickProps = R.curry(mapPickProps);
const pickProps = currPickProps(["pageid", "title", "type", "lat", "lon"]);

function addUrlProp(obj) {
  return R.assoc("url", propWikiUrlID(obj.pageid), obj);
}

function toPntFeature(data) {
  return pointFeature(data.pageid, data.lat, data.lon, {
    title: data.title,
    url: data.url,
    type: data.type
  });
}

function toFeatureCollection(data) {
  const newPnts = Object.assign(testPnts);
  newPnts.features = data;
  return newPnts;
}

const rtnJson = R.pipe(
  fetch,
  R.then(retriveJson),
  R.then(listGeosearch),
  R.then(pickProps),
  R.then(R.map(addUrlProp)),
  R.then(R.map(toPntFeature)),
  R.then(toFeatureCollection),
  // Here adding feature collection to map
  //
  console.log
);

export const fetchJsonFrom = rtnJson;

// https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261
// https://blogs.windows.com/msedgedev/2016/05/24/fetch-and-xhr-limitations/#wyZ8BREdhyRMFKmi.97
// https://css-tricks.com/using-fetch/
