/* # 14.1 property attribute */
// every property of object has name and value,but has three associated attributes: writable(是否可变), enumerable（是否迭代用于for/in Object.keys）, configurable(是否可以被删除或者change the attribute of the property )
// 由object literal 定义和 assign 的对象都有这三个 但很多library里的并不是
// data-value 除了这三个还有一个value属性， 
// accessor-value 没有value 属性和writable 属性 他们的可写属性由 the presence or absence of setter; 所有 get,set,enumerable,configurable
// property descriptor , get,set is function , other is boolean value
let descriptor = Object.getOwnPropertyDescriptor({ x: 1 }, "x"); // { value: 1, writable: true, enumerable: true, configurable: true }
function log(...a) {
  console.log(...a);
}
const random = {
  get octet() { return Math.floor(Math.random() * 256) }
}
Object.getOwnPropertyDescriptor(random, "octet"); // { get: [Function: get octet], set: undefined, enumerable: true, configurable: true }
Object.getOwnPropertyDescriptor({}, "x") //undefined no such prop
Object.getOwnPropertyDescriptor({}, "toSting"); //undefined inherit
// Object.getOwnPropertyDescriptor()只能获取own property 无法查看继承属性 // Object.getPrototypeOf()或者 Reflect.getOwnPropertyDescriptor()
// 使用ObJect.defineProperty()挨创建一个属性
let o = {};
Object.defineProperty(o, "x", {
  value: 1,
  writable: true,
  enumerable: false,
  configurable: true
});
o.x; //1
Reflect.ownKeys(o); //['x']
Object.keys(o); //[]
Object.defineProperty(o, "x", {
  writable: false
})
o.x = 2; // fails silently or throw typeError
o.x;// 1
Object.defineProperty(o, "x", { value: 3 });
o.x;//3
Object.defineProperty(o, "x", { get: function () { return 'x' } })
o.x; //x
// 不会更改继承属性
let p = Object.defineProperties({}, {
  x: { value: 3, writable: true, enumerable: false, configurable: true },
  y: { value: 4, writable: true, enumerable: true, configurable: true },
  r: {
    get() { return Math.sqrt(this.x ** 2 + this.y ** 2) + Math.random() },
    enumerable: true,
    configurable: true
  }
})
p.r;//5
// Object.create 也接受第二个参数 和Object.defineproperties 一样
// 如果向Non-extension object 调用 Object.defineProperty()/ Object.defineProperties() 会抛出TypeError
// Object assign 是复制源对象的属性到目标对象 only enumerable value and property value , but not property attributes，like getter return the getter value not function
let ao = Object.assign({}, p);
Object.getOwnPropertyDescriptors(ao); // 没有x

/* # 14.2 Object.extensibility */
// 决定是否允许向object里添加新的属性，默认是可以
// Object.isExtensible(obj) Object.preventExtensions(obj)
// 一旦设置成了不可扩展就不能再变成可扩展  不可扩展只影响object itself 如果加在原型链中，一样会呗object继承 Reflect.isExtensible() Reflect.preventExtensions()
// Object.seal() 除了向ObJect.preventExtensions()一样,还吧所有own property 设置non-configurable ,不可逆，Object.isSealed()来判断
// Object.freeze() tightly 除了上述 还设置read-only 但不会影响accessor setter Use Object.isFrozen() 
// 只影响object 不影响prototype
o = Object.freeze(Object.create(
  Object.freeze({ x: 1 }),
  { y: { value: 2, writable: true, enumerable: true } }));
o.y = 222;

/* # 14.3 The prototype Attribute */
// 原型的属性意味着object 所继承的对象
Object.getPrototypeOf({}) // Object.prototype
Object.getPrototypeOf([]) // Array.prototype
Object.getPrototypeOf(() => { }) //Function.prototype
Reflect.getPrototypeOf;
// isPrototypeOf determine whether an object is the prototype of another; like instanceof 
let zp = { x: 1 };
let np = Object.create(zp, { y: { value: "asd" } });
zp.isPrototypeOf(np); //true
Object.getPrototypeOf({}).isPrototypeOf(zp); //true 
// setPrototypeOf
o = { x: 1 };
p = { y: 2 };
Object.setPrototypeOf(o, p);
o.y;//2
let a = [1, 2, 3];
Object.setPrototypeOf(a, p);
a.join;// undefined a no longer has a join() method
// __proto__
p = {
  z: 3
};
o = {
  x: 1, y: 2,
  __proto__: p
}

/* # 14.4 Well-known Symbol */
// 主要的目的就是为了安全的添加extension 到Object并且不影响兼容性

/* # 14.4.1 Symbol.iterator and Symbol.asyncIterator */
/* # 14.4.2 Symbol.hasInstance */
// 如果instanceof right-hand 有[Symbol.hasInstanceof] 就把左侧作为argument 执行返回结果是一个boolean
let unit8 = {
  [Symbol.hasInstance](x) {
    return Number.isInteger(x) && x >= 0 && x <= 255;
  }
}
// log(18 instanceof unit8) //true
// log(11.1 instanceof unit8) //false

/* # 14.4.3 Symbol.toStringTag */
let strobj = {};
strobj.toString(); //[object Object]
Object.prototype.toString.call();
function classOf(o) {
  return Object.prototype.toString.call(o).slice(8, -1);
}
// es6之前如果使用这个如果是自己定义的类就是返回object
class test {
  get [Symbol.toStringTag]() {
    return "test"
  }
}
let t = new test()
classOf(t); //test

/* # 14.4.4 Symbol.species */
// 用给数组的，用于确定数组使用的的那个构造函数

/* # 14.4.5 Symbol.isConcatSpreadable */
// concat 会把array argument 展开， es6之前用Array.isArray确定，后来算法就变了用Symbol.isConcatSpreadable区判断是否应该展开，如果不存在就还用原来的判断方法
let arrayLike = {
  length: 1,
  0: 1,
  [Symbol.isConcatSpreadable]: true
};
[].concat(arrayLike); // [1]
class nonSpreadable extends Array {
  get [Symbol.isConcatSpreadable]() {
    return false;
  }
}
let nS = new nonSpreadable(1, 2, 3);
[].concat(nS).length; //1

/* # 14.4.6 pattern-matching Symbols */
// match ,search,split,replace,matchAll 都有Symbol.match ... correspond

/* # 14.4.7 Symbol.toPrimitive */
// object 转化规则.如果需要字符串先调用 toString,如果没有这个方法或者返回的不是primitive 调用valueOf  如果没有偏好，就是按照类定义的，除了Date使用toString 其他都是valueOF
// Symbol.toPrimitive 允许改写behavior ，接收参数来表达完成何种转换 default string number 

/* # 14.4.8 Symbol.unscopables */
let newArrayMethods = Object.keys(Array.prototype[Symbol.unscopables]);
// Es6 用这个向array.prototype里新加method


/* # 14.5 Template Tags */
let root = 'lxl';
function html(string, ...args) {
  // console.log(string, args)
}
html`123213${root}asdsad${root}asdasd`
html`asd`;

/* # 14.6 Reflect */
// 其实就是一个组方便的函数集合使用reflect api 输出， 和proxy 集合一 一映射
// Reflect.apply(f, o, args)  相当于 f.apply(o, args);
Reflect.apply(Math.pow, null, [2, 3])
// 构造函数 参数 constroctor 里的new.target 如果没有就是c 
let arr = Reflect.construct(Array, [1, 2, 3], String)
// Reflect.defineProperty(o, name, descriptor) 和Object.defineProperty(o, name, descriptor)几乎一样，只不过返回的是boolean
let obj = {}
Reflect.defineProperty(obj, "x", {
  value: 22,
  writable: true,
  enumerable: true,
  configurable: true,
})
// Reflect.deleteProperty(o, name) delete o[name]
Reflect.deleteProperty(obj, "x")
// Reflect.get(o, name, receiver) 和o[name]几乎一样，只不过可以指定receiver
Reflect.get(obj, "y", { y: 1 })
Reflect.getOwnPropertyDescriptor(obj, "x");
Reflect.getPrototypeOf(o); // 和Object.getPrototypeOf(o)几乎一样，只不过Object 只会在null或者undefined抛出TypeError错误，而Reflect 是primitive value也会报错
// Reflect.getPrototypeOf(0); // TypeError
Object.getPrototypeOf(9) // return {}
// Reflect.has(o,name)
Reflect.has([2], 0); // 和 name in o 基本一致
0 in [2];
Reflect.isExtensible(o); // let
Reflect.ownKeys(o); // 即返回property name 又返回symbol = getOwnPropertynames and getOwnPropertySymbols
obj = {
  a: 1,
  b: 2,
  [Symbol(22)]() { }
}
Reflect.ownKeys(obj); // [ 'a', 'b' ,symbol]
Object.getOwnPropertyNames(obj); // [ 'a', 'b' ]
Object.getOwnPropertySymbols(obj);
Reflect.preventExtensions(obj); // 返回boolean object.preventExtensions(obj) 返回obj 并且不会报错如果不是object
obj.d = 3; // 没有变化
// Reflect.set(o, name, value, receiver)
Reflect.setPrototypeOf(o, p) // return true or false 

/* # 14.7 Proxy Object */
// 是一个class 可以改变object基本行为 ， proxy可以让我们自己实现Reflect里的一些基本操作，创建一些普通对象无法实现的行为对象
// proxy 没有自己的状态和行为，当read, set,define a property 或者其他会派发到handler中
// let proxy = new Proxy(target, handlers) 
// proxy 的操作和Reflect 操作一样 ，比如delete proxy object 就去handler里找deleteProperty()方法，如果有就调用没有的话就直接在target操作，这些所有基础操作的functionname都和Reflect 的一样

let pt = { x: 1, y: 2 };
let pro = new Proxy(pt, {});
pro.x;//1
delete pro.y
pt.y; //undefined
pro.z = 'z';
pt.z; // z
// 可撤销proxy
function accessTheDatabase() { return 2 };
let { proxy, revoke } = Proxy.revocable(accessTheDatabase, {})
proxy();
revoke();
// proxy(); // TypeError
// 比如用在第三方库的时候，为了防止library 恶意修改，可以撤销proxy ,使用后调用revoke

let identify = new Proxy({}, {
  get(o, name, target) { return name },
  has(o, name) { return true },
  ownKeys(o) { throw new RangeError("Infinity") },
  getOwnPropertyDescriptor(o, name) {
    return {
      value: name,
      writable: false,
    }
  },
  set(o, name, value, target) {
    return false
  },
  deleteProperty(o, name) { return false },
  isExtensible(o) { return false }
})
identify.x = 1;
delete identify.x;
identify.x;
identify.toString;
identify[0];
// Object.keys(identify) //RangeError
// for (let p of identify) { }  
// both use original target and the handlers
function readOnlyProxy(o) {
  function readonly() { throw new TypeError("ReadOnly") }
  return new Proxy(o, {
    set: readonly,
    defineProperty: readonly,
    deleteProperty: readonly,
    setPrototypeOf: readonly,
  })
}
o = { x: 1, y: 2 };
p = readOnlyProxy(o);
p.x;
// p.x = 3; // TypeError
// delete p.y  //TypeError
// p.__proto__ = {} ; // TypeErrorb
// p.z = 3; //TypeError
// intercept the operations but still delegate the operations to the targets 所有的都打印
function loggingProxy(o, objname) {
  // Define handlers for our logging Proxy object.
  // Each handler logs a message and then delegates to the target object.
  const handlers = {
    // This handler is a special case because for own properties
    // whose value is an object or function, it returns a proxy rather
    // than returning the value itself.
    get(target, property, receiver) {
      // Log the get operation
      console.log(`Handler get(${objname},${property.toString()})`);
      // Use the Reflect API to get the property value
      let value = Reflect.get(target, property, receiver);
      // If the property is an own property of the target and
      // the value is an object or function then return a Proxy for it.
      if (Reflect.ownKeys(target).includes(property) &&
        (typeof value === "object" || typeof value === "function")) {
        return loggingProxy(value, `${objname}.${property.toString()}`);
      }
      // Otherwise return the value unmodified.
      return value;
    },
    // There is nothing special about the following three methods:
    // they log the operation and delegate to the target object.
    // They are a special case simply so we can avoid logging the
    // receiver object which can cause infinite recursion.
    set(target, prop, value, receiver) {
      console.log(`Handler set(${objname},${prop.toString()},${value})`);
      return Reflect.set(target, prop, value, receiver);
    },
    apply(target, receiver, args) {
      console.log(`Handler ${objname}(${args})`);
      return Reflect.apply(target, receiver, args);
    },
    construct(target, args, receiver) {
      console.log(`Handler ${objname}(${args})`);
      return Reflect.construct(target, args, receiver);
    }
  };
  // We can automatically generate the rest of the handlers.
  // Metaprogramming FTW!
  Reflect.ownKeys(Reflect).forEach(handlerName => {
    if (!(handlerName in handlers)) {
      handlers[handlerName] = function (target, ...args) {
        // Log the operation
        console.log(`Handler ${handlerName}(${objname},${args})`);
        // Delegate the operation
        return Reflect[handlerName](target, ...args);
      };
    }
  });
  // Return a proxy for the object using these logging handlers
  return new Proxy(o, handlers);
}

let data = [10, 20]
let methods = { square: x => x ** 2 }
let proxyData = loggingProxy(data, "data");
let proxyMethod = loggingProxy(methods, "methods");
data.map(methods.square); // [100,400]
proxyData.map(methods.square) // 先查看has 然后再get
// It produces this output:
// Handler get(data,map)
// Handler get(data,length)
// Handler get(data,constructor)
// Handler has(data,0)
// Handler get(data,0)
// Handler has(data,1)
// Handler get(data,1)
// Now lets try with a proxy methods object
data.map(proxyMethod.square) // => [100, 400]
// Log output:
// Handler get(methods,square)
// Handler methods.square(10,0,10,20)
// Handler methods.square(20,1,10,20)
for (let x of proxyData) console.log("Datum", x); // 每次都会检查length

/* # 14.7.1 proxy invariants */
let target = Object.preventExtensions({});
proxy = new Proxy(target, {
  isExtensible() { return true }
})
// Reflect.isExtensible(proxy) 总之意思就是如果咱们代理的descriptor 设置了一些read-only,non-configurable 那么就要遵守，一些方法违反的话就会报错
target = Object.freeze({ x: 1 });
proxy = new Proxy(target, { get() { return 99 } })
// proxy.x; //TypeError
