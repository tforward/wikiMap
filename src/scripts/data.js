"use strict";

import {
  configPntFeature,
  pointFeature,
  featureCollection
} from "./typesGeojson";

import * as R from "ramda"

function retriveJson(response) {
  return response.json();
}

function returnQuery(data) {
  const records = noRecords(data.query);
  return records;
}

function noRecords(query) {
  if (query.geosearch.length === 0) {
    alert(
      "The World is a BIG place and there are no Wiki entries here, just yet... Try clicking elsewhere on the map."
    );
    return Promise.reject();
  }
  return query;
}

function concatUrl(url, id) {
  return R.concat(url, id.toString());
}

const currConcatUrl = R.curry(concatUrl);
const propWikiUrlID = currConcatUrl("https://en.wikipedia.org/?curid=");
const allPageIds = initPageIds();

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

  const idsArray = allPageIds(list.pageids);
  const idsToAdd = idsArray[1];

  const geoArry = R.map(R.pick(geoSearchProps), list.geosearch);
  const pagesObj = R.map(R.pick(pagesProps), list.pages);

  const geoObjId = arrayToObjID(geoArry);
  const mergedResults = R.mergeDeepRight(geoObjId, pagesObj);
  return R.pick(idsToAdd, mergedResults);
}

function initPageIds() {
  const allIds = [];
  let init = true;

  function addIds(ids) {
    const newIds = [];
    if (allIds.length === 0) {
      Array.prototype.push.apply(allIds, ids);
    } else {
      for (let i = 0; i < ids.length; i += 1) {
        const id = ids[i];
        if (allIds.includes(id) === false) {
          allIds.push(id);
          newIds.push(id);
        }
      }
    }
    // On init just return allIds
    if (init) {
      init = false;
      return [allIds, allIds];
    }
    return [allIds, newIds];
  }
  return addIds;
}

function arrayToObjID(array) {
  return R.reduce(iteratorID, {}, array);
}

function iteratorID(obj, value) {
  obj[value.pageid] = value;
  return obj;
}

function addUrlProp(obj) {
  return R.assoc("url", propWikiUrlID(obj.pageid), obj);
}

function objToArrayOfObjs(data) {
  return R.values(data);
}

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
