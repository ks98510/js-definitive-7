/* 枚举类型 */
// 给一些难以利己的常量赋予一组有意义的名字，使名字更加的直观。Ts 支持数字和字符串的枚举
// enum Day {
//   SUNDAY,
//   MONDAY,
//   TUESDAY,
//   WEDNESDAY,
//   THURSDAY,
//   FRIDAY,
//   SATURDAY,
// }
// 默认从0开始
// enum Day {
//   SUNDAY = 0,
//   MONDAY = 1,
//   TUESDAY = 2,
//   WEDNESDAY = 3,
//   THURSDAY = 4,
//   FRIDAY = 5,
//   SATURDAY = 6,
// }

console.log(Day.SUNDAY);

enum AppType {
  WEB = "web",
  APP = "app",
}

let a = "st";
if (a === AppType.APP) {
}

/* 1. 数字枚举 */
// 默认从0 开始如果从index开始递增
enum Color {
  Red = 2,
  Blue,
  Yellow,
}
// 可以对一个字段指定一个索引，如果没有就会依次加1
enum Status {
  Ok = 200,
  Created,
  Accepted,
  BadRequest = 400,
  Unauthorized,
  Forbidden,
  NotFound,
  InternalServerError,
  NotImplemented,
  BadGateway,
  ServiceUnavailable,
  GatewayTimeout,
  HTTPVersionNotSupported,
  NetworkConnectTimeoutError,
}
enum OtherStatus {
  Success = 200,
  NotFound = 404,
  Error = 500,
}
// 可以使用计算值或者常量但是后面的必须跟初始值
const getValue = (): number => {
  return 1;
};
enum ErrorIndex {
  a = getValue(),
  // b, // 必须初始化
}

// 字符串枚举
enum Message {
  Error = "Sorry,error",
  Success = "Hoho,success",
  ClientError = Error,
}
console.log(Message.Error);

// 使用枚举值使用其他成员

// 3.反向映射 通过Enum.key 获取对应值
enum Status {
  Success = 200,
  Error = 500,
}

let statusObj = {
  Success: 200,
  NotFound: 404,
  200: "Success",
  500: "NotFound",
};

// 4.异构枚举 //既有数字类型又有字符类型
enum Result {
  Faild = 0,
  Success = "Success",
}

// 5.常量枚举  如果不需要编译后的对象
const enum Animal {
  Dog,
  Cat,
}

var Status;
(function (Status) {
  Status[(Status["Off"] = 0)] = "Off";
  Status[(Status["On"] = 1)] = "On";
})(Status || (Status = {}));
var status = Status.On;
var animal = 0; // Dog

// 6.枚举成员类型和联合枚举类型
// 枚举成员类型
enum Animal {
  Dog = 1,
  Cat = 2,
}

interface Dog {
  type: Animal.Dog;
}
interface Cat {
  type: Animal.Cat;
}

let cat: Cat = {
  type: Animal.Cat,
};

// 联合枚举类型
enum Status {
  Off,
  On,
}

interface Light {
  status: Status;
}

let light1: Light = {
  status: Status.Off,
};
// 实际上就是两个枚举一起联合使用

// 枚举合并
enum Day {
  SUNDAY,
  MONDAY,
  TUESDAY
 }

enum Day {
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY
 }
