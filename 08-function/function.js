/* except the arguments , each invocation has another value - the invocation context */
/* # 8.1 defining functions */
/* # 8.1.1 Function declarations */
function printProps(o) {
  for (let p in o) {
    console.log(`${p}:${o[p]}\n`);
  }
}
// Compute the distance between Cartesian points (x1,y1) and (x2,y2).
function distance(x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

// A recursive function (one that calls itself) that computes factorials
// Recall that x! is the product of x and all positive integers less than it.
function factorial(x) {
  if (x <= 1) return 1;
  return x * factorial(x - 1);
}
/* function declaration will be "hoisted" , so we can invoke them before the defining */
/* return can stop the executing and return the value or undefined */

/* # 8.1.2 Function expressions */
const square = function (x) { return x * x };
const abc = function know() { };
/* the different between function declaration and expression. func defined with the expression can be invoked before it is declared  */
// know(); // know is not defined
// lxl(); // lx is not defined
const lx = function () { }

/* # 8.1.3 Arrow functions */
const sum = (x, y) => { return x + y; };
/* more compact syntax  omit the return keyword*/
const asum = (x, y) => x + y;
/* omit the parentheses */
const poynoiaml = x => x ** 2;
/* return the object  */
(x) => { return { x } };
x => ({ x });
const h = x => { value: x };
h(1);//undefined
// const i = x => { x: x, w: x }; // SyntaxError
let filtered = [1, null, 2, 3].filter(x => x !== null);
/* critical difference: 
   1.arrow function inherit the value of the this keyword from the environment in which they are defined rather than defining their
   own invocation context as functions defined in other ways .
   2.they don't have a prototype property so that they can't be the constructor function for new Class;
   3.only function declaration can be hoisted; so we can only invoke functions defined with arrow function after they are defined.  
*/

/* # 8.1.4 Nested Functions */
// square can access the parameters of the outer function
function hypotenuse(a, b) {
  function square(x) { return x * x };
  return Math.sqrt(square(a) + square(b))
}


/* # 8.2 Invoking Function */
// five ways to invoke functions :1.As functions ; 2.as methods ; 3. as constructor; 4.Indirectly through call, apply, or bind;
// 5. Implicitly, via js language features that don't appear like normal function invocation.

/* # 8.2.1 Function invocation */
printProps({ x: 1 });
let probability = factorial(5) / factorial(13);
/* Condition Invocation */
const strict = (function () { return !this; }());
/* Recursive functions and Stack */
// we should think about memory constraint.
// js interpreter needs to keep track of the execution contexts for all functions to know where to resume executing the other functions when it completes.
// we can imagine these execution contexts as a stack. when a function returns , it popped off the stack. 
// "Maximum call-stack size exceeded"

/* # 8.2.2 Method invocation */
// it is nothing more than a function that is stored in an object .
let o = { f: () => { } };
o.f(null, null);
// it's invoked like a method rather than a regular function.
// the difference between function invocation and the method is the invocation context. object is the function invocation context;it can refer the object by using this.
let calculator = { // An object literal
  operand1: 1,
  operand2: 1,
  add() {        // We're using method shorthand syntax for this function
    // Note the use of the this keyword to refer to the containing object.
    this.result = this.operand1 + this.operand2;
  }
};
calculator.add();  // A method invocation to compute 1+1.
calculator.result;  // => 2
/* other forms of method invocation */
// o["m"](x,y);
// a[0](z);
// customer.surname.toUpperCase(); // Invoke method on customer.surname
// f().m();                        // Invoke method m() on return value of f()
/* Method and the this keyword are the central to the oop paradigm ,there is an implicit argument that is the object itself */
let react = {
  setSize: () => { }
}
function setReactSize() { }
react.setSize(1, 2);
setReactSize(react, 1, 2);
/* Method Chaining */
// Run three asynchronous operations in sequence, handling errors.
function doStepOne() { return Promise.resolve(); }
function doStepTwo() { return Promise.resolve(); }
function doStepThree() { return Promise.resolve(); }
doStepOne().then(doStepTwo).then(doStepThree).catch();
// don't have to return a value ,return this.
// this is a keyword, not a variable, a property name . we are not allowed to assign it.
// the arrow function and the nested function don't inherit the this value of the containing function. if the nested function is invoked by method invocation,this is the object;
// if the nested function is invoked by function invocation , this is global this (undefined in the strict mode) ;
o = {                 // An object o.
  m: function () {       // Method m of the object.
    let self = this;  // Save the "this" value in a variable.
    this === o        // => true: "this" is the object o.
    f();              // Now call the helper function f().
    const abc = () => {
      this === o  // true, since arrow functions inherit this
    }
    abc();
    function f() {    // A nested function f
      this === o    // => false: "this" is global or undefined
      self === o    // => true: self is the outer "this" value.
    }
  }
};
o.m();
// this!== o ; is considered a flaw in the js .three workaround:  1.save the this to the self 2.use arrow method 3.use bind 
const f = (function () {
  this === o;
}).bind(this);
/* # 8.2.3 Constructor invocation */
/* omit the parentheses */
o = new Object();
o = new Object;
// if we use new constructor , the keyword this that represents the invocation context is the new Object rather than others. like new o.m(),this is not o;
// constructor functions don't normally have a return . if there is a value by return keywords that returns an object . this object becomes the result of the invocation expression,else if the null or primitive value ,it will be ignored.
function student(name) {
  this.name = name;
  return {
    age: 11
  }
}
let lxl = new student('lxl'); // {age:11}
function student(name) {
  this.name = name;
  return 11; // primitive value
}
lxl = new student('lxl'); // {name:"lxl"}
function student(name) {
  this.name = name;
  // return undefined
}
lxl = new student('lxl'); // {name:"lxl"}

/* # 8.2.4 indirect invocation */
// use call ,apply

/* # 8.2.5 implicit function invocation */
// 1. if an object has getters and setters ,get and set may invoke these functions.
// 2.when an object is used in a string context , it's toString will be invoked. Similarly, numeric Context ,valueOf is invoked.
// 3.when you loop over the elements of the iterable object, there are many functions are invoked.
// 4.A tagged template literal is a function invocation in disguise
// 5.Proxy objects have their behaviors completely controlled by the functions.


/* # 8.3 Function Arguments(实参 ) and Parameters(形参) */
// there is no test about the type checking or the number of the argument checking when the function is invoked;

/* # 8.3.1 Optional Parameters and Defaults */
// Append the names of the enumerable properties of object o to the
// array a, and return a.  If a is omitted, create and return a new array.
function getPropertyNames(o, a) {
  // if (a === undefined) a = [];  // If undefined, use a new array
  a = a || [];
  for (let property in o) a.push(property);
  return a;
}
// getPropertyNames() can be invoked with one or two arguments:
o = { x: 1 }, p = { y: 2, z: 3 };  // Two objects for testing
let a = getPropertyNames(o); // a == ["x"]; get o's properties in a new array
getPropertyNames(p, a);      // a == ["x","y","z"]; add p's properties to it
0 ?? 'ss'; //0
0 || 'ss'; //ss
function getOwnPropertyNames(o, a = []) {
  // do something;
}
// the parameter default expression are evaluated when the function is called not the defining. invoke then create everyTime;
const rectangle = (width, height = width ** 2) => ({ width, height })
rectangle(2); //{ width: 2, height: 4 }

/* # 8.3.2 Rest Parameters and Variable-Length Argument List */
// arbitrarily more arguments than parameters
function max(first = -Infinity, ...rest) {
  console.log(rest);
  let maxValue = first;
  for (let n of rest) {
    if (maxValue < rest[n]) maxValue = rest[n];
  }
  return maxValue
}
// the reset parameter must be the last.

/* # 8.3.3 The Arguments Object */
// Argument Object is introduced by ES6 , is an array-like object
function max(x) {
  let maxValue = -Infinity;
  arguments; //[Arguments] { '0': 10, '1': 2, '2': 2 }
  // Loop through the arguments, looking for, and remembering, the biggest.
  for (let i = 0; i < arguments.length; i++) {
    if (arguments[i] > maxValue) maxValue = arguments[i];
  }
  // Return the biggest
  return maxValue;
}
// we should avoid the argumentObject , because it is inefficient and hard to optimize; we can use ...args. in the strict mode , argument is an reserve word.

/* # 8.3.4 The Spread Operator for Function Calls */
let number = [2, 2, 2, 2, 2];
Math.max(...number);
// This function takes a function and returns a wrapped version
function timed(f) {
  return function (...args) {  // Collect args into a rest parameter array
    console.log(`Entering function ${f.name}`);
    let startTime = Date.now();
    try {
      // Pass all of our arguments to the wrapped function
      return f(...args);  // Spread the args back out again
    }
    finally {
      // Before we return the wrapped return value, print elapsed time.
      console.log(`Exiting ${f.name} after ${Date.now() - startTime}ms`);
    }
  };
}

// Compute the sum of the numbers between 1 and n by brute force
function benchmark(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) sum += i;
  return sum;
}

// Now invoke the timed version of that test function
timed(benchmark)(1000000) // => 500000500000; this is the sum of the numbers

/* # 8.3.5 Destructure Function Arguments into Parameters */
function vectorAdd([x1, y1], [x2, y2]) { // Unpack 2 arguments into 4 parameters
  return [x1 + x2, y1 + y2];
}
vectorAdd([1, 2], [3, 4])  // => [4,6]
// colon left is the property name ,right is the parameter name;
function vectorAdd(
  { x: x1, y: y1 }, // Unpack 1st object into x1 and y1 params
  { x: x2, y: y2 }  // Unpack 2nd object into x2 and y2 params
) {
  return { x: x1 + x2, y: y1 + y2 };
}
// default values with destructure parameters
function vectorMultiply({ x, y, z = 0 }, scalar) {
  return { x: x * scalar, y: y * scalar, z: z * scalar };
}
vectorMultiply({ x: 1, y: 2 }, 2)  // => {x: 2, y: 4, z: 0}
// when we have many parameters whose correct order is difficult to remember ,we can use the following way. in a word ,use object
function arraycopy({ from, to = from, n = from.length, fromIndex = 0, toIndex = 0 }) {
  let valuesToCopy = from.slice(fromIndex, fromIndex + n);
  to.splice(toIndex, 0, ...valuesToCopy);
  return to;
}
a = [1, 2, 3, 4, 5], b = [9, 8, 7, 6, 5];
arraycopy({ from: a, n: 3, to: b, toIndex: 4 }) // => [9,8,7,6,1,2,3,5]
function arraySpread([x, y, ...coords], ...rest) {
  return [x + y, ...rest, ...coords];  // Note: spread operator here
}
arraySpread([1, 2, 3, 4], 5, 6)   // => [3, 5, 6, 3, 4]
// Object spread
function vectorMultiply({ x, y, z = 0, ...props }, scalar) {
  return { x: x * scalar, y: y * scalar, z: z * scalar, ...props };
}
vectorMultiply({ x: 1, y: 2, w: -1 }, 2)  // => {x: 2, y: 4, z: 0, w: -1}
// we can do any destructure to essentially any depth
function drawCircle({ x, y, radius, color: [r, g, b] }) {
  // Not yet implemented
}

/* # 8.3.6 Arguments Types */
// there is no type checking in the js. now we have typeScript , 
// Return the sum of the elements an iterable object a.
// The elements of a must all be numbers. 
function sum1(a) {
  let total = 0;
  for (let element of a) { // Throws TypeError if a is not iterable
    if (typeof element !== "number") {
      throw new TypeError("sum(): elements must be numbers");
    }
    total += element;
  }
  return total;
}
sum1([1, 2, 3])    // => 6
// sum1(1, 2, 3);   // !TypeError: 1 is not iterable
// sum1([1, 2, "3"]); // !TypeError: element 2 is not a number

/* # 8.4 Function as Values */


