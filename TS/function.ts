/* 1 函数定义 */
/* # 1.1 直接定义 */
function add(arg1: number, arg2: number): number {
  return arg1 * arg2;
}
const add1 = (arg1: number, arg2: number): number => {
  return arg1 * arg2;
};

function fn(x: number): void {
  console.log(x);
  // return 123; //error
}

let add2: (x: number, y: number) => number;
add2 = (x: number, y: number): number => {
  return x + y;
};
// add2 = (arg1: string, arg2: string): string => arg1 + arg2; // error

/* # 1.2 接口定义 */
interface Add {
  (x: number, y: number): number;
}

// let add3: Add = (arg1: number, arg2: number): string => arg1 + arg2; //error
/* # 1.3 类型别名定义 */
type AddType = (x: number, y: number) => number;
// 使用type关键字可以给任意第那个一的类型起一个别名

/* # 2 函数参数定义 */
// 可选参数
type AddType1 = (x: number, y: number, z?: number) => number;
let addType: AddType = (arg1, arg2, arg3) => arg1 + arg2 + arg3;
// z的类型就是number | undefined; ?并不意味着和undefined|number 一样，必须有显示入参
// type errorAdd = (x?: number, y: number) => number;

// 默认参数
enum Status {
  ON,
  Over,
}
interface Light {
  status: Status;
}
let lightHere: Light = { status: Status.ON };
// 这里会有默认类型推导
const plus = (x: number, y = lightHere) => {
  return y;
};
plus(1, { status: Status.ON });
const subtract = (x: number, y: number | string = 1) => {
  // return x + y;
};

// 剩余参数
// const handleData = (arg1: number, ...args: number[]) => {};


/* # 3 函数重载 */
const handleData = (x: string): number;
// const handleData = (x: number): string;
// const handleData = (x: null): number;
// const handleData = (x: string | number | null): any => {
//   if (typeof x === 'string') {
//     return Number(x);
//   }
//   if (typeof x === 'number') {
//     return String(x);
//   }
//   return -1;
// };
handleData(996)   // "996"
handleData("996") // 996
handleData(false)  // error