/* 接口类型 */
// interface Info {
//   firstName: string;
//   lastName: string;
// }
// const getFullName = ({ firstName, lastName }: Info): string => {
//   return `${firstName} ${lastName}`;
// };

/* 接口属性 */
// 1. 可选属性
const getVegetables = ({ color, type }: Vegetables) => {
  return `A${color ? color + " " : ""}${type}`;
};
interface Vegetables {
  color?: string;
  type: string;
}

// 2. 只读属性
interface Role {
  readonly 0: string;
  readonly 1: string;
}
const role: Role = {
  0: "admin",
  1: "user",
};
// role[0] ='123'; // typeError
// 如果是primitive 就用const 如果是object 就用interface readonly
const NAME: string = "123";
// NAME = "HAH"; // ERROR
const obj = {
  name: "typeScript",
};
obj.name = "javascript";

interface nameInfo {
  readonly name: string;
}
const nInfo: nameInfo = {
  name: "typeScript",
};
// nInfo.name = '1';

// 3. 多余属性检查
// getVegetables({ type: "name", size: "big" });
// 如果想绕开多余属性检查
// 使用类型断言
getVegetables({ type: "tomato", size: "big" } as Vegetables);
// 添加索引签名
interface Vegetables {
  color?: string;
  type: string;
  [propName: string]: any;
}
getVegetables({
  color: "red",
  type: "tomato",
  size: 12,
  price: 1.2,
});

/* # 接口使用 */
// 1.定义函数类型
interface AddFunc {
  (num1: number, num2: number): number;
}
type AddFunc1 = (num1: number) => number;

// 2.定义索引类型
const role1 = {
  0: "amin1",
  1: "user",
};
const role2 = {
  s: "s",
  a: "a",
};
interface RoleDic {
  [id: number]: string;
}
interface RoleDic1 {
  readonly [id: string]: string;
}
// 索引 1 和 '1'一样

/* 高级用法 */
// 1. extend interface
interface Fruits {
  color: string;
}
interface Apple {
  color: string;
  size: "";
}
interface Food {
  type: string;
}
interface Banana extends Fruits, Food {
  size: "";
}
// 不兼容报错
// interface Orange extends Fruits {
//   color: number;
// }

// 2. 混合类型接口
let count: number = 0;
const counter = () => count++;
interface Counter {
  (): void;
  count: number;
}
const getCounter = (): Counter => {
  const c = () => {
    c.count++;
  };
  c.count = 0;
  return c;
};

/* # 类型别名 */
// 1. 基本使用
type Counter3 = {
  count: number;
};
type Name = number | string;
type Veg = { color: string; radius: number } & {
  color: string;
  length: number;
};
let arg: Veg = {
  color: "ss",
  radius: 1,
  length: 1,
};

// 2. 与接口的区别
// 重复定义接口，属性会叠加
interface Vegetables {
  radius: string;
}
let a: Vegetables = { type: "s", radius: "1" };
// type是不能重复得加定义的
