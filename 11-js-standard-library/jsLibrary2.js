/* # 11.4 Dates and Times */
let now = new Date();
// number argument
let epoch = new Date(11); // the milliseconds since 1970
// two or more argument
let century = new Date(2100, // year 2100
  0, //January
  1, // 1st
  2, // 02:03:04.005
  3,
  4,
  5);
// the first month is zero

century = new Date("2100-01-01");
function log(...args) {
  console.log(...args)
}
let d = new Date();
d.setFullYear(2025);
d.getFullYear();
d.setMonth();
d.setDate();
d.setHours();
d.setMinutes();
d.setSeconds();
d.setMilliseconds();
d = new Date();
d.getDate() // 7
d.getDay(); //0   there is no setDay

/* # 11.4.1 Timestamps */
d.getTime()
d.setTime(d.getTime + 30000);
Date.now();
performance.now();
performance.now() //更高精度

/* # 11.4.2 Date arithmetic */
d.setMonth(d.getMonth() + 3, d.getMonth() + 14)
/* # 11.4.3 Formatting and parsing Date String */
d = new Date();
d.toString() // Wed Nov 01 2017 02:03:04 GMT+0800 (中国标准时间)
d.toUTCString() // Wed, 01 Nov 2017 00:03:04 GMT
d.toLocaleString() // 2017/11/01 02:03:04
d.toLocaleTimeString() // 02:03:04
d.toISOString() // 2017-11-01T00:03:04.005Z

/* # 11.5 Error Classes */
// property : name , message
// EvalError,SyntaxError,RangeError,ReferenceError,TypeError,URIError

class HTTPError extends Error {
  constructor(status, statusText, url) {
    super(statusText);
  }
  get name() {
    return 'HTTPError'
  }

}

/* # 11.6 JSON serialization and parsing */
// Javascript object notation 
// doesn't support Map,Set,Date,Typed Arrays
let o = { s: "", n: 0, a: [true, false, null], b: { ss: { a: 1 } }, map: new Map(), set: new Set(), date: new Date(), type: new Int16Array() };
JSON.stringify(o);
// optional argument of stringify  second represent replacer 函数或者数组控制序列化过程, 第三个参数代表缩进空行
JSON.stringify(o, ["s", "n"], 2);
/* # 11.6.1 JSON Customization */
// toJSON() Date implement toISOString()
// JSON.parse(obj,reviver)
let data = JSON.parse(JSON.stringify(o), (key, value) => {
  return value;
})
let json = JSON.stringify(o, (key, value) => value instanceof RegExp ? undefined : value);

/* # 11.7 the internationalize API */
// Intl.NumberFormat Intl.DateTimeFormat Intl.Collator
Intl.NumberFormat('en-US', {
  style: "decimal",
})
let euros = Intl.NumberFormat("es", { style: "currency", currency: "EUR" })
// use format method
euros.format(10) // 10,00 €
let pounds = Intl.NumberFormat("en", { style: "currency", currency: "GBP" })
pounds.format(100); // £100.00
data = [0.05, .75, 1];
let formatData = Intl.NumberFormat(undefined, {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1
});
data.map(formatData.format); // [ '5%', '75%', '100%' ]
let arabic = Intl.NumberFormat('ar', { useGrouping: false }).format
arabic(123456789);

/* # 11.7.2 formatting Date and Times */
// first argument  :local; second argument：optional argument which you want;
/* 
year: numeric (2024) | 2-digit (24)
month: numeric(1) | 2-digit (01) | long (January) | short (Jan) | narrow (J)
day: numeric(1) | 2-digit(01)
weekday: long(Monday) | short(Mon) | narrow(M)
era: 
hour,minute,second: numeric | 2-digit 
timeZone: 时区
hour12: 12小时
hourCycle：h11,h12,h23,h24 
*/
d = new Date()
Intl.DateTimeFormat("en-US").format(d) // 4/7/2022
let opt = { weekday: "long", month: "long", year: "numeric", day: "numeric" };
Intl.DateTimeFormat("en-US", opt).format(d);// Sunday, April 7, 2024
Intl.DateTimeFormat("es-ES", opt).format(d) // => "jueves, 2 de enero de 2020"
// The time in New York, for a French-speaking Canadian
opts = { hour: "numeric", minute: "2-digit", timeZone: "America/New_York" };
Intl.DateTimeFormat("fr-CA", opts).format(d) // => "8 h 14"

/* # 11.7.3 comparing string */
// collator
const collator = new Intl.Collator().compare;
["a", "z", "A", "Z"].sort(collator);
const filenameOrder = new Intl.Collator(undefined, { numeric: true }).compare;
["page9", "page10"].sort(filenameOrder);


/* # 11.8 ConSole */
console.log("hello world");
console.debug()
console.info()
console.warn()
console.error()
console.assert()
console.clear()
console.table()
// console.trace() // 追踪
console.count() // 记录调用次数 接受一个字符串
console.countReset() // 重置
console.group()
console.groupEnd()
console.groupCollapsed
console.time(); // 接受一个str
console.timeLog() // 接受一个str 可以打印
console.timeEnd() // 结束

/* # 11.8.1 formatting output */
const name = "John";
const age = 30;
// 占位符
console.log("Name: %s, Age: %d", name, age);
console.log("%cStyled Text", "color: blue; font-weight: bold;");
// %c %s %f %i %d %o %O
// 输出：Name: John, Age: 30


/* # 11.9 URL APIS */
// url Object
let url = new URL("https://example.com:8080/path/name?q=term#fragemnt");
// username & password
url = new URL("ftp://admin:1337!@ftp.example.com/")
// combination
url = new URL("http://example.com")
url.pathname = 'api/search';
url.search = 'q=test';
url.toString() // http://example.com/api/search?q=test
// escape punctuation
url.pathname = "path with space";
url.search = "q=foo#bar";
url.toString() // http://example.com/path%20with%20space?q=foo%23bar
// url.searchParams
url.searchParams.append("name", "lxl")
url.searchParams.set("name", "changeName");
url.searchParams.get("name") // changeName
url.searchParams.has("llx") //false
url.searchParams.append("name", "111")
url.searchParams.get("name") // changeName
url.searchParams.getAll("name"); // [changeName, 111]  
url.searchParams.delete("q");
[...url.searchParams];
// URLsearchParams 
url = new URL("http://example.com")
let params = new URLSearchParams()
params.append("age", 11);
url.search = params;
/* # 11.9.1 legacy url function  */
// prior: use escape() and unescape(); now: encodeURI decodeURI() encodeURIComponent decodeURIComponent()  
let str = 'you need/my?help'
encodeURI(str) // you%20need%2Fmy%3Fhelp
encodeURIComponent(str) //会转义一些 / ?等字符


/* # 11.10 Timers */
let a = setTimeout(() => {
  console.log("a")
}, 1000);
let sI = setInterval(()=>{
})