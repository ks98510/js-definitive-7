/* # 5.7 declaration */

/* # 5.7.1 const let var */
const TAU = 2 * Math.PI;
let radius = 3;
var circumference = TAU * radius;

/* 5.7.2 function */

function area(radius) {
  return Math.PI * radius * radius;
}
// function declarations are “hoisted” because it is as if they had all been moved up to the top of whatever scope they are defined within.
// 会提升，所以在declaration 之前 invoke 不会报错。

// generator function and async function

/* 5.7.3 class */
class Circle {
  constructor(radius) {
    this.radius = radius;
  }
  get area() {
    return Math.PI * this.radius * this.radius;
  }
  set area(value) {
    this.radius = Math.sqrt(value / Math.PI);
  }
}
// class declarations are not "hoisted" 

/* # 5.7.4 import and export */
// module is a file of js code with its own global namespace ,completely independent of all other modules. use export to export a variable or function from a module.
/* different import forms */
// import Circle from './circle.js';
// import { PI } from './circle.js';
// import { Circle as Circle2, PI as PI2 } from './circle.js';