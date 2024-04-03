"use strict"
// # 5.1 expression statement
let name = "s";
let greeting = "hello" + name;
let counter = 0;
counter++;
// statement block
function log(x) {
  console.log(x);
}
// # 5.2 compound and empty statement
{
  let x = Math.PI;
  log(x);
  // empty statement
  ;
}
// log(x); // Reference Error
for (let i = 0; i < 10; i++);
if ((counter === 0) && true); // this line do nothing; /* empty */

// # 5.3 if conditionals
// ## 5.3.1 if 
/* two forms */
if (counter == 0)
  log(123);
if (counter === 0) log(11);

/* else if */
if (counter === 1) {

}
else if (counter === 2) { }
else { }

/* # 5.3.3 switch */
// switch(expression){
//   statements
// }
switch (counter) {
  case 0: // it is determined using === identifier operator;
    log(0);
  default:
    log(1);
    break; // we need a break to tell the function to stop executing the code after the case statement.
}

/* # 5.4 loop */
/* while for do/while for/of(for/await) for/in */
/* while: first evaluate the expression , then check the value whether truthy or falsy. */
// while (true) {
//   log("while");
//   break;
// }
// let num = 0;
// log(num);
// while (num < 10) {
//   num++;
//   log(num);
// }

/* do while */
/* 
do
  statement
while(expression)
 */
// do {
//   log(counter++);
// } while (counter < 10);

/* for */
/* 
  for(initialize;test;increment)
    statement
*/

// let i, j, sum = 0;
// for (i = 0, j = 1; i < 10; i++, j++) sum += i;
function tail(o) {
  for (; o.next; o = o.next) {
    return o
  }
}

// !!
/* for/of:iterable object */
let data = [1, 2, 3, 4], sum = 0;
for (let element of data) {
  sum += element;
}
log(sum);
/* avoid changing in the iteration */

/* for/of:object */
// objects are not iterable . attempting to use for/of on a regular object throws a TypeError at runtime;
// for (const iterator of { a: 1 }) {

// } // TypeError : not iterable. use for/in or Object.keys
let sample = { a: 1 };
for (const key in sample) {
  sample.b = 2;
  // it has no effect on the iteration.
  // log(key);
}
for (const key in Object.values(sample)) {
  // log(key);
}
for (const [key, value] of Object.entries(sample)) {
  // log(key);
  // log(value);
}
/* for/of string */
let frequency = {};
for (let letter of "missssippi") {
  frequency[letter] = (frequency[letter] ?? 0) + 1;
}
// log(frequency);
for (let letter of "I❤") {
  // log(letter); // I ❤
}

/* for/of Set/Map */
let text = "Na na na na na na na na Batman!";
let wordSet = new Set(text.split(" "));
let unique = [];
for (let word of wordSet) {
  unique.push(word);
}
log(unique) // => ["Na", "na", "Batman!"]

let m = new Map([[1, "one"]]);
for (let [key, value] of m) {
  key    // => 1
  value  // => "one"
}
//!!
/* for/await */
/*  */
// Read chunks from an asynchronously iterable stream and print them out
async function printStream(stream) {
  for await (let chunk of stream) {
    console.log(chunk);
  }
}

/* for/in :first evaluate the object expression , if null or undefefined, the loop will not be executed. */
for (let key in null) {
  log(key);
}
/* left side of assignment can be an arbitrary expression */
let ao = { x: 1, y: 2, z: 3 };
let aa = [], i = 0;
for (aa[i++] in ao);
log(aa);

//!! for/in doesn't actually enumerate all properties of an object. like symbols,built-in properties.like toString(), all properties and methods defined by code are enumerable.
// !! for/in can enumerate inherited properties. if the body of the for/in loop deletes a property that has not been enumerated,the won't be enumerated again. the same as addition

/* # 5.3 jumps */

/* # 5.3.1 labeled statement */
/* identifier:statement */
mainloop: while (true) {
  // break label
  log('mainloop')
  let i = 0;
  while (i++ < 10) {
    // log(i)
    if (i === 6) break mainloop
  }
}

/* # 5.5.2 break */
for (var gIndex = 0; i < 10; gIndex++) {
  if (gIndex === 5) break;
}
// log(gIndex) // 5
// 会使循环和switch语句立即退出；

// break labelname; // i think this syntax is ordered to break some nested loop . 
let matrix = [1, 2, 3, 4];
let sums = 0, success = false;
computeSum: if (matrix) {
  for (let x = 0; x < matrix.length; x++) {
    let row = matrix[x];
    if (!row) break computeSum;
    for (let y = 0; y < row.length; y++) {
      let cell = row[y];
      if (isNaN(cell)) break computeSum;
      sums += cell;
    }
  }
  success = true;
}


// we can use that label inside the function
/* funcLabel: function myFun() {
  let abc = 0;
  break;
  leb b = 0;
}  // Syntax : Illegal break statement;

 */

/* # 5.5.3 continue */
// instead of exiting a loop , however, continue restarts a loop at next iteration.
// continue;
// continue label; 
// it both its labeled and unlabeled forms, it can be only used in the body of a loop . using ite anywhere else will cause a syntax error
// 重新判断while 条件 以及do while 底部条件 in for loop , increment expression is evaluated , and the tested expression is evaluated again to determine .
// for loop 中 要先计算increment 然后返回条件，而while中直接返回条件 所以for while 并不一定相同。
// for (let n = 0; n < 5; n++) {
//   if (!dataArr[i]) continue;
//   log(0 + dataArr[i]);

// }
const dataArr = [1, 2, 3, 4, 5]
let total = 0;
for (let i = 0; i < dataArr.length; i++) {
  if (!dataArr[i]) continue;  // Can't proceed with undefined data
  total += dataArr[i];
}
// it can be used in its labeled within nested loop, and the breaks are not allowed between the continue statement and the label name.

/* # 5.5.4 return */
// return expression
// a return statement may only appear within the body of the function . it is a syntax error for it to appear anywhere else.
function square(x) { return x ** 2 };
log(square(2));

// it can return undefined to its caller;
function displayObject(x) { if (!x) return } // and because of the js's automatic semicolon insertion, we can't break the line.


/* #5.5.5 yield */
// it is much like the return ,but is used only in generator function to produce the next value in the generated sequence of values with actually returning.
function* range(from, to) {
  for (let i = from; i <= to; i++) {
    yield i
  }
}
let ret = range(1, 10);
// log(ret.next()) // {value:1,done:false}

/* # 5.5.6 throw */
/* throw expression */
function factorial(x) {
  if (x < 0) throw new Error("x must be negative")
  let f;
  for (f = 1; x > 1; f *= x, x--);
  return f
}
factorial(4);
// 首先遇到错误的时候，立即寻找最近的try catch 如果没有关联的，则检查下一个最顶层代码块，一直持续到找到处理程序位置，如果再不包含错误处理程，则该异常会传播到该函数的代码，异常会通过此法结构向上传播，如果未找到则直接视为错误并且报告给用户/
/* function catchFn(str) {
  log(a);
  console.log(123)
  try {

  } catch (error) {
    log('however', error)
  }
}
catchFn()
try {

} catch (error) {
  console.log('waimian', error)
}

 */

/* # 5.5.7 try/catch/finally */
try {
  // Normally, this code runs from the top of the block to the bottom
  // without problems. But it can sometimes throw an exception,
  // either directly, with a throw statement, or indirectly, by calling
  // a method that throws an exception.
}
catch (e) {
  // 一个块级作用域 只在catch中有效
  // The statements in this block are executed if, and only if, the try
  // block throws an exception. These statements can use the local variable
  // e to refer to the Error object or other value that was thrown.
  // This block may handle the exception somehow, may ignore the
  // exception by doing nothing, or may rethrow the exception with throw.
}
finally {
  // This block contains statements that are always executed, regardless of
  // what happens in the try block. They are executed whether the try
  // block terminates:
  //   1) normally, after reaching the bottom of the block
  //   2) because of a break, continue, or return statement
  //   3) with an exception that is handled by a catch clause above
  //   4) with an uncaught exception that is still propagating
}

/* try {
  // Ask the user to enter a number
  let n = Number(prompt("Please enter a positive integer", ""));
  // Compute the factorial of the number, assuming the input is valid
  let f = factorial(n);
  // Display the result
  alert(n + "! = " + f);
}
catch(ex) {     // If the user's input was not valid, we end up here
  alert(ex);  // Tell the user what the error is
} */

try {
  throw new Error('try error')
}
catch (e) {
  // console.log('catch', e)
}
finally {
  // throw new Error('finally Error')
}
/* 
while (test) {
  try { body; }
  finally(increment;)
} */ // 始终强调while和for 有区别

function parseJSON(s) {
  try {
    return JSON.parse(s);
  } catch {
    // Something went wrong but we don't care what it was
    return undefined;
  }
}
parseJSON('s')

/* # 5.6 miscellaneous */

/* # 5.6.1 with */ // forbidden in strict mode , deprecated in the no-strict mode
/* with (obj) {
   statements
} */

/* # 5.6.2 debugger */
function debuggerFn(o) {
  if (o === undefined) debugger;
  log(123)
}
debuggerFn()

/* # 5.6.3 "use strict" */
// it can only appear in the top of the script or at the start of a function body 
// in addition to code explicitly declared to be strict , any code  in class body or ES6 modules is automatically strict mode.e

// difference between strict mode and non-strict mode
/* 
  1.no with statement
  2.all variables must be declared, assign value to the an identifier that is not a declared variable,function,parameter
  3.function has a this value of undefined , not the global object. like call(),apply the first parameter is not the global object
  4.assignments to nonwritable properties and attempt to create new properties on non-extensiable objects will throw a typeError. (In non-strict mode, these attempts fail silently.)
  5. 严格模式下保存传递给函数的静态副本，非严格模式是引用相同的值
  6.在严格模式下，如果删除运算符后跟不合格的标识符（例如变量、函数或函数参数），则会引发 SyntaxError。 （在非严格模式下，这样的删除表达式不执行任何操作，并且计算结果为 false。）
  7.在严格模式下，尝试删除不可配置的属性会引发 TypeError。 （在非严格模式下，尝试失败并且删除表达式的计算结果为 false。）
  8.在严格模式下，对象字面量定义两个或多个同名属性是语法错误。 （非严格模式下不会出现错误。）
  9.在严格模式下，不允许使用八进制整数文字（以 0 开头，后面不跟 x）。 （在非严格模式下，某些实现允许八进制文字。）
  10.在严格模式下，标识符 eval 和参数被视为关键字，并且不允许您更改它们的值。您不能为这些标识符赋值、将它们声明为变量、将它们用作函数名称、将它们用作函数参数名称或将它们用作 catch 块的标识符。
  11.在严格模式下，检查调用堆栈的能力受到限制。在严格模式函数中，arguments.caller 和arguments.callee 都会抛出TypeError。严格模式函数还具有在读取时抛出 TypeError 的调用者和参数属性。 （某些实现在非严格函数上定义这些非标准属性。）
  */
// globalThis.a = 123;
// a = 1; // reference error
// let parameter = { a: 1 };
// delete data;
// function handle(parameter) {
//   parameter.a = 3;
//   return parameter
// }

// log(handle(parameter)=== parameter) // 