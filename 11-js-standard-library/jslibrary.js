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
// Specifying match position; anchor characters like ^ and $
/^JavaScript$/;
/\sJava\s/;
/\bJava\b/; // \B[sS]cript/ match JavaScript postscript but not script ort scripting
/[Jj]ava([Ss]cript)?(?=\:)/;
/Java(?!Script)([A-Z]\w*)/; // 只要不匹配Script
/* 
  # anchors
  1. ^ beginning of the string
  $ end of the string
  \b Match a word boundary. That is, match the position between a \w character and a \W character or between a \w
character and the beginning or end of a string. (Note, however, that [\b] matches backspace
  \B not a word boundary
  (?=p) 必须包含   
  (?!p) 必须不包含
*/
/* 
  # flags after the second \
  g:global match
  i:case insensitive
  m:multiline 
  s:like m “.” is matched every word
  u:Unicode 
  y:sticky match , match the beginning  like ^
*/

/* # 11.3.2 String Methods for pattern Matching */
// search()
"JavaScript".search(/script/ui); // 4
"Python".search(/script/ui); //-1
// replace(reg,replaceString) 
let test = "Javascript is fun";
test.replace(/javascript/gi, "JavaScript");
// named captured group
let quote = /"(?<quotedText>[^"]*)"/g;
'he said "stop" "abc"'.replace(quote, '%$<quotedText>%'); // he said %stop%
// arguments 1.entire string, 2.匹配组 3.位置 4.整个字串，5.对象键值对名称
'he said "stop" "abc"'.replace(quote, (sub, ...args) => {
  // console.log(sub, ...args)
  // "stop" stop 8 he said "stop" "abc"[Object: null prototype] { quotedText: 'stop' }
  // "abc" abc 15 he said "stop" "abc"[Object: null prototype] { quotedText: 'abc' }
}); // he said %stop%
let str = "15 times 15 is 225";
str.replace(/\d+/gu, n => parseInt(n).toString(16))
// Match return an array or null 
"7 plus 8 equals 15".match(/\d+/g); // ["7", "8", "15"]
// use group 
let url = /(\w+):\/\/([\w.]+)\/(\S)*/;
let text = "Visit my blog at http://www.example.com/~daviad http://www.111.com/~222'";
let match = text.match(url);
match;
// 如果没有/g 匹配的完全不同,只匹配第一个 a[0]为匹配到的字符串，其余为（）包含部分
/* [
  'http://www.example.com/~daviad',
  'http',
  'www.example.com',
  'd',
  index: 17,
  input: 'Visit my blog at http://www.example.com/~daviad' "",
  groups: undefined
]; */
// groups
url = /(?<protocol>\w+):\/\/(?<host>[\w.]+)\/(?<path>\S)*/;
match = text.match(url);
match;
// /g
//[ 'http://www.example.com/~daviad', "http://www.111.com/~222'" ]
// 没有/g
match.groups; // { protocol: 'http', host: 'www.example.com', path: '~daviad' }
// /yg /y /g with Match()
let vowel = /[aeiou]/y;
"test".match(vowel), //null
  vowel.lastIndex = 1,
  "test".match(vowel); //['e',index:1,input:'test',groups:undefined]
// MatchAll()
const words = /\b\p{Alphabetic}+\b/gu; // \p is not supported in Firefox yet
const text1 = "This is a naïve test of the matchAll() method.";
//\p{Property}用于匹配具有指定属性的字符，其中Property是Unicode属性的名称。例如，\p{Letter}匹配任何Unicode字母字符，\p{Number}匹配任何Unicode数字字符。
for (let word of text1.matchAll(words)) {
  console.log(`Found '${word[0]}' at index ${word.index}.`);
}

// Split()
"12,2,3,".split(",");
"1 , 2 , 3 , \n4 , 5".split(/\s*,\s*/);  //[1,2,3,4,5]
const htmlTag = /<([^>]+)>/;
// 如果使用group，匹配到的字符会包含在数组中
"<br/>1,2,3".split(htmlTag); //['','br/','1,2,3']


/* # 11.3.3 The RegExp Class */
let zipcode = new RegExp("\\d{5}", "g")
let exactMath = /JavaScript/;
let caseI = new RegExp(exactMath, "i");
// RegExp property
log(caseI.source) //JavaScript
log(caseI.flags) //i
log(caseI.global) //false
log(caseI.ignoreCase); //true
log(caseI.multiline); //false
log(caseI.dotAll);
caseI.unicode;
caseI.sticky;
caseI.lastIndex;
// test
'js', caseI.test('javascript') //true
// exec
log(caseI.exec('javascript')) // [ 'javascript', index: 0, input: 'javascript', groups: undefined ] like match no g
let pa = /Java/g;
let txt = "JavaScript > Java";
// exec 会随着成功而更新lastIndex 如果匹配成功之后修改，如果不成功的话直接重置0
while ((match = pa.exec(txt)) !== null) {
  console.log(`Matched ${match[0]} at ${match.index}`);
  console.log(`Next search begins at ${pa.lastIndex}`);
}
// 注意将reg存储起来再调用exec ，否则每次都是新的lastIndex不会变


