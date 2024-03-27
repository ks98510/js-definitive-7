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
function ssquare(x) { return x ** 2 };
let s = ssquare;
ssquare(1);
s(1);
o = { square: () => { } };
a = [x => x ** 2, 1];
// We define some simple functions here
function add(x, y) { return x + y; }
function subtract(x, y) { return x - y; }
function multiply(x, y) { return x * y; }
function divide(x, y) { return x / y; }

// Here's a function that takes one of the preceding functions
// as an argument and invokes it on two operands
function operate(operator, operand1, operand2) {
  return operator(operand1, operand2);
}

// We could invoke this function like this to compute the value (2+3) + (4*5):
let i = operate(add, operate(add, 2, 3), operate(multiply, 4, 5));

// For the sake of the example, we implement the simple functions again,
// this time within an object literal;
const operators = {
  add: (x, y) => x + y,
  subtract: (x, y) => x - y,
  multiply: (x, y) => x * y,
  divide: (x, y) => x / y,
  pow: Math.pow  // This works for predefined functions too
};

// This function takes the name of an operator, looks up that operator
// in the object, and then invokes it on the supplied operands. Note
// the syntax used to invoke the operator function.
function operate2(operation, operand1, operand2) {
  if (typeof operators[operation] === "function") {
    return operators[operation](operand1, operand2);
  }
  else throw "unknown operator";
}

operate2("add", "hello", operate2("add", " ", "world")) // => "hello world"
operate2("pow", 10, 2)  // => 100

/* # 8.4.1 Defining your Own function property */
function uniqueInteger() {
  return uniqueInteger.counter++;
}
uniqueInteger.counter = 0;
uniqueInteger(); // 1
uniqueInteger(); // 2
function factorial(n) {
  if (Number.isInteger(n) && n > 0) {
    if (!(n in factorial)) {
      factorial[n] = n * factorial(n - 1)
    }
    return factorial[n]
  }
  else {
    return 1;
  }
}
factorial[1] = 1;


/* # 8.5 Function as NameSpace */
// if a function will create a new variable. you don't know if the variable is exist. we can use NameSpace.
function chunkNameSpace() {
  // chunk of code goes here
}
chunkNameSpace();
/* we can also use the immediately invoked function expression */
(function () { })();
/* wed define one or more function inside the namespace function using variables within that namespace , then pass them back out as the return value of function 
   .it is known as closure.
*/


/* # 8.6 closure */
/* Like most modern programming languages, JavaScript uses lexical scoping. This means that functions are executed using the variable scope 
   that was in effect when they were defined, not the variable scope that is in effect when they are invoked. In order to implement lexical scoping, 
   the internal state of a JavaScript function object must include not only the code of the function but also a reference to the scope in which the function
   definition appears. This combination of a function object and a scope (a set of variable bindings) in which the function’s variables are resolved 
   is called a closure in the computer science literature.
*/
/* 
  All the functions is closure.
*/
let scope = "global scope";
function checkScope() {
  // [globalContext,checkScopeContext]
  let scope = "local scope";
  // [globalContext,checkScope,fContext]
  function f() {
    return scope;
  }
  return f();
}
checkScope(); // => "local scope"
function checkScope() {
  let scope = "local scope";
  // [globalContext,checkScope,fContext]
  function f() {
    return scope;
  }
  return f;
}
checkScope()(); // => "local scope"
// remember the fundamental rule of the lexical scope : javascript are executed using the scope they are defined in.
// the nested function f() was defined in a scope where the variable scope was bound to the value "local scope"; that binding is still in effect when f is executed no matter where it is executed.
// let the counter to the private state.
uniqueInteger = ((function () {
  let counter = 0;
  return function () { return counter++ }
})());
uniqueInteger();
uniqueInteger.counter; // undefined
/* private variables */
function counter() {
  let n = 0;
  return {
    counter: function () { return n++ },
    reset: function () { n = 0; }
  }
}
let da = counter();
let c = counter();
c.counter(); // 0 
da.counter(); // 0
da.counter(); // 1;
// every invocations create a new scope and a new private variable within that scope. so they will not have no effect on the other.
// combine the closure with the property getter and setter.
function counter1(n) {
  return {
    get count() { return n++; },
    set count(m) {
      if (m > n) n = m;
    }
  }
}
c = counter1(1000);
console.log(c.count); // 1000
console.log(c.count); // 1001
c.count = 10055;
// we should recognize when closures inadvertently share access to a variable that they should not share
function constFunc(v) { return () => v };
let funcs = [];
for (var ii = 0; ii < 10; ii++) { funcs[ii] = constFunc(ii) }; // create many closures
console.log(funcs[5]()) // 5 
function constFuncs() {
  let funcs = [];
  for (var iz = 0; iz < 10; iz++) {
    funcs[iz] = () => iz;
  }
  return funcs
}
funcs = constFuncs();
console.log(funcs[5]()) // 10;
// create 10 closures adn defined in the same invocation of the function. so they share access to the variable iz. the scope associated with the closure is the "live";
// ES5常见的bug we can use the let and const create block scope every time.
function constFuncs() {
  let funcs = [];
  for (let iz = 0; iz < 10; iz++) {
    funcs[iz] = () => iz;
  }
  return funcs
}

funcs = constFuncs();
console.log(funcs[5]()) // 5;
function constFuncs() {
  let funcs = [];
  let i = 0;
  for (; i < 10; i++) {
    funcs[i] = () => i;
  }
  return funcs
}
funcs = constFuncs();
console.log(funcs[5]()) // 10; // 同样是在一个作用域所以每次共用i。
// another thing to remember when writing closure is that this is a js keyword not variable. arrow function inherit the this ,but function declaration not.
// we can use other ways. like bind or const self =this; or arrow function.


/* # 8.7 Function Property ,Methods ,Constructor */
/* Property: name,length,prototype. */
// Length : the length of the function is the number of the arguments ,if there is a rest argument ,it will be not counted to the length
function getFunLen(a, b, c) { };
getFunLen.length; //3
function getLenWithRest(a, b, ...c) { };
getLenWithRest.length; //2
// Name : read-only property
getFunLen.name; // getFunLen
(() => { }).name;  // ''
let getFunc = getFunLen;
getFunc.name; //getFun
const firstFunc = function () { };
firstFunc.name; // firstFunc the first name that we assign to the function at the first time.
const lxlFunc = firstFunc;
lxlFunc.name; // firstFunc
let bindFunc = getFunLen.bind(null)
bindFunc.name; // bound getFunction
// prototype ：all functions have prototype except the arrow function.
getFunLen.prototype; //{}

/* Methods:call/bind/apply toString */
// call and apply
// we can invoke a function as if it is a method ,the first argument is the invocation context .
getFunLen.apply({ x: 1 });
getFunLen.call({ x: 2 });
o = { x: 1 };
o.f = getFunLen;
o.f();
delete o.f;
// arrow function can't overridden with the call and apply methods. if you call either of those methods on an arrow function,they will ignore the first argument;
let arrowFunc = (x, y) => {
  this; //{} 
  x + y; //7
}
arrowFunc.call({ x: 123 }, 3, 4);
arrowFunc.apply({ x: 22 }, [3, 4]);
// prior of ES6 there is no spread operator , so we can use apply to alternative it .
let biggest = Math.max.apply(null, [1, 2, 3, , , 5]);
// Bind() 
// the primary purpose of the bind is to bind a function to an object. when you invoke bind, it return a function. and invoke the new Function ,all arguments will be passed to the original function.
function bindFun(y) {
  return this.x + y
};
o = { x: 'lxl' };
let g = bindFun.bind(o)
g(2) //lxl2
p = { x: "123", g };
p.g(2);// lxl2 not 1232
// except the first argument , the other arguments are bound to the this.it is called the currying.
let bsum = (x, y) => x + y;
let succ = bsum.bind(null, 1);
console.log(succ(2)); //3
console.log(succ(44)); //45
function bf(y, z) { return this.x + y + z };
g = bf.bind({ x: 1 }, 2);
g(3);
// the bound function's name that the function that bind() was called on , prefixed with bound "bound functioName"
g.bind({ x: 33 })(4) // 7 we can't rebind the this.
// ToString()
// typically, toString return the complete source code of the function. the built-in function return the [native code]
Object.toString.toString() //function toString() { [native code] }
// Constructor: Function
// the last argument is the function body ,the others are the parameter.
// the Function constructor create an anonymous function.
// Function allow the function can be created dynamically.
// In the loop, create function object every time ,but the function declaration only create once.
const cf = new Function('x', 'y', 'console.log(x+y);')
cf(1, 2); //3 
// the import feature is that the Function constructor doesn't the lexical scope is top-level .
scope = 'global';
function constructFunc() {
  let scope = "local";
  return new Function("let scope = '123';return scope") // scope is not defined
}
constructFunc()(); // 123  so it's not the global scope and the local scope ; it's the function body scope.


/* # 8.8 Functional Programming */

/* ## 8.8.1 Processing array with functions */
let data = [1, 1, 3, 5, 5];
let total = 0;
for (let i = 0; i < data.length; i++) total += data[i];
let mean = total / data.length;
total = 0;
for (let i = 0; i < data.length; i++) {
  let deviation = data[i] - mean;
  total += deviation * deviation;
}
let stddev = Math.sqrt(total / data.length - 1);
// use map and reduce 
const sum2 = (x, y) => x + y;
const square1 = x => Math.pow(x, 2);
data = [1, 1, 3, 4, 5];
mean = data.reduce(sum2) / data.length;
let deviations = data.map(x => x - mean);
stddev = Math.sqrt(deviations.map(square).reduce(sum2) / data.length - 1)

/* ## 8.8.2 Higher-Order Function */
// a function accept one or more functions and return  a new function.
function not(f) {
  return function (...args) {
    let result = f.apply(this, args);
    return !result
  }
}
const even = x => x % 2 === 0;
const odd = not(even);
[1, 2, 3, 5].every(odd); //true;
function compose(f, g) {
  return function (...args) {
    // We use call for f because we're passing a single value and
    // apply for g because we're passing an array of values.
    return f.call(this, g.apply(this, args));
  }
}
compose(square, sum)(2, 3); //25

/* ## 8.8.3 Partial Application of Functions */
function partialLeft(fn, ...outArguments) {
  return function (...innerArguments) {
    return fn.apply(this, [...innerArguments, ...outArguments])
  }
}
function partialRight(f, ...outerArgs) {
  return function (...innerArgs) {  // Return this function
    let args = [...innerArgs, ...outerArgs]; // Build the argument list
    return f.apply(this, args);              // Then invoke f with it
  };
}

function partial(f, ...outerArgs) {
  return function (...innerArgs) {
    let args = [...outerArgs];
    let innerIndex = 0;
    for (let i = 0; i < args.length; i++) {
      if (args[i] === undefined) args[i] = innerArgs[innerIndex++];
    }
    args.push(...innerArgs.slice(innerIndex));
    return f.apply(this, args);
  }
};
function ff(x, y, z) { return x * (y - z); };
// Notice how these three partial applications differ
partialLeft(ff, 2)(3, 4)         // => -2: Bind first argument: 2 * (3 - 4)
partialRight(ff, 2)(3, 4)        // =>  6: Bind last argument: 3 * (4 - 2)
partial(ff, undefined, 2)(3, 4)  // => -6: Bind middle argument: 3 * (2 - 4)
// memorize
function memorize(f) {
  const cache = new Map();
  return function (...args) {
    let key = args.length + args.join('+');
    if (cache.get(key)) return cache.get(key);
    else {
      let result = fn.apply(this, args);
      cache.set(key, result);
      return result
    }
  }
}
