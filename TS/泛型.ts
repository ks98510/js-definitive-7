/* 泛型 */
// 允许将类型作为参数传递给另一个类型、函数、或者其他结构 <T> T表示传入的类型，此时T和函数参数工作的方式一样，
function pickObjectKeys(obj, keys) {
  let result = {};
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}
const language = {
  name: "TypeScript",
  age: 8,
  extensions: ["ts", "tsx"],
};

function pickObjectKey<T, K extends keyof T>(obj: T, keys: K[]) {
  let result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}
const ageAndExtensions = pickObjectKey(language, ["age", "extensions"]);

// 2. 在函数中使用泛型
// 分配类型参数
// function identify(value){
//   return value;
// }
function identify<T>(value: T): T {
  return value;
}
const result = identify<number>(123);

// 直接传递类型参数
type ProgrammingLanguage = {
  name: string;
};
interface defaultProps {
  info: Object;
}
const props = identify<defaultProps>({ info: "TypeScript" });

// async function fetchApi(path: string) {
//   const response = await fetch(`https://example.com/${path}`);
//   return response.json();
// }
type User = {
  name: string;
};
async function fetchApi<ResultType>(path: string): Promise<ResultType> {
  const response = await fetch(`https://example.com/${path}`);
  return response.json();
}
const data = fetchApi<User>("/user");

// 3.默认参数类型
const unknowData = fetchApi("/user");
// console.log(unknowData.a); // TypeError

async function fetchApi1<ResultType = Record<string, any>>(
  path: string
): Promise<ResultType> {
  const response = await fetch(`https://example.com/api${path}`);
  return response.json();
}

const s = fetchApi1("/users");

// 4. 类型参数约束
function stringfyObjectKeyValues<T extends Record<string, any>>(obj: T) {
  return Object.keys(obj).reduce(
    (toa, key) => ({
      ...toa,
      [key]: JSON.stringify(obj[key]),
    }),
    {} as { [K in keyof T]: string }
  );
}

/* 在接口、类和类型中使用泛型 */
// 1.接口和类中的泛型
interface MyInterface<T> {
  field: T;
}

class MyClass<T> {
  field: T;
  constructor(field: T) {
    this.field = field;
  }
}
// 2. 自定义类型中的泛型
type MyIdentifyType<T> = T;
type Partia1l<T> = {
  [P in keyof T]?: T[P];
};

// 使用泛型创建映射类型
type BooleanFields<T> = {
  [K in keyof T]: boolean;
};
type UserFetchOptions = BooleanFields<User>;

// 5.使用泛型创建条件类型
type IsStringType<T> = T extends string ? true : false;
// 条件类型 使用infer 在extends 中推断类型。
type GetReturnType<T> = T extends (...args: any[]) => infer U ? U : never;

type A = "abc";
type B = {
  name: string;
};

type ResultA = IsStringType<A>;
type ResultB = IsStringType<B>;
// 高级条件类型
type SomeType = {
  a: {
    b: string;
    c: {
      d: number;
      e: string[];
    };
  };
  g: number | string;
};

type Result = NestedOmit<SomeType, "a.b" | "a.c.e">;
