/* array :is an ordered collection of values*/
function log(...arg) {
  console.log(...arg)
}
/* index is zero-based and 32-bits indexes */
Math.pow(2, 32);// 4294967296
/* # 7.1 create arrays */
// Array literals; the ... spread operator on an iterable object;the Array constructor;the Array.of() or Array,from() factory methods.
/* Array literals */
let empty = [];
let primes = [2, 3, 5, 7];
let misc = [1.1, true, "a",]
let base = 1024;
let table = [base, base + 1];
let b = [[1, { x: 1, y: 1 }], [2, { x: 3, y: 4 }]];
/* sparse arrays */
let count = [1, , 3];
let undefs = [, ,];
undefs.length;//2 array literals allow the tailing comma.
/* # 7.1.2 spread operator */
let a = [1, 2, 3];
b = [0, ...a, 4]; //[0, 1, 2, 3, 4]
// the spread operator is convenient to create a (shallow) copy of an array.
let original = [1, 2, 3];
let copy = [...original];
copy[0] = "change value";
original[0]; //1
/* the spread operator can work on any iterable object */
let digits = [..."01234567"];
digits;  //[0, 1, 2, 3, 4, 5, 6, 7]
/* remove duplicate elements */
let letters = [..."hello,world"];
[...new Set(letters)];
/* # 7.1.3 Array constructor */
// with no arguments
a = new Array();
/* with a single numeric argument */
a = new Array(10);
/* explicitly specify two or more array elements */
a = new Array(5, 4, 3, 2, "testing,testing"); //[5, 4, 3, 2, "testing,testing"]
/* # 7.1.4 Array.of()  */
// when we use Array constructor with a single numeric argument, it creates an array with that length, but without any elements.Array.from addresses this.
Array.of();
a = Array.of(10);//[10];
/* # 7.1.5 Array.from() */
/* Array.from() creates a new array from an array-like or iterable object. it works like spread operator */
copy = Array.from(original);
/* make a true-array copy of an array-like object */
// array-like object is an object with a length property and handlers for numeric properties.
let arraylike = {
  1: 1,
  2: 2,
  3: 3,
  length: 7
}
let trueArray = Array.from(arraylike); //[1, 2, 3, undefined, undefined, undefined, undefined]
// Array.from() also accept an optional second argument. second argument is a function and the array stored the value that returned by the function.
// it is more efficient to perform the mapping while array is being build than it is to build to array and then map it to another array.
trueArray = Array.from(arraylike, (arr) => {
  return Math.pow(arr, 2);
})
trueArray; //[1, 4, 9, undefined, undefined, undefined, undefined]

/* # 7.2 reading and writing array elements */
a = ["world"];
let value = a[0];
a[1] = 3.14;
let i = 2;
a[i] = 3;
a[i + 1] = "hello";
a[a[i]] = a[0]
log(a);
// the array automatically maintain its length.
// Remember that arrays are a specialized kind of object.
o = {};
o[1] = "one";
o["1"];// one;
a["1"]; //3.14
/* negative/not integer/floating point, they will convert to string as a property name */
a[-1.23] = "asdas";
// a["1000"] = 0;i
a[1.111] = 1;//[ 'world', 3.14, 3, 'world', '-1.23': 'asdas', '1.111': 1 ]
log(a);
a.forEach(i => {
  // log(i)
})// world,3.14,3,world 
// index is the special type of object property name.

/* sparse arrays */
a = new Array(5);
a = [];
a[1000] = 0;
//  looking up elements in such an array will take about as much time as regular object property lookup.
let a1 = [,]; // has no elements;
let a2 = [undefined]; // has one element
0 in a1; //false;
0 in a2; // true;

/* # 7.4 array length */
[].length;
["1", "2", "3"].length;
/* two behaviors to maintain this invariant */
/* 1.  if you assign a value to an array element whose index i is greater than or equal to the array’s current length, the value of the length property is set to i+1.*/
/* 2. The second special behavior that arrays implement in order to maintain the length invariant is that, if you set the length property to a non-negative integer n smaller than its current value, any array elements whose index is greater than or equal to n are deleted from the array: */
a = [1, 2, 3, 4, 5];
a.length = 3; // [1,2,3]
a.length = 0; // []
a.length = 5;  //[<5 empty items>]

/* 7.5 adding adn deleting array elements */
a = [];
a[0] = "zero";
/* push , pop ,unshift ,shift */
/* delete */
a = [1, 2, 3];
// delete a[2];
// 2 in a; //false
delete a[0];
log(a); //[<1 empty item>,2,3]
log(0 in a); //false
log(a.length); //3 delete doesn't affect array length.
/* splice */

/* # 7.6 iterating arrays */
/* for/of */
let string = "";
for (let letter of letters) {
  string += letter;
}
log(string)  // => "Hello world"; we reassembled the original text
/* if you want to know the index . use entries */
let everyOther = "";
for (let [index, letter] of letters.entries()) {
  if (index % 2 === 0) everyOther += letter
}
/* forEach */
let uppercase = "";
letters.forEach((letter, index) => {
  uppercase += letter.toUpperCase();
})
uppercase; // => "HELLO WORLD"
// it is aware of sparse array and doesn't invoke function for elements that are not there.
/* use for */
/* in the nested loop */
// Save the array length into a local variable
for (let i = 0, len = letters.length; i < len; i++) {
  // loop body remains the same
}

// Iterate backwards from the end of the array to the start
for (let i = letters.length - 1; i >= 0; i--) {
  // loop body remains the same
}

/* # 7.7 multidimensional arrays */
// Create a multidimensional array
table = new Array(10);               // 10 rows of the table
for (let i = 0; i < table.length; i++) {
  table[i] = new Array(10);            // Each row has 10 columns
}

// Initialize the array
for (let row = 0; row < table.length; row++) {
  for (let col = 0; col < table[row].length; col++) {
    table[row][col] = row * col;
  }
}

/* # 7.8 array methods */
/* # 7.8.1 iterator methods  */
// three arguments : value ,index, and array
[1, 2, 3].forEach((i, index, arr) => { });
/* most of the iterator methods accept an optional second argument . second argument you pass becomes the value of the this keyword inside of the function you pass as the first argument. */
/* forEach */
const person = {
  name: 'Alice',
  sayHello: function () {
    console.log(`Hello, my name is ${this.name}.`);
  }
};

const names = ['Bob', 'Charlie', 'Dave'];
names.forEach(person.sayHello, person);
// there is no equivalent of the break statement you can use with a regular for loop;
let data = [1, 2, 3, 4, 5], sum = 0;
// Compute the sum of the elements of the array , use throw an error
try {
  data.forEach(value => {
    if (value == 3) throw new Error('it my turn')
    log(value);
  });
} catch (error) {

}
/* map:return new array and doesn't modify the ordinary array */
a = [1, 2, 3];
a.map(i => i ** 2);
/* filter:function should be a predicate return true or false */
a = [5, 4, 3, 2, 1];
a.filter(x => x < 3)         // => [2, 1]; values less than 3
a.filter((x, i) => i % 2 === 0) // => [5, 3, 1]; every other value
// skip missing element and return dense array,
let sparse = [, , , 1, 1,];
let sense = [, , , 1, 1,].filter(() => true); // => [1, 1];
a = a.filter(x => x !== undefined && x !== null);
sparse.filter(x => x && x);
/* find() adn findIndex() */
/* find stop iterating the first time the predicate function return truthy value,and return the value.findIndex return the index */
/* if no matching element, return -1 and undefined */
a = [1, 2, 3, 4, 5];
a.findIndex(x => x === 3);// => 2
a.findIndex(x => x === 6);//-1
a.find(x => x % 5 === 0);//5;
a.find(x => x % 7 === 0); //undefined
/* every() and some() : array predicate */
a.every(x => x < 10); // true;
a.every(x => x % 2 === 0); //false
/* some() */
a.some(x => x % 2 === 0); //true;
a.some(isNaN); //false
/* note that both every and some stop iterating array element as soon as they know what value to return */
log([].every(isNaN)); // true
[].some(isNaN); //false
/* reduce(),reduceRight() */
a.reduce((x, y) => x + y, 0); // 15 the sum of the value;
a.reduce((x, y) => x * y, 1); // 120 the product of the values;
a.reduce((x, y) => (x > y) ? x : y);// 5 the largest value;
// reduce need two arguments. the first is the function .the second is an initial value.
// function used with reduce has four arguments : accumulate result ,value,index,array;
// on the first call to the function,the first argument is the initial value.
// calling reduce() on an empty array without initial value will throw an TypeError.
// [].reduce(()=>{}); // Reduce of empty array with no initial value
a.reduce((total, x, index, array) => {
  total += x;
  // log(total, x, index, array)
  return total;
}, 10);
/* rightReduce: from the hight index to low  */
a = [2, 3, 4];
a.reduceRight((acc, val) => {
  let ret = Math.pow(val, acc);
  log(acc, val, ret);
  return ret
});
/* neither reduce nor reduceRight can accept an optional argument   */
/* Any function that can combine two values (such as two objects) into one value of the same type can be used as a reduction function */

/* # 7.8.2 flattening arrays with flat and flatMap() */
[1, [2, 3]].flat(); // [1, 2, 3] ;the argument is the depth of the flattening,default is 1.
[1, [2, [3, [4]]]].flat(); //[ 1, 2, [ 3, [ 4 ] ] ]
a = [1, [2, [3, [4]]]];
a.flat(2) //[ 1, 2, 3, [ 4 ] ]
a.flat(Infinity)
/* a.flatMap() is same as (but more efficient than) a.map(f).flat() */
let phrases = ["hello world", "the definitive guide"];
let words = phrases.flatMap(phrase => phrase.split(" "));
log(words); // => ["hello", "world", "the", "definitive", "guide"];
log([-2, -1, 1, 2].flatMap(i => i < 0 ? [] : Math.sqrt(i))); //[1,2**0.5];
log([-2, -1, 1, 2].map(i => i < 0 ? [] : Math.sqrt(i))); //[[],[],1,2**0.5]

/* # 7.8.3 adding arrays with concat():create an array and return */
a = [1, 2, 3];
a.concat(4, 5); // [1, 2, 3, 4, 5]
a.concat([4, 5], [6, 7]); // [1, 2, 3, 4, 5, 6, 7]
a.concat([[4, 5], [6, 7], 8, 9]); // [1, 2, 3, [4, 5], [6, 7], 8, 9]; // doesn't flatten ;
a; // [1, 2, 3] // doesn't modify the original array;
// it's an expensive operator ; it makes a new copy of the array . a=a.concat(x); we should use push() instead of it.

/* # 7.8.4 stacks and queues with push() ,pop(),shift(),unshift() */
/* stacks push,pop */
/* push, add one or more new element to the end of array and return the new length.it doesn't flatten the array lick concat() */
/* pop does the reverse:delete the last element and return it .decrement the length , */;
let stack = [];
stack.push(1, 2); // [1, 2]
stack.pop(); //[1];return 2;
stack.push(3); //[1,3];
stack.pop(); //[1] return 3;
stack.push([4, 5]); //[1,[4,5]]
stack.pop(); // [1];return [4,5];
stack.pop(); // []; return 1;
/* use spread operator to flatten it explicitly */
a.push(...[1, 2, 3]); // [1,2,3,1,2,3]
a.push(...[2, 3, [4, 5]]); // [ 1, 2, 3, 1, 2, 3, 2, 3, [ 4, 5 ] ]
/* unshift shift the existing array elements up to higher, add one or more new elements to the beginning of the array,return the new length */
/* shift remove and return the first element ,shifting all subsequent elements down one place to occupy the newly vacant space at the start of the array.  */
/* we can implement a queue with unshift and shift ,but it is less efficient than push and pop because the element should be shifted down or up every time. */
/* we can use the push and shift to implement a queue structure. */
let q = [];
q.push(1, 2);
q.shift(); // [2] return 1
q.push(3); // [2,3]
q.shift(); //[3] return 2;
q.shift(); // [] return 3;
/* a feature of the unshift */
a = [];
a.unshift(1);
a.unshift(2);
a; //[2,1]
a = [];
a.unshift(1, 2)
a; //[1,2]

/* # 7.8.5 SubArrays with slice(),splice(),fill(),copyWithin() */
// methods for extracting ,replacing,filling,and copying slice.
/* Slice() */
/* two arguments specify the start and the end of the slice to be returned */
// contains the element specified by the first argument and all subsequent elements up to , but not including ,the second argument.
// if there is only one argument , return the subsequent from the position to the end.  if either argument is negative , it specifies an array element relative to the length of the array.
// -1=> the last element ,slice doesn't modify the array.
a = [1, 2, 3, 4, 5];
a.slice(0, 3); // [1,2,3]
a.slice(3); //[4,5];
a.slice(1, -1); // [2,3,4]
a.slice(-3, -2); //[3]
log(a.slice(-2, -3));// []
a.slice(4, 3); // []
/* Splice */
/* it is the general-purpose method for inserting or removing elements,modify the array on which it is invoked */
/* insert and delete or perform both */
/* the first argument specifies the position at which the insertion and/or deletion is to begin */
/* the second argument specifies the number of the elements that should be deleted from the array (another differences between the slice and splice),
   if this second argument is omitted , all elements from the start to the end of array are removed.
   return an array of the element that be removed.
*/
