let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 3];
let obj: object;
obj = { name: "TypeScript" };
// 元组
let arr: [string, number];
arr = ["a", "2", false];
interface Tuple extends Array<number | string> {
  0: string;
  1: number;
  length: 2;
}
// 枚举
// enum Roles {
//   SUPER_ADMIN,
//   ADMIN,
//   USER,
// }
enum Roles {
  SUPER_ADMIN = 0,
  ADMIN = 1,
  USER = 2,
}
const superAdmin = Roles.ADMIN;
console.log(Roles[0]);
// any
let value: any;
value = 123;
value = false;
const array: any[] = [1, true];
console.log(array);
// void 只能复制给任意类型
const consoleText = (text: string): void => {
  console.log(text);
};
// never 永远只想不存在的类型,不能把任何类型分配个never 即使是any
const error = (message: string): never => {
  throw new Error(message);
};
let neverError: never = error("error");
const myString = "";

const myInt: number = neverError;
// neverError = '123'; //typeError
// never 代表无法到达终点的函数或者返回值，1.函数抛出错误异常 2.函数包含一个无限循环
console.log(myInt);
// never 和 void 的区别 void 可以是undefined or null 而void 是没有任何返回
const unExpectedResult = (myParam: "this" | "that") => {
  if (myParam === "this") {
  } else if (myParam === "that") {
  } else {
    // myParam
    console.log({ myParam });
  }
};
type Animal = "cat" | "dog" | "bird";

const shouldNotHappen = (animal: never) => {
  throw new Error("error");
};

const myPicker = (pet: Animal) => {
  switch (pet) {
    case "cat":
      return "cat";
    case "dog":
      return "dog";
    case "bird":
      return "bird";
    default:
      return shouldNotHappen(pet);
  }
  return shouldNotHappen(pet);
};
// unknown unknown 主要用来描述不确定的变量，unknown 相对于any更安全 unknown 的事情不能任意操作
let lxl: any;
console.log(lxl.name);
console.log(lxl.toFixed());
console.log(lxl.length);
function getValue(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString();
  }
  return String(value);
}
let result: unknown;
if (typeof result === "number") {
  result.toFixed();
}
// 任何类型的值都可以赋值给unknown类型
let value1: unknown;
value1 = "a";
value1 = 123;
// unknown 只能赋值给unknown 和 any
let value2: unknown;
let value3: string = value2;
value1 = value2;
let value4: unknown;
// value4 += 1; //TypeError 对象类型为unknown
// 只能对unknown进行等或不等操作、不能及进行其他操作；
value1 === value2;
// value1 += value2;
// unknown 类型的值不能访问其属性或者作为函数调用。
