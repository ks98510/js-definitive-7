function log(x) {
  console.log(x)
}
// # 4.1 primary expressions

// ## 4.1.1 primary expression
// when any identifier appears by itself in a program ,the js assumes it is a variable ,the property of the global object and looks up the values. ReferenceError
// primary expression
true;
"abc";
// array initializer
[];
[1 + 2, 2 + 4]
let sparseArray = [, 2, 3, , 5];
// object initializer
let p = {
  x: {
    abc: 1,
    def: 2
  }
}
let q = {}
q.x = 2.3;
q.y = -1.2;
// function definition expression
let square = function (x) { return x + 1 }

// #4.4 property access expressions
// expression.identifier
// expression[identifier]
let o = { x: 1, y: { z: 3 } }
// console.log()
// o[c]; // Reference c.notDefined
// c[b] // Reference C.notDefined
// o = null; o["x"]; //TypeError
// null["x"] // typeError
// undefined["x"] // typeError
null?.["x"]
1["a"] //undefined` // ?.判断的是左侧是否是undefined or null;
// conditional property access
o.c?.["c"]
// o.c.c

// #4.5 Invocation expression
Math.max(1, 2, 3);
[].sort()
// ##4.5.1 conditional invocation
function squareF(x, log) {
  if (log) {
    log(x)
  }
  return Math.pow(x, 2)
}
// squareF(0, 0) // typeError
// ?.only check the left is not undefined or null; it doesn't  verify that the value is actually a function.
function squareF(x, log) {
  log?.(x);
  return;
}

// let f = null, x = 0;
// try {
//   f(x++);
// }
// catch (err) {
//   // console.log(x); //1
// }
// f?.(x++);
// console.log(x) // 1 increment is skipped because of the short-circuiting

// o.m()
// o?.m()
// o.m?.()

// #4.6 Object creation expression
new Object();
// console.log((new Date).toString());; // it can be omitted if no arguments are passed

// #4.7 operator overview
// !~ 按位取反，转化位32位binary数，但是记住是以补码的形式存在的
~10 // -11；1010 -> 0101 -> 0100 -> 1011 -> -11
// !! << 左移 a<<b binary a move left , 超出清楚，右侧自动补零 ,>>> ,<<< 都是不带符号拓展,<<,>> 带符号
6 << -2 // 24 110 11000 8+16
// console.log(6 << -2)
// console.log(void this)
// console.log(+'5'); // 5
// ! ??: 如果左侧为null 或者undefined 返回右边 与|| 不同的是，不会把假值当作undefined 0||'a';0??'a'
// ++ - -(negate) + ~ ! delete typeof  void ** *,/,% +,- + << >> >>>  ,

// ##4.7.1 Number of the operands
// categorized by the number of the operands the expect // 
// unary : -(negated) , 
// binary : +, -, *, /, %, **, <<, >>, >>>, &, |, ^, ==, !=, ===, !==, <, <=, >, >=, in, instanceof, &&, ||, ??:
// ternary : ? :

// ##4.7.2 operand and Result type

// ##4.7.3 Operator side effects
// like: ++ -- - delete they will implicitly assign the value to the variable
// No other JavaScript operators have side effects, but function invocation and object creation expressions will have side effects if any of the operators used in the function or constructor body have side effects.

// ##4.7.4 Operator precedence
1 + 2 * 3;
(1 + 2) * 3;
// !! property access and invocation expressions have hight precedence than any operators. assign has very low precedence
// typeof my.functions[x](y)

// ##4.7.5 Operator associativity
1 - 2 - 3; // 1-(2-3)
1 ** 2 ** 3; // 1**(2**3)

// ##4.7.6 order of evaluation
// 1. left to right

// #4.8 Arithmetic Expressions
// ** * / % + -  convert to number except "+". 
// ** works right to left
// -4 ** 3; //Syntax Error parenthesis must be used Math.pow()
-(4 ** 3);
5 / 2; // 2.5 in js, all numbers are floating-point .
5 % 2; 6.5 % 2.1;

// ##4.8.1 The + operator : adds numeric operands and concatenate string operands 
// !! convert rules #3.8
1 + 2;
"hello" + " x";//"hello x"
"1" + "2";// "12"
// + operator give priority to string concatenation.
// 其中一个是字符串或者转换为字符串对象是，evaluate as string concatenation.
// 如果其中一个是对象先转换成primitive value ，判断是否是字符串
// 如果都不是就使用addition
// console.log(null + null);
1 + 2;
1 + {};
// {}.toString();
let a = {};
a.toString(); //"[object Object]"
// + operator may not be associative ; 
// console.log(1 + 2 + "build"); // "3build"
1 + (2 + "build"); // "12build"


// ##4.8.2 unary arithmetic operators
// + : converts the operand to a number (NaN), can't be used with BigInt because they can't be converted to a regular number.
// - : convert to a number ,then change their sign.
// ++ : must be used with Lvalue(variable,element,property) convert to number , then assign incremented value to the variable.
//      the return value of the ++ operator depends on the position relative to the operand.
// pre-increment ++a; increment and evaluate to the new value
// post-increment a++; increment and  evaluate to the unincremented value
// !x++ is not always the same as x=x+1; note the type
// let i = 1, j = ++i; console.log(j); // 2
// let m = 1, n = m++; console.log(n); // 1

// ##4.8.3 bitwise operators
// except >>> all operators can be used with BigInt
// & | ^(异或)
// ~(按位取反) 相当于改变符号位再-1
~-12
console.log(-9 >> 1) // -5
// << 一位相当于*2 >> 一位相当于/2 因为是2进制

// >>> 不能和bigInt 一起使用

// #4.9 relation expression :equality and inEquality and in instanceof
// equality : == === "identical"
// inEquality : != !==
// !! NaN!==NaN +0===-0 如何字符集不同，不认为相等
// !!=== 
/* 
1. type
2. both of values is null or undefined
3. true or false
4. NaN !== NaN
5. number && has the same value - 0 === +0
6. string && has the same 16-bits values . if there is not the same length => unEquality , the same visual appearance , but be encoded using different sequence of 16-bits values => unEquality
7. the same value refer to the same object => equality
 */

// ==
/* 
1. if the type is same , use ===;
2. if one value is null, another is undefined, return true
3. one value is string , another is number , convert the string to the number.
4. if value type is boolean , convert it to the number then compare
5. if one value is object , and the other is number or string . convert the object value to the primitive value use algorithm and compare again. Valueof() is precedent than toString() except Date class.
6. any combinations of values are noEquality.
 */

// "1" == true;  // true=>1;"1"==1;1==1;return true

// ##4.9.2 comparison operators
// > < <= >= 
// conversion rules
// 1.object is converted to primitive value. valueOf() toString()
// 2.if both operands are string 
// 3.if at least one operand is number , convert to number ,if NaN appear, return false , 
// !! string are the sequence of 16-bit integer values. all capital ASCII letters are less then lowercase ASCII letters.

// use String.toLowerCase  or String.toUpperCase() 
// + favor to convert string to number , comparison favors to convert to number

// ###4.9.3 in operator
/* let point = { x: 1, y: 1 };
console.log("x" in point);
console.log("toString" in point); // true object inherits toString method;

let data = [7, 8, 9];
console.log("0" in data); // true
console.log(1 in data); // true
 */

// ###4.9.4 instanceof operator
// left-side operand is an object , right-side should be a function

let d = new Date();
// console.log(d instanceof Date) // true;
// console.log(d instanceof Object) //true all objects are instances of object
// console.log(d instanceof Number); // false
let ar = [1, 2, 3];
ar instanceof Object;
ar instanceof Array;
ar instanceof RegExp;

// if left-side is not a object , instanceof return false , if righthand side is not a class of Object ,it throws a typeError

// ar instanceof null; //TypeError
// !! prototype chain  o instanceof f , find f.prototype is one of the value in the prototype chain of o.

// #4.10 logical expression
// && || !

// & : 1.x===0 && y==0; 2.truthy and falsy 3.return the truthy or falsy value(if left is falsy , return left ,else depends on right)
let obj = { x: 1 };
let n = null;
// console.log(obj && n) // null
// console.log(obj && obj.x) // 1
// console.log(n && n.x) // null because the left is null ,so it doesn't evaluate the right.
// called short circuiting
// if (a === b) stop(); invoke stop only if a===b
// (a === b) && stop(); this does the same thing

// || Logical OR
// if the first operand is truthy , it short-circuit and return the first operand without evaluating the expression on the right;
's' || blur.c; // there is no Error;
// let max = maxWidth || preferences.maxWidth || 500 // get the first truthy value/
// 0 || blue.s; // Reference Error 0 is false  we can use ?? to replace.
function copy(o, p) {
  p = p || {} // prior ES6
}
function compES6(o, p = {}) { }

// !Logical NOT
// console.log(!' ') //false

// #4.11 assignment expression
// = right-left associativity
// let i = j = k = 0;
// console.log(2 = 3) // the left-side is a lvalue.

// ##4.11.1 assignment with operation
// total += salesTax  the same as total = total +salesTax;
// !! a op=b op is the any operator ; a = a ap b ; the difference between them is a is evaluated once in the first line  and it is evaluated twice in the second line.
let data = [1, 2, 3], i = 0;
// console.log(data[i++] *= 2); //2
// console.log(data, i) //[2,2,3] ,1
data[i++] = data[i++] * 2;
// console.log(data, i); // [4,2,3],2

// #4.12 evaluation expression. global function eval() may be a security hole.
//  console.log(eval("3+2")) //5
// some website use http "content-security-policy" header to disable eval()
eval("function fb() { return x+1;}");
// console.log(fb)
// ##4.12.2 global Eval()s2
let x = "global", y = "global";   // Two global variables
const geval = eval;               // Using another name does a global eval
function f() {                    // This function does a local eval
  let x = "local";              // Define a local variable
  eval("x += 'changed';");      // Direct eval sets local variable
  return x;                     // Return changed local variable
}
function g() {                    // This function does a global eval
  let y = "local";              // A local variable
  geval(" y += 'changed';");     // Indirect eval sets global variable
  return y;                     // Return unchanged local variable
}
// console.log(f(), x); // Local variable changed: prints "localchanged global":
// console.log(g(), y); // Error referenceError
// geval("let x = 1;console.log(x)"); // true
// ! if we call eval by using another name , the scope is the same as the caller.
// strict mode don't allow to overwrite eval

// #4.13 miscellaneous operator
// ?:
x > 0 ? x : -x;// only evaluate one of the second and third operands.
// greeting = "hello " + (username ? username : "there");

// ?? First-defined only if the first operand is nullish(null or undefined),it return the second operand.
a ?? b;
(a !== null && a !== undefined) ? a : b;
'' ?? 's' //0
// If maxWidth is truthy, use that. Otherwise, look for a value in
// the preferences object. If that is not truthy, use a hardcoded constant.
// let max = maxWidth || preferences.maxWidth || 500; // this will ignore the zero or empty string.
// let max = maxWidth ?? preferences.maxWidth ?? 500;

let option = { timeout: 0, title: "", verbose: false, n: null };
/* log(option.timeout ?? 1000); //0
log(option.title ?? "unTitled"); //''
log(option.verbose ?? true); // false
log(option.n ?? 10); //10
 */// it has no higher or lower precedence than && or || , so we must use parentheses
(a ?? b) || c;

// ##4.13.3 the typeof operator
/* log(typeof undefined); // undefined
log(typeof null); // !!object
log(typeof true); // boolean
log(typeof 1);
log(typeof NaN); //number
log(typeof BigInt(11)) // bigint
log(typeof 'hello') // string
log(typeof String.toString) // function
log(typeof {}) // object 
*/

// ##4.13.4 the delete operator
/* 
let od = { x: 1, y: 2, z: 3 };
delete od.x;
log("x" in od); //false

let ad = [1, 2, 3];
delete ad[2];
log(2 in ad); // false
log(ad); // [1,2,<empty item>]
log(ad.length); // 3
 */

// let od = { x: 1, y: 2 };
// log(delete od.x); // true;  delete one of the exist property;
// log(delete od.x); // true;
// log(delete 1); //true;
// log(delete od); // return false,can't delete a variable , or SyntaxError in strict mood;
// log(delete Object.prototype); // return false, can't delete undeletable property. typeError


// ##4.13.5 the await operator
// only used in the async keyword function.

// ##4.13.6 the void operator
let counter = 0;
const increment = () => void counter++;
increment();
// log(counter); // 1

// ##4.13.7 the comma operator(,)
// i = 0, j = 1, k = 2;
for (let i = 0, j = 10; i < j; i++, j++) {

}

