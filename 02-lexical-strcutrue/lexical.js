// ## reserved word
/* 
 as const export get null target void async continue extends if of this while await 
debugger false import return throw with break default finally in set true yield case
delete for instanceof static try catch do from let super typeof class else function new 
switch var enum implements interface package private protected public
 */

// ## unicode
// usually use ASCII letters and digits 

const π = 1;
// console.log(π);

// ## escape sequences
// 一些机器无法显示完整的Unicode字符，因此JavaScript提供了一些转义序列，可以将它们转换为相应的字符。

let café = 1;
// console.log(caf\u00e9) // 1
// es6引入的花括号版本
// console.log(caf\u{E9}) // 1
// console.log("caf\u{1F600}")

// ## unicode normalization
// 虽然看起来一样，但属于不同的衣服编码集。indistinguishable;
// th Unicode standard defines the preferred encoding for all characters and specifies a normalization procedure to convert text to canonical from suitable
// for comparisons. 

// console.log("\u00e9"); //é
// console.log("e\u0301");  // é
// const café = 1;  // This constant is named "caf\u{e9}"
// const café = 2;  // This constant is different: "cafe\u{301}"

// ## optional semicolons
// a = 3;
// b = 4;
// a = 3
// b = 4;
// let a
// a
//   =
//   3
// console.log(a)
let a; a = 3; console.log(a);
return
true;
// js assumes you meant
return; true;