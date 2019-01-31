import constant from "./fpUtils";

export default async function asyncFetch(url) {
  return fetch(url);
}

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
