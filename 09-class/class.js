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
  static parse(s) {
    let matches = s.match(/^\((\d+)\.\.\.(\d+)\)$/);
    if (!matches) {
      throw new TypeError("can't");
    }
    return new Range(parseInt(matches[1]), parseInt(matches[2]));
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
let sr = Span.parse("(1...10)");
// sr.parse(); // TypeError is not a function
// static method can onl be used through the constructor. so it almost never make sense to use this keyword;

/* ## 9.3.2 Getters,Setters,and Other Method Forms */

/* ## 9.3.3 Public Private ,and Static Fields */
// class Buffer {
//   constructor() {
//     this.size = 0;
//     this.capacity = 4096;
//     this.buffer = new Uint8Array(this.capacity)
//   }
// }
// If we wanted this static field to be accessible only within the class, we could make it private using a name like #pattern.
// if you want the size is a read-only field ,use getter function.
class Buffer {
  #size = 0;
  get size() { return this.#size }
  capacity = 4096;
  buffer = new Uint8Array(this.capacity);
  static #interRangePattern = 'inter'
}
const buffer = new Buffer(); // 没有size属性 因为用了#
buffer.size = 10;
buffer.size; // 0;
// if we want to add a new field to the class, we can use the static field.
Buffer;

/* ## 9.3.4 Complex Number Class(复数) */
class Complex {
  constructor(real, imaginary) {
    this.r = real;
    this.i = imaginary;
    this.name = "lxl";
    console.log('complex', new.target)
  }
  // instance methods
  plus(that) {
    return new Complex(this.r + that.r, this.i + that.i)
  }
  // class methods
  static sum(c, b) { return c.plus(b) }
  // instance getters
  get real() { return this.r; }
  get imaginary() { return this.i; }
  // toString function
  toString() {
    return this.r + "+" + this.i + "e"
  }
}
// some class field predefined 
Complex.ZERO = new Complex(0, 0);
Complex.ONE = new Complex(1, 0);

c = new Complex(2, 3)
d = new Complex(c.i, c.r); // 3,2
c.plus(d).toString() // 5+5e
c.real; //2
Complex.sum(c, d); // Complex{r:5,i:5}
Complex.ZERO.toString() //0+0e


/* # 9.4 Adding Methods to Existing Classes */
// js's prototype-based inheritance mechanism is dynamic : that means :an object inherited the properties from the prototype , even if the properties has changed after the object is created.
Complex.prototype.conj = function () { return new Complex(this.r, -this.i) }
// the build-in classes is also like this.
if (!String.prototype.startswith) {
  String.prototype.startswith = function (prefix) {
    return this.indexOf(prefix) === 0;
  }
}
Number.prototype.times = function (f, context) {
  let n = this.valueOf();
  for (let i = 0; i < n; i++) f.call(context, i)
};
// we can use Object.defineProperty() to add an un-enumerable property to an object instead of Object.prototype

/* # 9.5 subClasses */

/* ## 9.5.1 Subclasses and Prototypes */
function Nspan(start, span) {
  if (span > 0) {
    this.from = start;
    this.end = start + span;
  }
  else {
    this.to = start;
    this.end = start + span;
  }
}
// ensure the Nspan inherit all the properties from the Range prototype;
Nspan.prototype = Object.create(Range.prototype);
// we don't want to inherit the constructor of the Range prototype,
Nspan.prototype.constructor = Nspan;
// Defining own toString();
Nspan.prototype.toString = function () {
  return `${this.to}`
}
// note that Nspan have the same initialization like Range and we don't need to invoke the superclass Range , A
// robust subclassing mechanism needs to allow classes to invoke the methods and constructor of their superclass

/* ## 9.5.2 Subclassing with extend and super */
class EZarray extends Array {
  get first() { return this[0]; }
  get last() { return this[this.length - 1]; }
}
// not only the instance methods and the constructor function.
let a = new EZarray();
console.log(a instanceof EZarray); //true;
console.log(a instanceof Array); //true;
a.push(1, 2, 3, 4);
console.log(a.last);//4
console.log(
  EZarray.isArray(a) // true;
)
// console.log(Array.prototype.isPrototypeOf(EZarray.prototype)) // true
// console.log(Array.isPrototypeOf(EZarray)) //true;

class SubClass extends Complex {
  constructor(real, imaginary, type) {
    super(real, imaginary);
  }
  // if there is implicit constructor, it will automatically invoke the super(); but if there is a constructor, it must have super();
}
let sub = new SubClass(1, 2, 'ss');
// more complex class using super()
class TypeMap extends Map {
  constructor(keyType, valueType, entries) {
    new.target === TypeMap // true 
    if (entries) {
      for (let [k, v] of entries) {
        if (typeof k !== keyType || typeof v !== valueType) {
          throw new TypeError('type checking does not pass')
        }
      }
    }
    super(entries);
    this.keyType = keyType;
    this.valueType = valueType;
  }
  set(key, value) {
    // note the super.set
    // console.log(super.entries) the super is like this
    return super.set(key, value)
  }
}
let typeMap = new TypeMap()
typeMap.set(1, 2)
// Super()
// 1.must use super if you have a constructor in the class that you are extending
// 2.if you don't define a constructor , super will be automatically defined for you using the values whatever you passed
// 3.you may not use the this keywords, before the invoking super.
// 4.the new.target in undefined in the function that are invoked without the new keyword ,but in the constructor function .it is the reference to the constructor that was invoked.
// override the superclass function does't need to invoke the superclass function.
// we can use #keyType to avoid subvert the private field.

/* # 9.5.3 Delegation instead of Inheritance */
class Histogram {
  constructor() { this.map = new Map(); }
  count(key) { return this.map.get(key) || 0; }
  has(key) { return this.count(key) > 0; }
  get size() { return this.map.size; }
  add(key) { this.map.set(key, this.count(key) + 1); }
  delete(key) {
    let count = this.count(key);
    if (count === 1) {
      this.map.delete(key);
    } else if (count > 1) {
      this.map.set(key, count - 1);
    }
  }
  [Symbol.iterator]() { return this.map.keys(); }
  keys() { return this.map.keys(); }
  values() { return this.map.values(); }
  entries() { return this.map.entries(); }
}

/* # 9.5.4 Class Hierarchies and Abstract Classes */
class AbstractSet {
  has(x) { throw new Error("Abstract method"); }
}
class NotSet extends AbstractSet {
  constructor(set) {
    super();
    this.set = set;
  }
  has(key) { return this.set.has(key); }
  toString() { return this.set.toString(); }
}
