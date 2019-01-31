// https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch3.md/#unchanging-one
export default function constant(v) {
  return function value() {
    return v;
  };
}
