class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  getPosition() {
    return `(${this.x}, ${this.y})`;
  }
}

const point = new Point(1, 2);
point.getPosition(); // (1, 2)
class A {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  getName() {
    return this.name;
  }
}

class B extends A {
  job: string;
  constructor(name: string, age: number) {
    super(name, age);
    this.job = "IT";
  }
  getJob() {
    return this.job;
  }
  getNameAndJob() {
    return super.getName() + this.job;
  }
}

var b = new B("Tom", 20);
console.log(b.name);
console.log(b.age);
console.log(b.getName());
console.log(b.getJob());
console.log(b.getNameAndJob());
//输出：Tom，20，Tom，IT，TomIT
// public外部可以访问 private外部无法访问 protected 外部无法访问但是继承的子类可以
// readonly 只读

class Parent {
  public static age: number = 18;
  public static getAge() {
    return Parent.age;
  }
}

class Info {
  name: string;
  age?: number;
  // 不用单独在constructor上面单独定义 public sex?:string
  constructor(name: string, age?: number, public sex?: string) {}
}

// 2.类的类型
class People {
  public age: number;
  constructor(public name: string, age: number) {}
}

let people: People = new People("lxl", 1);

/* # 四、类的使用 */
// 抽象类 只能用来继承， 用abstract 声明。
abstract class People1 {}
class UserInfo {
  private name: string;
  constructor() {}
  get userName() {
    return this.name;
  }
}

/* # 五、类的接口 */
interface FoodInterface {
  type: string;
}
class FoodClass implements FoodInterface {
  
}
