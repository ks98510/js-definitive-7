// # text 
// a string is an immutable ordered sequence of 16-bit values. each of which typically represents a unicode character.
// js 使用unicode UTF-16编码，那些不能被16为表示的就用两个长度为16位的比编码表示一个unicode字符
let euro = "€";
let love = "❤";
// console.log(euro.length)   // => 1: this character has one 16-bit element
// console.log(love.length)   // => 2: UTF-16 encoding of ❤ is "\ud83d\udc99"

// ## string literals
""
'testing'
"3.34"
// console.log('name="myForm"')
// console.log("Wouldn't you prefer O'abc' book?")
// console.log(`"she said 'hi' ",he said`)

// console.log('two\nlines')
// use backslash(\) to escape newline(\n)
// console.log("one\
// abc\
// line")

// console.log(`
// semicolons
// asdasd`)

{/* <button onClick="alert('thank u)">Click</button> */ }

// ## escape sequences in string literals
// console.log('you're right, it can't be a quote')
// use backslash to escape quote
// console.log('you\'re right, it can\'t be a quote')
// console.log('11\0')
// console.log('11\b')
// console.log('1\t1') //horizontal tob
// console.log('1\v1') // vertical tab\
// console.log('\\') // \

// ## working with strings
let msg = "hello" + "world"
// console.log(msg)
// console.log(msg + '\t' + msg)
// we can use ==,!==,>= and other operators to compare String. only compare by the the sequence of 16-bit values
// console.log(msg.length)

let s = "AHello, world";
// Obtaining portions of a string
// console.log(s.substring(1, 4)) // 'ell" 2,3,4
// console.log(s.slice(1, 4)) // ell
// console.log(s.slice(-3)) // 'rld' last 3 characters
// console.log(s.split(', ')) // ['Hello', 'world'] split at delimiter string

// search a string
// console.log(s.indexOf('H')) // position of the first letter H
// console.log(s.indexOf('H', 0))  // position of the first "H" after or at 0
// console.log(s.indexOf('zz')) // -1 
// console.log(s.lastIndexOf('d')) // position of the last letter d 

// Boolean searching functions in Es6 or Letter
// console.log(s.startsWith('Hell'))
// console.log(s.endsWith('!'))
// console.log(s.includes("world"))

// Creating modified versions of a string 
// console.log(s.replace("llo", "ya")) // Hell ya, world!
// console.log(s.toLowerCase()) // hello, world
// console.log(s.toUpperCase()) // HELLO, WORLD
// console.log(s.normalize())
// console.log(s.normalize('NFD'))

// inspecting individual characters of a string
// console.log(s.charAt(1)) // 'e'
// console.log(s.charAt(s.length - 1)) // 'd'
// console.log(s.charCodeAt(0)) // 72 16-bits number at specified position
// console.log(s.codePointAt(0)) // 返回在完整的UniCode码位

// string padding functions in Es2017
// console.log("x".padStart(3)) // '  x' add Padding on the left to the Length of 3 
// console.log("x".padEnd(3)) // 'x   '
// console.log("x".padStart(3, '!')) // '!!x' 
// console.log("x".padEnd(3, '1')) // 'x11'

// space trimming functions 
// console.log(" test ".trim())
// console.log(" test ".trimStart())
// console.log(" test ".trimEnd())

// miscellaneous string method
// console.log(s.concat('ss'))
// console.log("<>".repeat(10))

// template literals 
let str = `hello world`; // delimited with backticks
let name = "bill"
let greeting = `hello ,${name}`;
let errorMessage = `\
\u2718 Test failure at ${str}:
${name}
`
// console.log(errorMessage)
// tagged template literals
// console.log(String.raw(`\n`).length)
// console.log(String.raw`\n`.length)
// console.log`abc`

// ## pattern matching
// regular expression RegExp
"/^Html/"; // match the letters start with html
"/[1-9][0-9]*/" // match a nonzero digit ,followed by any # of digits
"/\bjavascript\b/i"
let text = "testing: 1, 2, 3"  // sample text
let pattern = /\d+/g; // match all instances of one or more digits;
console.log(text.search(pattern)); // 9 position of first match
console.log(pattern.test(text)) // true a match exists
console.log(text.match(pattern)) //["1","2","3"] :split : array of all matches
console.log(text.replace(pattern, '#')) // "testing: #, #, #" 
console.log(text.split(/\D+/)) // split by non-digit [''  '1'   '2'   '3']
