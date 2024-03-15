// # boolean values
// every type values can be converted to boolean value.
undefined
null
0
  - 0
''
NaN
// All other values, including all objects work like true;
let o = {}
// === // explicitly compare 显示比较
if (o !== null) { }
if (o) { }

// boolean has only trivial api ,toString
// console.log(true.toString())
// despite trivial api , boolean has three important boolean operators.
true && false
true || false
!false
