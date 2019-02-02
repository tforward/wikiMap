import constant from "./fpUtils";

const R = require("ramda");

export function log(msg) {
  console.log(msg);
}

function rtnData(data) {
  return data;
}

function retriveJson(resp) {
  return resp.json();
}

const printKeyConcatValue = (value, key) => `${2}:${value}`;

function processData(data) {
  // console.log(R.prop("id", data[0]));
  console.log(R.forEachObjIndexed(printKeyConcatValue, data)); //= > {x: 1, y: 2}  );
  // console.log(R.map(R.prop("id"), data));
  // return
}

const rtnJson = R.pipe(
  fetch,
  R.then(retriveJson),
  R.then(processData)
);

export const fetchJsonFrom = rtnJson;

// const url = "https://api.github.com/users/chriscoyier/repos";

// fetchJsonFrom(url)
// fetchUrl("https://api.github.com/users/chriscoyier/repos");

// https://ramdajs.com/repl/#?console.clear%28%29%3B%0A%0Aconst%20urls%20%3D%20%5B%0A%20%20%27https%3A%2F%2Fapi.github.com%2Fusers%2Fchriscoyier%2Frepos%27%0A%5D%0A%0Aconst%20then%20%3D%20fn%20%3D%3E%20pr%20%3D%3E%20pr.then%28fn%29%0Aconst%20json%20%3D%20resp%20%3D%3E%20resp.json%28%29%0Aconst%20get%20%3D%20compose%28then%28json%29%2C%20fetch%29%0Aconst%20prAll%20%3D%20ps%20%3D%3E%20Promise.all%28ps%29%20%2F%2F%20or%20prAll%20%3D%20Promise.all.bind%28Promise%29%0A%0Aconst%20run%20%3D%20pipe%28%0A%20%20map%28get%29%2C%0A%20%20prAll%2C%0A%20%20then%28map%28length%29%29%2C%0A%20%20then%28console.log%29%2C%0A%29%0Arun%28urls%29

// const promise1 = Promise.resolve(
//     "https://api.github.com/users/chriscoyier/repos"
//   );

//   console.log(promise1);

// export default async function asyncFetch(url) {
//   fetch(url)
//     .then(response => response.json())
//     .then(data => console.log("data is", data))
//     .catch(error => console.log("error is", error));
//     return
// }

// https://css-tricks.com/using-es2017-async-functions/

// https://css-tricks.com/why-using-reduce-to-sequentially-resolve-promises-works/
// https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261
// https://blogs.windows.com/msedgedev/2016/05/24/fetch-and-xhr-limitations/#wyZ8BREdhyRMFKmi.97
// https://css-tricks.com/using-fetch/

// Polyfill
// https://github.com/github/fetch

// http://hamidmosalla.com/2018/03/30/when-to-use-async-and-await-and-how-it-works/

// https://medium.com/@dtipson/more-functional-javascript-reducing-promises-ramda-js-arrow-functions-again-c1f90e0a79d0
