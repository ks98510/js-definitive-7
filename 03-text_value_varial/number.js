// # value、type、variable

// primitive type: number string boolean null undefined Symbol
// object type: array function Date RegExp Map Set Typed-Array Error 
// Everything that is not  a primitive type is an object.
// there is a special object , the global object

// programming style : object-oriented  a.sort() ; sort(a) OOP
// only null and undefined are the only values that methods can be invoked on.

// ## Number
// 64-bit floating-point to represent number 1
// js can recognize 10进制，十六进制，8进制，2进制等等

// ### Integer literals
0
3
// hexadecimal（base-16） 0x/0X 开头 后跟0-9 a-f A-F
0xff       // => 255: (15*16 + 15)
0xBADCAFE  // => 195939070
// console.log(0xbadcAfE)

// binary (base-2) 以0B开头
// console.log(0b10101)

// octal(base-8) 以  0O开头 0-7
// console.log(0O377)


// ### floating-point literals

// [digits][.digits][(E|e)[(+|-)]digits]
// traditional syntax : 1.222
// exponential syntax : 1.222e-10
// console.log(1.222e1 == 12.22)
let billion = 1_000_000_000;
// console.log(billion)

// ### arithmetic operators
// addition + subtraction - division / multiplication * modulo % exponentiation **
// console.log(2 ** 8)

// in addition to these basic arithmetic operators, js supports more complex mathematical operations through a set of functions and constants defined as
//   properties of the Math Object
// Math.pow(2, 8)
/*
console.log(Math.pow(2, 8))  // 2 to the power 8 256
console.log(Math.round(.4)) // round to the nearest integer 0
console.log(Math.ceil(.6)) // round up to an integer 1
console.log(Math.floor(.6)) // round down to an integer 0
console.log(Math.abs(-.6)) // absolute value 0.6
console.log(Math.max(1, 2, 4)) // return the largest argument 4
console.log(Math.min(1, 2, 4)) // return the smallest argument 1
console.log(Math.random())  // return a random number between 0 and 1
console.log(Math.PI) // return the value of pi
console.log(Math.E)
console.log(Math.sqrt(4)) // 4 ** 0.5 the square root of 4
console.log(Math.pow(8, 1 / 3)) // 8 ** (1/3) the cube root of 8
console.log(Math.sin())
console.log(Math.log(10))   // natural logarithm
console.log(Math.log(100) / Math.LN10) // base-10 logarithm
console.log(Math.exp(Math.log(10)))  // Math E power of the natural logarithm of 10
 */
// ES6 defines more functions
// console.log(Math.cbrt(8)) // cube root of 9
// console.log(Math.hypot(5, 12)) // square root of sum of the squares of all arguments 这不勾股定理么
// console.log(Math.log10(100)) // base-10 logarithm of 100
// console.log(Math.log2(8)) // base-2 logarithm of 8
// console.log(Math.log1p(0)) // log(1+0)
// console.log(Math.expm1(1)) // log(1-1)
// console.log(Math.sign(-100)) // -1 , 0 ,1 for arguments less than 0, 0, greater than 0
// console.log(Math.imul(4, 6)) // optimized multiplication of 32-bit integers
// console.log(Math.clz32(0xf))
// console.log(Math.trunc(3.990)) // 3 convert to an interger by truncating fractional part
// console.log(Math.fround(1.222333344)) // return the nearest 32-bit float number
// console.log(Math.sinh(x))
// console.log(Math.asinh(x))


// Infinity 不会发生错误只会产生Infinity
// 如果操作结果是一个比最小表达值更接近0的数，就会返回0 ， underflow 下溢，如果是负数就返回 - 0
// exception: 0 / 0 => NaN ;  Infinity / Infinity => NaN; square root of negative number , use arithmetic operators with non-numeric operands
// global constants Infinity / NaN
// console.log(Infinity)
// console.log(Number.POSITIVE_INFINITY) // same value as Infinity
// console.log(1 / 0) // Infinity
// console.log(Number.MAX_VALUE * 2) // Infinity overflow

// // console.log(-Infinity)
// Number.NEGATIVE_INFINITY // => -Infinity
//   - 1 / 0 // => -Infinity
//   - Number.MAX_VALUE * 2 // => -Infinity

// NaN
// Number.NaN
// 0 / 0
// Infinity / Infinity

// console.log(Number.MIN_VALUE / 2) // underflow 0
// console.log(-Number.MIN_VALUE / 2) // underflow -0
// console.log(-1 / Infinity) - 0
//   - 0

// Number.parseInt(true) // => 1
// Number.parseFloat('0.111') // => 0.111 convert a string to a float
// Number.isNaN(0 / 0) // => true
// Number.isFinite(100) // =.> true // is a number or a finite
// Number.isFinite(1 / 0) // => false
// console.log(Number.isFinite(0))
// console.log(isFinite('123123你好'))
// Number.isSafeInteger(1 / 0)
// console.log(Number.MIN_SAFE_INTEGER) // => -(2**53 - 1)
// console.log(Number.MAX_SAFE_INTEGER) // =>2**53 - 1
// NaN !== NaN

// let zero = 0;
// let negz = -0;
// zero === negz // true
// console.log(1 / zero === 1 / negz) // false

// ### binary floating-point and rounding errors
// to be exact the representation of number will often be an approximation of the actual number.

// ### bigInt 主要用来表示64-bit整数
// console.log(123n)
// console.log(0b111111n)
// console.log(100n + 11100n)
// console.log(1100n / 998n) //舍去余数
// console.log(2 > 1n) // true

// ### Date and Time a timestamp that specifies the number of elapsed milliseconds since January 1,1970;
let timestamp = Date.now(); // the current time as a timestamp (a number)
console.log(timestamp)
let now = new Date(); // the current time as a Date Object 
console.log(now);
let ms = now.getTime() // convert to millisecond timestamp
console.log(ms)
let iso = now.toISOString() // convert to a string in standard format
console.log(iso)
