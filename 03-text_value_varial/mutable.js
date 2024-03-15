// # Immutable primitive values and mutable object references
// the most difference in js between primitive type and object type is that primitive type is immutable and object type is mutable.

// let s = "hello"
// s.toUpperCase() // "HELLO"
// console.log(s)

// let o = { x: 1 }
// o.x = 2;
// o.y = 3;

// let a = [1, 23, 4]
// a[2] = 5;

// let p = { y: 1 }
// console.log(o === p) // false
// let b = [1, 23, 4]
// console.log(a === b) // false/

// object compared by reference
// two object values are the same if and only if they refer to the same underlying object
// let a = []
// let b = a
// b[0] = 1;
// console.log(a === b)

// explicity copy the properties of the object
let a = [1, 2, 3]
let b = []
for (let index = 0; index < a.length; index++) {
  b[index] = a[index]
}
let c = Array.from(b)

// compare two distinct objects , we must compare their properties and elements

function equalArrays(a, b) {
  if (a.length !== b.length) {
    return false
  }
  for (let index = 0; index < a.length; index++) {
    if (a[index] !== b[index]) {
      return false
    }
  }
  return true
}

function equalObjects(a, b) {
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false
  }
  for (let key in a) {
    if (a[key] !== b[key]) {
      return false
    }
  }
  return true
}

