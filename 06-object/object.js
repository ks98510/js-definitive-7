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
log(Reflect.ownKeys(Date.prototype)) //[  'toLocaleDateString','toLocaleTimeString',Symbol(Symbol.toPrimitive)]

/* # 6.6.1 property enumeration order */
// eS6 formally defines the order in which the own properties of an object are enumerated. all preceding methods and JSON.stringfy 