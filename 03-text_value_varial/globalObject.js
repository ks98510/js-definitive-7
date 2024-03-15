// # globalObject
// the global object is a regular js object that serves a very important purpose
// when the javascript interpreter starts , it creates a new global object and give it an initial set of properties.

// global constants: undefined , Infinity, NaN
// global functions : isNaN ,parseInt(),and Eval()
// constructor functions : Date(),RegExp()
// global objects : String,Number,JSON,Math

// deserve to be treated as reserved words

// In Node there is a keyword called global that is the global object itself
console.log(globalThis);
console.log(global)
console.log(globalThis === global) //true

// In web browsers ,the window Object serves as the global object for all js code 
// web worker thead have a different global object than the window with which are associated 

// window