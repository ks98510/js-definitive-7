// an object is a composite value : it aggregates multiple values. and allows you to store and retrieve them . 
// in addition to maintaining its own set of properties, an object also inherits the properties of another object ,known as its "prototype".
// a property has a name and a value, the name may the string ,empty string (or Symbol) ,but no object has the same two properties with the same name
// the value may be any value, or a getter/setter function  

// in addition to its name and value, each property has three property attributes
/* 
  1.the writable attribute specifies whether the property can be set;
  2.the enumerable attribute specifies whether the property name is returned by a for/in loop;
  3.The configurable attribute specifies whether the property can be deleted and whether its attributes can be altered.
*/
// many built-in objects has read-only , non-enumerable, and non-configurable.

/* # 6.2 create object */
let obj = {};
let cObj = Object.create({});
let empty = {};
let point = { x: 0 };
let p2 = { x: point.x };
let book = {
  "main title": "Js",
  "sub-title": "the definitive Guide",
  for: "all audiences",
  author: {
    firstname: "",
    lastName: "", // comma
  }
}
let o = new Object();
let a = new Array();

/* prototype */
// Almost every JavaScript object has a second JavaScript object associated with it. This second object is known as a prototype, and the first object inherits properties from the prototype.
// created by object literals have the same prototype object , new keyword 创建的 prototype 是 constructor function prototype
// new Array() = > Array.prototype
// new Date() => Date.prototype
// Remember: almost all objects have a prototype, but only a relatively small number of objects have a prototype property. It is these objects with prototype properties that define the prototypes for all the other objects.
// Object.prototype is one of the rare object that has no prototype
console.log(Object.prototype.prototype) //undefined
// new Date() inherits properties from both Date.prototype and Object.prototype , this linked series of prototype objects is called the prototype chain 

/* # 6.2.4 object.create() */
// use the first argument as the prototype of that object
let o1 = Object.create({ x: 1, y: 1 });
o1.x + o1.y;
let nullO = Object.create(null); // there is no basic methods like toString(); no inherit anything
// if you want to create an ordinary empty object , You can pass the Object.prototype
let o3 = Object.create(Object.prototype);
// Object.create(); //TypeError : Object prototype may only be an Object or null
// Object.create has an advanced feature by second parameter.
//Object.create() 其中一个用途是预防对象无意间（非恶意地）被无法支配的库函数篡改。可以创建一个继承它的对象来传递给函数，而不是将其直接传递给函数。当函数读取继承对象的属性时，实际上读取的是继承来的值。如果给继承对象的属性赋值，则这些属性只会影响这个继承对象自身，而不是原始对象：
//One use for Object.create() is when you want to guard against unintended (but nonmalicious) modification of an object by a library function that you don’t have control over. Instead of passing the object directly to the function, you can pass an object that inherits from it. If the function reads properties of that object, it will see the inherited values. If it sets properties, however, those writes will not affect the original object.
let so = { x: "don't modify this value" };
// library.function(Object.create(so)); // guard against accidental modifications

/* # 6.3 querying and setting properties */
let author = book.author;
let name = author.surname;
let title = book["main title"];
book.edition = 7;
book["main title"] = 'ECMAScript';
book["1"] = 'string 1';
// console.log(book[1]) //string 1;

/* # 6.3.1 object as associated array(作为关联数组的object) */
// Object.property === Object["property"];

let addr = "";
// initialize testing increment
/* for (let i = 0; i < 4; i++) {
  addr += customer[`address${i}`] + '\n';
}
 */
for (let key in { a: 1 }) {
}

/* # 6.3.2 inheritance */
// object has "own property" and they also inherit some properties from its prototype Object.
// if i query the x in the object o , o doesn't have the "own property" x, the property object of o is queried for the property x .if prototype object doesn't have "own property" x, the property object of prototype object is queried for the property x.",but has a prototype itself,the query is performed on the prototype of the prototype object,
// this continue until the property x is found or until the prototype object with a null prototype . the prototype attribute of an object create a chain or linked list from which properties are inherited

let no = {};  // inherited from the object prototype;
no.x = 1;
let p = Object.create(no); // p inherits from the no object and the Object prototype.
p.y = 2;
let q = Object.create(p);  // q inherits from p , no , object prototype;
q.z = 3;
let f = q.toString(); // toString is inherited from Object.prototype;
q.x = 123; // 如果没有"own property" 重新赋值的时候就会覆盖inherited value 
no.x = 222;
// console.log(no.x, p.x, q.x); //222，222,123
// console.log(q.x + q.y);  // 3  x is inherited from no , y is inherited from p;


// 原型链继承只和query有关系，和assign 无关 只有查询时候才会体现 so it allow  programmer to override inherited properties 
// 属性赋值只检查是否允许赋值。
let unitCircle = { r: 1 };
let c = Object.create(unitCircle);
c.x = 1; c.y = 1;
c.r = 2;
console.log(unitCircle.r); //1 the prototype is not affected


// there is an exception when property assignment; if the property is an accessor property with a setter method.
//属性赋值要么失败，要么创建一个属性，要么在原始对象中设置属性。但有一个例外，如果 o 继承自属性 x，而这个属性是一个具有 setter 方法的存取器属性（参照 §6.10.6），
//那么这时将调用 setter 方法而不是给 o 创建一个属性 x。需要注意的是，setter 方法是由对象 o 调用的，而不是定义这个属性的原型对象调用的。因此如果 setter 方法定义任意属性，这个操作只是针对 o 本身，并不会修改原型链。


// /* # 6.3.3 property access error */
// it is an error when we attempt to query a property of an object than does not exist. in a short word , if the lefthand of the . is a undefined or null. fail occurs.
// let len = book.subtitle.abc; //TypeError: Cannot read property 'abc' of undefined 
/* how to guard against this error */
let surname = undefined;
if (book) {
  if (book.author) {
    surname = book.author.surname;
  }
}
surname = book && book.author && book.author.surname;
surname = book?.author?.surname; // short-circuiting 
console.log(null?.abc); // if left-hand or ? is null or undefined; return undefined
// intuitive but difficult to express concisely. 
/* 
  1.o has an own property p that is read-only: it is not possible to set read-only properties.
  2.o has an inherited property p that is read-only: it is not possible to hide an inherited read-only property with an own property of the same name.
  3.o does not have an own property p; o does not inherit a property p with a setter method, and o’s extensible attribute (see §14.2) is false. Since p does not already exist in o, and if there is no setter method to call, then p must be added to o. But if o is not extensible, then no new properties can be defined on it.
*/

/* # 6.4 deleting properties */
delete book.author;
delete book["main title"];
// the delete operator can only delete the own property , not inherited property(we must delete it from where it 's defined. Doing this affects object that inherit from the prototype.)
const dO = { x: 1 };
delete dO.x; //true 
delete dO.toString //true
console.log(delete dO.toArray) // true
//delete does not remove properties that have a configurable attribute of false. // no-configurable 不能delete

// In strict mode, all these deletions throw TypeError instead of returning false
delete Object.prototype // => false: property is non-configurable
var x = 1;              // Declare a global variable
delete globalThis.x     // => false: can't delete this property
// function f() {}         // Declare a global function
// delete globalThis.f     // => false: can't delete this property either
globalThis.num = 123;
delete num; // we can omit the globalThis in no-strict mode;

/* # 6.5 testing properties */

let testObj = { x: 1 };
function log(...argument) {
  console.log(...argument)
}

log("x" in testObj);  //true;
log("y" in testObj); //false;
log("toString" in testObj) // true
log(toString in testObj); // false
/* hasOwnProperty */
log(testObj.hasOwnProperty("x")); // true;
log(testObj.hasOwnProperty("y")); //false
log(testObj.hasOwnProperty("toString")) // false toString is an inherited property
/* propertyIsEnumerable return true only if the property is enumerable and "own property" */
log(testObj.propertyIsEnumerable("x")); // true;
log(Object.prototype.propertyIsEnumerable("toString")) // false no enumerable
/* !== */
testObj.x !== undefined;
log(
  testObj.toString !== undefined
)  // true;
/* in operator can distinguish between properties that don't exist and that exist but have been set to undefined */
let inObj = { x: undefined };
"x" in inObj; //true;
inObj.x !== undefined; // false
"y" in inObj; //false
inObj.y !== undefined;// false
delete inObj.x;
"x" in inObj; // false

/* # 6.6 enumerating properties */
/* for/in each enumerable property(own or inherited) , built-in methods that object inherit from Object.prototype will be enumerated,but the 
properties that your code adds to object are enumerable by default.
*/
let enumObj = { x: 1, y: 2, z: 3 }; // three enumerable properties
o.propertyIsEnumerable("toString"); // false: not enumerable
for (let p in enumObj) {
  p;// x,y,z
}
/* to guard against enumerating the inherited properties */
for (let p in enumObj) {
  if (!enumObj.hasOwnProperty(p)) continue; // skip inherited properties 
}
for (let p in enumObj) {
  if (typeof enumObj[p] === 'function') continue;
}
/* As an alternative to using a for/in loop, it is often easier to get an array of property names for an object and then loop through that array with a for/of loop. */
/* Object.keys:exclude inherited、non-enumerable、Symbol properties */
Object.keys(enumObj); // ["x", "y", "z"]
/* Object.getOwnPropertyNames:same lick Object.keys ,but return the name of un-enumerable properties,as long as their name is String*/
log(Object.getOwnPropertyNames(enumObj)) // ["x", "y", "z"]
/* Object.getOwnPropertySymbols: return the name of Symbol properties */
log(Object.getOwnPropertySymbols(Date.prototype));//[ Symbol(Symbol.toPrimitive) ]
/* Reflect.ownKeys(): all own properties names,both enumerable and non-enumerable,including Symbol properties */
Reflect.ownKeys(Date.prototype) //[  'toLocaleDateString','toLocaleTimeString',Symbol(Symbol.toPrimitive)]

/* # 6.6.1 property enumeration order */
// eS6 formally defines the order in which the own properties of an object are enumerated. all preceding methods and JSON.stringfy 
/* 
  1.firstly, list the string properties whose names are non-negative integers in numeric order 
  2.list all remaining properties with string names
  3.symbol
*/
/* for/in */

/* # 6.7 extending Object */
let target = { x: 1, y: 1, z: 1 }, source = { y: 2, z: 3 };
for (let key of Object.keys(source)) {
  target[key] = source[key];
}
target;
/* Object.assign */
// Object.assign copies properties with ordinary property get and set operations.
log(Object.assign(target, source));// { x: 1, y: 2, z: 3 }
log(Object.assign({}, target, source)) // { x: 1, y: 2, z: 3 }
let n = { ...target, ...source };

/* 6.8 serializing objects string=>object  object=>string*/
let sero = { x: 1, y: { z: [false, null, undefined, NaN, -Infinity, Infinity] } }; // Define a test object
// log(JSON.stringify(sero));   // s == '{"x":1,"y":{"z":[false,null,""]}}'
// log(JSON.parse(JSON.stringify(sero)));       // p == {x: 1, y: {z: [false, null, ""]}}
// JSON javaScript Object Notation
// NaN , Infinity, -Infinity, and undefined are  serialized to null
// Date Object are serialized to ISO-formatted date strings,but JSON.parse leaves these in string.
// function ,RegExp,Error objects and the undefined value can't be serialized or restored.
let special = { a: function () { 123 }, b: new RegExp('.*'), d: undefined }
log(JSON.stringify(special));  // {"b":{},"c":{}} 对于不能序列化的属性，JSON.stringify 会忽略它们。
// JSON.stringify JSON.parse 都可以接收第二个实参，通过传入需要序列化的列表来自定义
/* 第二个参数replace 可以是(key,value)=> ,也可以是数组[] */
JSON.stringify(special, (key, value) => {
  log(key, value);
  return value
})
JSON.stringify(special, ['a', 'b', 'c'])
/* 第三个参数space,如果是数字的话就代表是空行缩进 ，如果是字符串的话，使用该字符串作为缩进字符*/
const tobj = {
  name: "John",
  age: 30,
  city: "New York"
};
const jsonString = JSON.stringify(tobj, null, "lxl"); // 使用两个空格进行缩进
jsonString;

/* # 6.9 Object methods */
/* # 6.9.1 toString() */
let s = { x: 1, y: 1 };
s.toString() // "[object Object]"
// many classes define their own version of toString(),like array ,function.
let toFunc = {
  x: 1,
  y: 2,
  toString: function () { return `(${this.x}, ${this.y})`; }
};
toFunc.toString(); //(1,2)
/* # 6.9.2 toLocalString():return a localized string representation of the object */
point = {
  x: 1000,
  y: 2000,
  toString: function () { return `(${this.x}, ${this.y})`; },
  toLocaleString: function () {
    return `(${this.x.toLocaleString()}, ${this.y.toLocaleString()})`;
  }
};
point.toString()        // => "(1000, 2000)"
log(point.toLocaleString()) // => "(1,000, 2,000)": note thousands separators
/* # 6.9.3 valueOf():to convert to primitive value */
point = {
  x: 3,
  y: 4,
  valueOf: function () { return Math.hypot(this.x, this.y); }
};
Number(point)  // => 5: valueOf() is used for conversions to numbers
point > 4      // => true
point > 5      // => false
point < 6      // => true
/* # 6.9.4 toJSON():Object.prototype 中并没有 toJSON方法.但是JSON.stringfy 会调用toJSON */
point = {
  x: 1,
  y: 2,
  toString: function () { return `(${this.x}, ${this.y})`; },
  toJSON: function () { return this.toString(); }
}
log(JSON.stringify(point)) //"(1,2)"

/* # 6.10 extended Object literal syntax */
/* # 6.10.1 shorthand properties */
x = 1, y = 2;
o = {
  x, y
}
/* # 6.10.2 computed property names */
const PROPERTY_NAME = 'P1';
function computePropertyName() { return "p" + 2; }
o[PROPERTY_NAME] = 1;
o = {
  [PROPERTY_NAME]: 1,
  [computePropertyName()]: 2
}
/* # 6.10.3 symbol as property names */
// symbol is a primitive value , not a constructor,the point of symbol is not security ,but to define a safe extension mechanism for object.
const extension = Symbol("my extension symbol");
o = {
  [extension]: {}
}
o[extension].x = 0;
/* # 6.10.4 spread operator */
let position = { x: 0, y: 0 };
let dimensions = { width: 100, height: 75 };
let rect = { ...position, ...dimensions };
o = { x: 1 };
p = { x: 0, ...o };
log(p.x); //1
/* ...operator can only spread out the own properties , not any inherited ones */
o = Object.create({ x: 1 });
p = { ...o }
log(p); // {}
/* ... operator is inefficient for large objects */
/* # 6.10.5  shorthand methods*/
let square = {
  area: function () { return this.side ** 2 },
  side: 2
}
square = {
  area() { return this.side * this.side },
  side: 10
}
const METHOD_NAME = 'M';
const symbol = Symbol('');
let weirdMethods = {
  [METHOD_NAME](x) { return x + 1 },
  [symbol](x) { return x + 2 },
  "method With Spaces"(x) { return x + 3 }
}
weirdMethods["method With Spaces"](1)  // => 2
weirdMethods[METHOD_NAME](1)           // => 3
weirdMethods[symbol](1)                // => 4
// in order to make an object iterable,you need to define a method named Symbol.iterator
/* # 6.10.6 property getters and setters */
/* if property has only getter ,is a read-only , if only has a setter it's a write-only property */
/* o = {
  dataProps: value,
  get accessorProp() { return this.dataProps },
  set accessorProp() { return this.dataProps = value }
} */
p = {
  x: 1.0,
  y: 1.0,
  // r is a read-write accessor property with getter and setter.
  // Don't forget to put a comma after accessor methods.
  get r() { return Math.hypot(this.x, this.y); },
  set r(newvalue) {
    let oldvalue = Math.hypot(this.x, this.y);
    let ratio = newvalue / oldvalue;
    this.x *= ratio;
    this.y *= ratio;
  },
  get theta() { return Math.atan2(this.y, this.x) }
}
// getter and setter accessor properties are inherited.
log(p.r) // 1.4142135623730951
log(p.theta);
q = Object.create(p);
q.x = 3, q.y = 4;
log(q.r);
// This object generates strictly increasing serial numbers
const serialnum = {
  // This data property holds the next serial number.
  // The _ in the property name hints that it is for internal use only.
  _n: 0,

  // Return the current value and increment it
  get next() { return this._n++; },

  // Set a new value of n, but only if it is larger than current
  set next(n) {
    if (n > this._n) this._n = n;
    else throw new Error("serial number can only be set to a larger value");
  }
};
serialnum.next = 10;    // Set the starting serial number
serialnum.next          // => 10
serialnum.next          // => 11: different value each time we get next
log(serialnum._n)
// This object has accessor properties that return random numbers.
// The expression "random.octet", for example, yields a random number
// between 0 and 255 each time it is evaluated.
const random = {
  get octet() { return Math.floor(Math.random() * 256); },
  get uint16() { return Math.floor(Math.random() * 65536); },
  get int16() { return Math.floor(Math.random() * 65536) - 32768; }
};
// computed应该就是利用这个特点吧