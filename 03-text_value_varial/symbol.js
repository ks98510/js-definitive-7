// # symbol
// symbols are introduced in Es6 to server as non-string property names.

let strname = "string name";
let symname = Symbol("propname")
console.log(typeof strname) // string
console.log(typeof symname) // Symbol

let o = {};
o[strname] = 1;
o[symname] = 2;
console.log(o[strname])
console.log(o[symname])

// to obtain a Symbol value ,we can use Symbol(). the function never returns the same results twice ,even when called with the same arguments

// in practice , Symbols serve as a language extension mechanism.
// symbol 被引入是当es6引入了for/of 云环和可迭代对象是，需要定义标准方法使方法类可以迭代。但用任何字符串作为属性名，都可能会与标准方法冲突，所以使用了符号名称代替。

console.log(Symbol('hello').toString())
console.log(Symbol('hello') === Symbol('hello')) //FALSE

// Symbol.for()  it provide a registry for symbols.
let s = Symbol.for("shared");
let t = Symbol.for("shared");
console.log(s === t)
console.log(s.toString()) // Symbol(shared)

// Symbol.keyFor() it returns the key of the symbol in the registry.
console.log(Symbol.keyFor(t)) //shared