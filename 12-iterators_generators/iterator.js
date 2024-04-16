// for/of spread operator
let sum = 0;
for (let i of [1, 2, 3]) {
  sum += i;
}
function log(...args) {
  console.log(...args);
}
// ...
[..."abcds"];
let [r, x, b, a] = Uint8Array.of(225, 0, 225, 128);
let map = new Map([["key", "value"]]);
for ([key, value] of map) { }
let s = new Set("a,b,c");
s = new Set(["a", "b"]);

/* how Iterator works */
// iterable object ; iterable object itemself; iteration result
// iterable object has a next() value,done 调用next，直到done变成true ， 用Symbol.iterator 来命名属性名称。
let iterable = [99];
let iterator = iterable[Symbol.iterator]();
for (let res = iterator.next(); !res.done; res = iterator.next()) {
  // log(res.value);
  // log(res.done);
}
let list = [1, 2, 3, 4];
let iter = list[Symbol.iterator]();
let head = iter.next().value;
[...iter];  //[2,3,4]

/* implementing iterable Object */
// 如何实现一个可迭代对象，必须有一个Symbol.iterator 属性，调用之后返回一个iterable对象，必须包含一个next（）方法和value done属性
class Range {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }
  [Symbol.iterator]() {
    let next = Math.ceil(this.from);
    let last = this.to;
    return {
      next() {
        return (next <= last) ? { value: next++ } : { done: true }
      },
      [Symbol.iterator]() { return this }
    }
  }
}
for (let x of new Range(1, 10)) x; // Logs numbers 1 to 10
[...new Range(-2, 2)] // => [-2, -1, 0, 1, 2]
function fmap(iterable, f) {
  let iterator = iterable[Symbol.iterator]()
  return {
    [Symbol.iterator]() {
      return this
    },
    next() {
      let v = iterator.next();
      if (v.done) {
        return v
      }
      else {
        return { value: f(v.value) }
      }
    }
  }
}
let imap =
  fmap(new Range(1, 4), x => x ** 2)[Symbol.iterator]();
// log(imap)
// log(imap.next())

// log(imap.next())

// log(imap.next())

// log(imap.next())

// log(imap.next())

// log(imap)
function filter(iterable, predicate) {
  let iterator = iterable[Symbol.iterator]();
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      for (; ;) {
        let v = iterator.next();
        if (v.done || predicate(v.value)) {
          return v;
        }
      }
    }
  }
}
[...filter(new Range(1, 10), x => x % 2 === 0)]

/* # 12.2.1 closing an iterator : return */
// 使用return 返回一个可迭代对象来停止迭代

/* # 12.3 generator */
// generator is a kind of iterator. 迭代的不是数据结构成员，而是计算结果时非常有用
// 首先声明一个generator 函数 function* ,调用返回一个generator object , it is a iterator ；invoke next until it reaches yield ,yield is like return
function* oneDigitPrimes() {
  yield 2;
  yield 3;
  yield 4;
}
let primes = oneDigitPrimes()
primes.next().value; //2
primes.next().value //3
primes.next().value //2
primes.next().value // undefined
primes.next().done //true
primes[Symbol.iterator]();
[...oneDigitPrimes()]  //[2,3,4]
// expression definition
const seq = function* (from, to) {
  for (let i = from; i <= to; i++) {
    yield i;
  }
}
// in the class or object, we can omit the function keyword
let o = {
  *g() {
    for (let i = 0; i < 10; i++) {
      yield i;
    }
  }
};
[...o.g()];

/* # 12.3.1 generator examples */
function* fibonacciSequence() {
  let x = 0, y = 1;
  for (; ;) {
    yield y;
    [x, y] = [y, x + y];
  }
}
function fibonacci(n) {
  for (let f of fibonacciSequence()) {
    if (n-- <= 0) return f;
  }
}
fibonacci(20)
function* take(n, iterable) {
  let it = iterable[Symbol.iterator]();
  while (n-- > 0) {
    let next = it.next();
    if (next.done) return;
    else yield next.value;
  }
};
[...take(5, fibonacciSequence())];
function* zip(...iterables) {
  let iterators = iterables.map(i => i[Symbol.iterator]());
  let index = 0;
  while (iterators.length > 0) {
    if (index >= iterators.length) {
      index = 0;
    }
    let item = iterators[index].next();
    if (item.done) {
      iterators.splice(index, 1);
    }
    else {
      yield item.value;
      index++;
    }
  }
};
[...zip(oneDigitPrimes(), "an", [1, 2])]; // [ 2,   'a', 1, 3,'n', 2,   4]‘

/* yield* and recursive generator */
function* sequence(...iterators) {
  for (let iterator of iterators) {
    for (item of iterator) {
      yield item
    }
  }
}
// yield* 不返回single value , return every value
function* sequence(...iterators) {
  for (let iterator of iterators) {
    yield* iterator;
  }
  iterators.forEach(i => yield* i); //Error  yield and yield* only can use in generator function.
}

/* # advanced generator feature */
// pause the computing

/* 12.4.1 the return value of a generator function */
function* oneAndDone() {
  yield 1;
  return "done";
}
[...oneAndDone()];
let generator = oneAndDone();
generator.next();
generator.next() // { value: "done", done: true }
generator.next() // { value: undefined, done: true }

/* # 12.4.2 the value of a yield expression */
function* smallNumbers() {
  console.log("next() invoked the first time; argument discarded");
  let y1 = yield 1; // y1 == "b"
  console.log("next() invoked a second time with argument", y1);
  let y2 = yield 2; // y2 == "c"
  console.log("next() invoked a third time with argument", y2);
  let y3 = yield 3; // y3 == "d"
  console.log("next() invoked a fourth time with argument", y3);
  return 4;
}
let g = smallNumbers();
// console.log("generator created; no code runs yet");
// let n1 = g.next("a"); // n1.value == 1
// console.log("generator yielded", n1.value);
// let n2 = g.next("b"); // n2.value == 2
// console.log("generator yielded", n2.value);
// let n3 = g.next("c"); // n3.value == 3
// console.log("generator yielded", n3.value);
// let n4 = g.next("d"); // n4 == { value: 4, done: true }
// console.log("generator returned", n4.value)
function* foo(x) {
  let y = 2 * (yield (x + 1))
  let z = 2 + (yield (y / 3))
  return (x + y + z)
}
let f = foo(3);
log(f.next());
log(f.next(6)); // y = 2*6; return 4
log(f.next(24)); // z = 24; y =12 x = 1 37

/* # 12.4.3 return throw */
/* summary */
/* 
• The for/of loop and the ... spread operator work with iterable objects.
• An object is iterable if it has a method with the symbolic name [Symbol.itera
tor] that returns an iterator object.
• An iterator object has a next() method that returns an iteration result object.
• An iteration result object has a value property that holds the next iterated value,
if there is one. If the iteration has completed, then the result object must have a
done property set to true.
• You can implement your own iterable objects by defining a [Symbol.iterator]
() method that returns an object with a next() method that returns iteration
result objects. You can also implement functions that accept iterator arguments
and return iterator values.
• Generator functions (functions defined with function* instead of function) are
another way to define iterators.
• When you invoke a generator function, the body of the function does not run
right away; instead, the return value is an iterable iterator object. Each time the
next() method of the iterator is called, another chunk of the generator function
runs.
• Generator functions can use the yield operator to specify the values that are
returned by the iterator. Each call to next() causes the generator function to run
up to the next yield expression. The value of that yield expression then
becomes the value returned by the iterator. When there are no more yield
expressions, then the generator function returns, and the iteration is complete.
340 | Chapter 12: Iterators and Generators

*/