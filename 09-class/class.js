/* # 9.1 Classes and Prototypes */
// the prototype is the central feature of the Class.
// a simple js class
function range(from, to) {
  let r = Object.create(range.methods);
  r.from = from;
  r.to = to;
  return r;
}
// This prototype object defines methods inherited by all range objects.
range.methods = {
  // Return true if x is in the range, false otherwise
  // This method works for textual and Date ranges as well as numeric.
  includes(x) { return this.from <= x && x <= this.to; },
  // A generator function that makes instances of the class iterable.
  // Note that it only works for numeric ranges.
  *[Symbol.iterator]() {
    // for (let i = 0; i < 10; i++) yield i + 100;
    for (let x = Math.ceil(this.from); x <= this.to; x++) yield x;
  },
  // Return a string representation of the range
  toString() { return "(" + this.from + "..." + this.to + ")"; }
};
let r = range(1, 3);
r.includes(2); //true;
r.toString(); //(1...3);
[...r]; //[1,2,3]


/* # 9.2 Classes and Constructors */
// though all object have the prototype, a few objects have a prototype property, function is .
// use class syntax before ES6 ; they use the capitalized name convention to distinguish functions from constructors.
function Range(from, to) {
  this.from = from;
  this.to = to;
}
Range.prototype = {
  includes: function (x) { return this.from <= x && x <= this.to },
  [Symbol.iterator]: function* () {
    for (let x = Math.ceil(this.from); x <= this.to; x++) yield x;
  },
  toString: function () { return "(" + this.from + "..." + this.to + ")" }
}
r = new Range(1, 2);
r.includes(2);
r.toString();
[...r];
// constructor and new.target which is used to specify whether the function is called with new or not.
function C() {
  // new.target undefined; it can only be used in old -fashioned ways. Classes create with the class keyword don't allow the function to be invoked without new.
  if (!new.target) return new C();
}
C();
// the different from the preceding examples is that the constructor is arbitrary and mandatory for the function.prototype.when Range() it automatically uses the prototype as the prototype of the object.
// we can't use the arrow function. they inherit the this from the place where they are defined. so they can't setting it based on the object.
// fortunately , Es6 does't allow.

/* ## 9.2.1 Constructors ,Class Identity and instanceof  */
// constructor as the right-hand of the instanceof operator to test whether r is the instance of Range. 
r instanceof Range;
// if r inherit the Range.prototype, The inheritance need not be direct: if o inherits from an object that inherits from an object that inherits from C.prototype, the expression will still evaluate to true.
function Strange() { }
Strange.prototype = Range.prototype;
console.log(new Strange() instanceof Range); // true;
function lxl() { }
let obj = {};
obj instanceof lxl; // it doesn't check the lxl whether it is a constructor function(defined by keyword class);
// use isPrototypeOf() without a constructor function.
range.methods.isPrototypeOf(r); // true

/* ## 9.2.2 The Constructor Property */
// every regular functions can be a constructor function (except arrow,async,generator function) , so function automatically has a prototype property
// The value of this property is an object that has a single, non-enumerable constructor property. The value of the constructor property is the function object:
// let F = function () { };
function F() { };
let p = F.prototype;
let c = p.constructor;
console.log(c === F); //true;
// 上面的话就是代表着 function = function.prototype.constructor;
// The existence of this predefined prototype object with its constructor property means that objects typically inherit a constructor property that refers to their constructor.
let o = new F();
o.constructor === F; //true;
Range.prototype = {
  constructor: Range,
}
Range.prototype.includes = () => { }

/* # 9.3 Classes with the class keyWord */
class cRange {
  constructor(from, to) {
    // unique to the object
    this.from = from;
    this.to = to;
  }
  includes(x) { };
  *[Symbol.iterator]() { };
  toString() { };
}
let cr = new cRange(1, 3);
cr.includes;
cr.toString();
[...cr];
// inherit or create a subclass object use extends
class Span extends cRange {
  constructor(start, length) {
    if (length > 0) {
      super(start, start + length);
    }
    else {
      super(start + length, start);
    }
  }
}
// two forms of class declaration
let square = function (x) { return x * x }
square(3);
let Square = class { constructor(x) { this.area = x * x } }
new Square(3).area;
// all the code within the body of the class is implicitly in strict mode.
// class declaration is not hoisted.

/* ## 9.3.1 Static Methods */
