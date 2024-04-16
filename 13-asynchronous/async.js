// Promise; async/await; for/await 
/* asynchronous programming with callback */
/* # 13.1 CallBack() */
/* # 13.1.1 Timers */
setTimeout(() => { }, 100);

/* # 13.1.2 Events */
// event-driven
let key = { addEventListener: () => { } }
key.addEventListener('click', () => { });
function log(...args) {
  console.log(...args);
}
// log(XMLHttpRequest)
/* # 13.1.3 NetWork Events */
function getCurrent(cb) {
  let request = new XMLHttpRequest()
  request.open('get', "http:www.baidu.com");
  request.send();
  request.onload = () => {
    log(request);
  }
  request.onerror = (e) => {
    log(e);
  }
}
// getCurrent(() => { })

/* # 13.1,4 CallBack and Event In Node */
const fs = require('fs');
const { request } = require('http');
fs.readFile('./package.json', (err, data) => {
  if (err) {
    // log(err);
  } else {
    log(data);
  }
})
function getText(url, callBack) {
  request = https.get(url);
  request.on('response', res => {
    let httpStatus = res.statusCode;
    res.setEncoding('utf8');
    res.on('data', chunk => {
      callBack(chunk);
    })
    res.on('end', () => {
      log('end');
    })
  })
}


/* # 13.2 Promise */
// Promise is a object that represent the result of the asynchronous computation ,the result may or may not be ready yet.
// 看起来虽然和回调差不多，但是optimize ;
// one problem of callback is that it is common to end up with callback in side callbacks 也就是我们说的回调地狱 difficult to read. Promise allow them as promise chaining 
// Another problem is that it is difficult to handling error in the callback ,Promise provide a standard way .

/* # 13.2.1 Using Promise */
function handler(res) { }
function handlerError(err) { }
function getJSON(url) {
  return new Promise(() => { })
}
let url = '';
// handler Error  当同步错误发生的时候，错误会传递给堆栈上的调用者，但是在异步计算的时候，调用者并不在堆栈上。 
getJSON(url).then(handler, handlerError)
// catch is only a short-hand for calling then with null first argument and the specified error handler function as the second argument
getJSON(url).then(handler).catch(handlerError)
// terminology of promise : fulfilled rejected like human promise (keep broken)  ; pending ;settled

/* # 13.2.2 Promise Chaining */
getJSON(url)
  .then(res => res.json())
  .then(handler);
/* fetch('').then(res => {
  res.json().then(profile => { })
}) */
// preferred idiom
// fetch('')
//   .then(res => {
//     return res.json()
//   })
//   .then(profile => { })
/* fetch(theURL) // task 1; returns promise 1
  .then(callback1) // task 2; returns promise 2
  .then(callback2); // task 3; returns promise 3
 */

/* # 13.2.3 resolve promise */
// function c1(res) {
//   let p4 = res.json()
//   return p4
// }
// function c2(profile) {
//   //
// }
// let p1 = fetch('');// promise 1, task 1
// let p2 = p1.then(c1); // promise 2, task 2
// let p3 = p2.then(c2); // promise 3, task3

/* More */
// catch 
p = new Promise(() => { });
p.then(null, handlerError);
p.catch(handlerError)
  .finally()
// 重复处理
// queryDataBase()
//   .catch(e => wait(500).then(queryDataBase))
//   .then(displayTable)
//   .catch(displayDataBaseError)

/* # 13.2.5 promise in parallel */
// Promise.all([p1, p2, p3]) take an array of the promise objects and return a promise; return reject if any of the promise is rejected,return the value of the first promise that is resolved
let urls = [];
urls.map(url => fetch(url).then(r => r.text()))
Promise.all(urls)
  .then(bodies => { })
  .catch(e => console.error(e));
// 如果不是promise object  就会被视为 fulfilled promise object, 只要有一个reject immediately reject.
// Promise.allSettled never reject , return an array of object with status and value or reason
// Promise.race return the first promise that is settled (如果有non-promise,直接返回)

/* # 13.2.6 Making promise */
// promise based on other promise
function sb(url) {
  return getJSON().then()
}
// promise based on synchronous values
Promise.resolve(1); // 返沪一个promise 并且立即fulfilled 
let err = Promise.reject(1);
err.catch(e => { })
// promise from scratch 从0开始 promise Constructor (resolve,reject)
function wait(duration) {
  return new Promise((resolve, reject) => {
    if (duration < 0) {
      reject(new Error('error'))
    }
    setTimeout(resolve, duration)
  })
}
const http = require('http');
function getJSON(url) {
  return new Promise((resolve, reject) => {

  })
}

/* # 13.2.7 promise in Sequence */
// 如果url长度不固定
function fetchSequence(urls) {
  const bodies = [];
  function fetchOne(url) {
    return fetch(url)
      .then(r => r.text())
      .then(body => {
        bodies.push(body);
      })
  }
  let p = Promise.resolve(undefined);
  for (url of urls) {
    p = p.then(() => fetchOne(url))
  }
  return p.then(() => bodies)
}
function promiseSequence(inputs, promiseMaker) {
  // Make a private copy of the array that we can modify
  inputs = [...inputs];
  // Here's the function that we'll use as a Promise callback
  // This is the pseudorecursive magic that makes this all work.
  function handleNextInput(outputs) {
    if (inputs.length === 0) {
      // If there are no more inputs left, then return the array
      // of outputs, finally fulfilling this Promise and all the
      // previous resolved-but-not-fulfilled Promises.
      return outputs;
    } else {
      // If there are still input values to process, then we'll
      // return a Promise object, resolving the current Promise
      // with the future value from a new Promise.
      let nextInput = inputs.shift(); // Get the next input value,
      return promiseMaker(nextInput) // compute the next output value,
        // Then create a new outputs array with the new output value
        .then(output => outputs.concat(output))
        // Then "recurse", passing the new, longer, outputs array
        .then(handleNextInput);
    }
  }
  // Start with a Promise that fulfills to an empty array and use
  // the function above as its callback.
  return Promise.resolve([]).then(handleNextInput);
}
function fetchBody(url) { return fetch(url).then(r => r.text()) };
promiseSequence([], fetchBody)
  .then(bodies => { })
  .catch(err => console.error(err))

function sequence(promises) {
  promises = [...promises];
  function handlerNextPromise(outputs) {
    if (outputs.length === 0) { return outputs };
    let nextPromise = promises.shift();
    return promises().then()
  }
}


/* async await */
/* # 13.3.1 await */
// 定义一个async 说明返回值是一个promise
async function getHighScore() {
  let response = await fetch('');
  let scores = await response.json();
  return scores[0].score;
}
// nested await
async function displayHighScore() {
  displayHighScore(await getHighScore())
  getHighScore().then(displayHighScore).catch(console.error)
}

/* # 13.3.3 awaiting multiple promises */
async function getObj(url) {
  let response = await fetch(url);
  let body = await response.json();
  return body;
}
async function some() {
  let r1 = await getObj(1);
  let r2 = await getObj(2);
  // we should use promise.all;
  let [r3, r4] = await Promise.all([getObj(3), getObj(4)])
}

/* # 13.3.4 implement detail */
async function f(x) { };
function f(x) {
  return new Promise((resolve, reject) => {
    try {
      resolve((function (x) { }(x)))
    } catch (error) {
      reject(error)
    }
  })
}

/* # 13.4 Asynchronous iteration */
// promise适合解决single computation 但是没法处理重复like setInterval , Node stream or  click in web browser ;for/await is the solution
async function parseFile(filename) {
  let stream = fs.createReadStream(filename, { encoding: "utf-8" })
  for await (let chunk of stream) {
    parseChunk(chunk);
  }
  let urls = [1, 2, 3], promises = urls.map(url => fetch(url));
  for (const promise of promises) {
    const response = await promise;
    handler(response);
  }
  // use for/await
  for await (const response of promises) {
    handler(response);
  }
}

/* # 13.4.2 Asynchronous Iterators */
// 和regular iterator 的两个区别 ： 1.[Symbol.asyncIterator] instead of [Symbol.iterator] 2. the next function return a promise instead of a iterator result object.

/* # 13.4.3 Asynchronous Generators */
function elapsedTime(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function* clock(interval, max = Infinity) {
  for (let count = 1; count <= max; count++) {
    await elapsedTime(interval);
    yield count;
  }
}
async function test() {
  for await (let tick of clock(300, 100)) {
    log(tick);
  }
}

/* # 13.4.4 implement asynchronous iterator */
function clock(interval, max = Infinity) {
  function util(time) {
    return new Promise(resolve => setTimeout(resolve, time - Date.now()));
  }
  return {
    startTime: Date.now(),
    count: 1,
    async next() {
      if (this.count > max) {
        return { done: true }
      }
      let targetTime = this.startTime + this.count * interval;
      await util(targetTime);
      return { value: this.count++ }
    },
    [Symbol.asyncIterator]() { return this }
  }
}
class AsyncQueue {
  constructor() {
    this.values = [];
    this.resolvers = [];
    this.closed = false;
  }
  enqueue(value) {
    if (this.closed) throw new Error("closed");
    if (this.resolvers.length > 0) {
      const resolve = this.resolvers.shift();
      resolve(value)
    }
    else {
      this.values.push(value);
    }
  }
  dequeue() {
    if (this.value.length > 0) {
      const value = this.values.shift();
      return Promise.resolve(value);
    }
    else if (this.closed) {
      return Promise.resolve(AsyncQueue.EOS);
    }
    else {
      return new Promise(resolve => { this.resolvers.push(resolve) })
    }
  }
  close() {
    while (this.resolvers.length > 0) {
      this.resolvers.shift()(AsyncQueue.EOS)
    }
    this.closed = true
  }
  [Symbol.asyncIterator]() { return this }
  next() {
    return this.dequeue().then(value => value === AsyncQueue.EOS ? { done: true, value: undefined } : { value: value, done: false })
  }
}
AsyncQueue.EOS = Symbol("end-of-stream")
