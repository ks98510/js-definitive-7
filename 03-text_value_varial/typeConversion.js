// # type conversion
// javascript can convert the value whatever it's types is and  to the type whatever you want

// console.log(10 + "object") // 10object Number convert to a string
// console.log("7" * "6") // 42 Number string convert to a number
// console.log(1 - "x") // NaN
// console.log(1 - "x" + "Object") // NaNObject

// primitive2primitive

// other array convert to string : use join("") method
// console.log(["a", "b"] + 'abc')
// console.log(["a", "b"].join(','))
// the leading and failing space will be ignored
// console.log(" 10 " * 10)
// to see the detail: https://js.okten.cn/posts/ch3/

// Object2primitive is more complicated

// ## conversion and equality
// === == to test that whether two values are equal
// strict equality operator ===
// ==
// console.log(null == undefined)
// console.log("0" == 0)
// console.log(0 == false)
// console.log("0" == false)

// ## explicit conversion
// console.log(Number("3"));
// console.log(String(false));
// console.log(Boolean([]))
// console.log(String(["1", "a"]))
// console.log(Number(["2", "1"]))

// some operators perform implicit type conversions
// x + "" // String(x)
//   + x // Number(x)
// x - 0 // Number(x)
// !!x //Boolean(x) :Note double !
// Every value except null and undefined has toString function

// Number class accept optional argument that specify for the conversion
// let n = 21
// console.log(n.toString());
// console.log("0b" + n.toString(2)); // binary
// console.log("0o" + n.toString(8)) // octonary
// console.log("0x" + n.toString(16)) // hexagonal


// toFixed converts a number to a string with a specified number of digits after the decimal point
// toExponential converts a number to a string using exponential notation
// to precision converts a number to a string with ,如果有效位数少于整数位就用科学计数法，

// let f = 123456.789;
// console.log(f.toFixed(0)) // 123457
// console.log(f.toFixed(2)) // 123456.79
// console.log(f.toFixed(5)) // 123456.78900
// console.log(f.toExponential(1)) // 1.2e+5
// console.log(f.toExponential(4)) // 1.2346e+5
// console.log(f.toPrecision(4)) // 1.235e+5
// console.log(f.toPrecision(7)) //123456.8
// console.log(f.toPrecision(10)) // 123456.7890

// Number() only works on base-10 intergers
// parseInt() parseFloat()  they will both skip leading whitespace , parse as many numeric characters as they can , and ignore anything follows. if the first
// nonspace character is not part of a valid numeric literal , they return NaN
// console.log(parseInt("3 bi=lint mice")) // 3
// console.log(parseInt("3 45,6,,6,")) // 345
// console.log(parseInt("#22")) //NaN
// console.log(parseFloat("  3.14 meters")) // 3.14
// console.log(Number('3ss')) // NaN
// console.log(Number("0xFF")) // 255
// console.log(parseInt("0Xff"))  // 255
// console.log(parseFloat(".1")) // 0.1
// console.log(Number(".1"))
// console.log(parseInt(".1")) // NaN
// console.log(Number("ff")) //NaN
// console.log(parseInt("ff")) //NaN

// parseInt() accept an optional second argument that specific the radix
// console.log(parseInt("11", 2)) // "1 * 2 + 1"
// console.log(parseInt("11", 16)) // 1*16+1
// console.log(parseInt("0xff", 16)) //255
// console.log(parseInt("ff", 16)) // 255


// ## object to primitive conversion obscure
// three fundamental algorithms
// prefer-String
// prefer-number
// no-prefer  except Date use Prefer-string , all other use prefer-number

// Object to boolean is trivial , all object convert to true
// Object to string conversion
// + 转化为primitive 后如果有一个类型是字符串就进行concatenate, 否则就转化number
// == !=  use no-prefer algorithm
// < <= >

// all object inherit valueOf() adn toString()
// console.log({ a: 1 }.toString()) //[object Object]
// console.log([1, 2, 3].toString()) // 1,2,3
// console.log(function (x) { return console.log(x) }.toString()) // function(x){return console.log(x)}
// console.log(/\d+/g.toString()) // /\d+/g
// console.log(new Date().toString()) // Mon May 11 2020 14:36:51 GMT+0800 (GMT+08:00)
// valueof return itemSelf
// console.log(new Date().valueOf()) // 1589212611000
// prefer-String : first we try the toString() method ,if the method is defined and return a primitive value , then we use that primitive value. then we use valueOf(),then fail with typeError

// prefer-number : first valueOf() second toString()

// no-prefer : Date use prefer-string , all other use prefer-number
// object to string
// object to boolean
// object to number : use algorithm then get a primitive value then use primitive to primitive

// so the prefer-number explains why the empty array can convert to 0 and single-element array can be converted to numbers\
// console.log([].valueOf())
// [].valueOf() // [] is not a primitive value
// [].toString() // '' is a primitive value
// '' => 0
// console.log(Object.prototype.toString.call(([1].valueOf()))) // object Array
// [1].toString(); // "1"
// "1" => 1

// ## variable declaration and assignment
// const : permanent   let : variable

// ## declaration let and constant
// let i;
// let sum;
// we can also declare multiple variables in a singleline.
// let i, sum;
let msg = "hello";
let i = 0, k = 1, r = 10;
let x = 2, y = x ** 2; // initializers can use previously declared variables.

// we must initialize the constant when we declare the variable with constant syntax.

// const : something that are fundamentally unchanging ; variables  don't actually  change as our program runs.
// const a ; // Error  we common use capital letters to distinguish them from variables
const H0 = 73;

// let:  in loop for for/in  we can also use const to declare the loop variable in the duration of one loop iteration.
let obj = { a: 1 }
for (const key in obj) console.log(key)

// variable and constant scope
// the scope is the region of your program source in which it is defined.

// repeated declaration is a syntax error.
// let a = 1;
// let a = 2; // SyntaxError
// const x = 1;
// if (x === 1) {
//   let x = 2
// }

// there is no type associated with js's variable declarations.
// so it's perfectly legal to assign a number to a variable and then later assign a string to it.
let sm = 10;
sm = 's';
console.log(sm)


// ## variable declaration with var;
// in version of ES6 , there is no way to declare a constant . the syntax of var is the same as let.
var data = [], count = data.length;

// !! the differences between var and let
// 1. var don't have block scope;
// 2. if you use var to declare the variable , it declare a global variable that can be delete by delete operator. lick globalthis.xx ;
// 3. it is legal to declare the same variable multiple times with var;
// 4. hoisted  / lift up  to the enclosing function 

// in strict mode , if you attempt to use an undeclared variable, you'll get a reference Error.
// console.log(lxl); // ReferenceError: Cannot access 'lxl' before initialization
// let lxl;

// if you don't declare a variable with let、const、var , you will end up with a global variable, no matter how nested the function is. one of the best reason to using strict mode.
// (() => {
//   c = 123;
//   console.log(c)
// })()
// console.log(c)

// !! it 's seems that we define some properties of the global object , however , they can't be deleted with delete operator.


//  ## destructing assignment
let [f, s] = [1, 2];
[f, s] = [f + 1, s + 1];
// console.log([f, s])
// Math.hypot()
function toPolar(x, y) {
  return [Math.sqrt(x ** 2 + y ** 2), Math.atan(y)]
}
let [ra, theta] = toPolar(1.0, 1.0)
// console.log(ra,theta)

let sample = { x: 1, y: 1 };
for (const [name, value] of Object.entries(sample)) {
  console.log(name, value)
}

// we can use extra comma to skip certain value on the right;
let [, b, , c] = [1, 2, 3, 4]
console.log(b, c)

// we can use three dots to collect all unused or remaining value into a single variable.
let [a, ...rest] = [1, 2, 3, 4, 5, 6]; // rest = [3, 4, 5, 6]

// destructuring assignment can also be used with nested arrays.
let [a1, [b1, c1]] = [1, [2, 3], 3] // a1 = 1 b1 = 2 c1 = 3

// it doesn't actually require an array . you can use any iterable object..
let [first, ...other] = 'hello'
console.log(first, other)

// object
// let transparent = {r: 0.0, g: 0.0, b: 0.0, a: 1.0}; // A RGBA color
// let {r, g, b} = transparent;  // r == 0.0; g == 0.0; b == 0.0

//  global Function 
const { sqrt, pow, ceil, floor, abs } = Math

let transparent = {r: 0.0, g: 0.0, b: 0.0, a: 1.0}; // A RGBA color
let {r, g, b} = transparent;  // r == 0.0; g == 0.0; b == 0.0
