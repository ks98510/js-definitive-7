// Set/Map Array-like Regular Expression Date Error JSON Intl Object Console URL setTimeout

/* # 11.1 Sets Maps */
// object are limited by the restriction to string and complicated by the fact that objects normally inherit the toString

/* # 11.1.1 Set */
// sets are not ordered and indexed.they don't allow duplicate 
let s = new Set();
let t = new Set([1, 's']);
// the arguments of the set need not to be an array : any iterable object;
t = new Set(s); // Set()
let unique = new Set("hello"); // set(4)
function log(...arg) {
  console.log(...arg)
}
unique.size; // 4
// add, delete clear
s.add(1);
s.add(true);
s.add([1, 2, 3]);
s.delete(1);
s.add(true);
s.has(true);
// 1.  chaining insert the array itself
s.add('s').add('b').add('c');
s.clear();
// 2. delete return true or false if there is nothing deleted
// 3. use strict equality checks.
// check if the value is in the set
let oneDigitPrimes = new Set([2, 3, 5, 7]);
oneDigitPrimes.has(2); ///true;
oneDigitPrimes.has("5"); // false
// the most important thing is that the set are optimized for membership testing. 
// better than includes (proportional to the size of the array) and for
let sum = 0;
for (let p of oneDigitPrimes) {
  sum += p;
}
sum; //17
[...oneDigitPrimes];
Math.max(...oneDigitPrimes);
// set is unindexed and ordered.
oneDigitPrimes.forEach((val, index) => {
  val; index; // val === index
});

/* # 11.1.2 Map */
// map is like an array instead of using a set of sequential integer as the keys.
let m = new Map();
let n = new Map([ // A new map initialized with string keys mapped to numbers
  ["one", 1],
  ["two", 2]
]);
let copy = new Map(n);
let o = { x: 1, y: 2 };
let p = new Map(Object.entries(o));
// set() get() has() delete() clear()
m.size;//0
m.set("one", 1);
m.set("two", 2);
m.size; //2
m.get("one");
m.set("one", true);
m.delete("one");
m.clear();
// like the add() , set can be chained
m.set("1", 2).set("a", 3);
// any js value can be used as a key or value includes null，undefined
m.set({}, 1);
m.set({}, 2);
m.get({});//undefined
m.set(m, undefined);
m.has(m);
m.get(m);
// map is iterable ; every iterable value is [key,value];
[...m]; // [['1',]],['a',3]...]
for (let [key, value] of m) { // [key,value] is an array
  // log(key, value);
}
// like the set , Map iterates as the insertion order
// keys() values()  entries()
m.keys();
m.values();
m.entries();
m.forEach((value, key) => {
  // log(value, key)  
})

/* # 11.1.3 WeakMap WeakSet */
// weakMap doesn't prevent its key values from being garbage collected
/* 
  # differences
  1. weakMap keys must be objects or arrays
  2. weakMap implement only get,set,delete,has, not iterable and does't define keys(),values(),forEach,
  3. no size
*/
// 和一个对象关联并不会发生内存泄漏，比如对一个对象执行耗时操作，通过map实现缓存，或者用Symbol直接缓存在对象

// weakSet implement a set of object that doesn't prevent the object from being garbage collected
/* 
  # differences
  1. weakSet doesn't allow primitive value as member
  2. only add(),delete(),has() , isn't iterable
  3. no size
*/


/* # 11.2 Typed Array and Binary Data*/
/* # 11.2.1 Typed Array Types */
// Int8Array() signed bytes
// Uint8Array() unsigned bytes
// Uint8ClampedArray() unsigned bytes without rollover
// Int16Array() signed 16-bit short integers
// Uint16Array() unsigned 16-bit short integers
// Int32Array() signed 32-bit integers
// Uint32Array() unsigned 32-bit integers
// BigInt64Array() signed 64-bit BigInt values (ES2020)
// BigUint64Array() unsigned 64-bit BigInt values (ES2020)
// Float32Array() 32-bit floating-point value
// Float64Array() 64-bit floating-point value: a regular JavaScript number

/* # 11.3 Pattern Matching with regexp */
/* # 11.3.1 Defining Regular Expression */
// use / or RegExp;
let pattern = /s$/; // s => every string
let pR = new RegExp("s$");
// characters and meta-characters
pattern = /s$/i;
// 数字和字符都是字面意思 需要区分加\做区分
/*
 \0 ; null
\t; Tab
\n ; new Line
\v ; Vertical Tab
\f ; Form feed 换页
\r ; 回车
 */
// ^ $ . * + ? = ! : | \ / ( ) [ ] { }
// Character Class [abc];
/[abc]/; // match a or b or c
/[^abc]/; // use negated character class to match anything except a or b or c
/[a-z]/;
/* 
  [...] 
  [^...]
  .
  \w any ascii word character === [a-zA-Z0-9_]
  \W  any non-word character === [^a-zA-Z0-9_]
  \s any space 
  \S not any Space 
  \d any digit === [0-9]
  \D [^0-9]
  [\b] a literal backSpace
*/
/[\b]/;
/\w/;
/\W/;
// Repetition
/\d\d\d\d/;
/* 
  {n,m} the pervious at least n , no more than m
  {n,} the pervious at least n
  {n} match exactly n
  ? match zero or one ; the pervious item is optional , === {0,1}
  + match one or more ; the pervious item is required , === {1,}
  * match zero or more ; the pervious item is required , === {0,}
*/
let r = /\d{2,4}/;
r = /\w{3}\d?/;
r = /\s+java\s+/;
r = /[^(]*/; // match zero or more characters that are not open parens
// Non-greedy with a question mark ?? +? *? {n,m}?
/a+/;
// alteration grouping reference
/ab|cd|ef/;// match ab or cd or ef
/\d{3}|[a-z]{4}/;
// () group separated items
/java(script)?/; // match java or javascript
/(ab|cd)+|ef/; 
// () as the sub-expression \1 refers back the first sub-expression
(/[a-z]+(\d+)/);
/([Jj]ava([Ss]cript)?)\sis\s(fun\w*)/;// use the position of left parenthesis \2 represent [Ss]cript
/['"][^'"]*['"]/;
/(['"][^'"]*\1)/;
/(['"][^\1]*\1)/;
// use (? and )
/([jJ]ava(?:[Ss]cript)?)\sis\s(fun\w*)/; // the (?:) 不会产生引用也就是意味着\2 代表(fun\w*)
/* 
  | alternation
  (...) grouping
  (?:...) group without reference
  \n reference
*/
// we can use named captured group 
/(?<city>[a-z]*)/;
/(?<city>\w+) (?<state>[A-Z]{2}) (?<zipcode>\d{5})(?<zip9>-\d{4})?/;
/(?<quote>['"])[^['"]*\k<quote>]/; // the \k<quote> is a named captured group reference
// Specifying match position;


