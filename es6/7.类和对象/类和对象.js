//在Javascript中，每个对象都有一个原型对象。所有的Javascript对象都从它们的原型对象里继承方法和属性
/*
//ES5
function Animal(name){
  this.name = name;
  this.speak = function(){
    console.log(this.name + ' speak!');
  }
}
var animal = new Animal('dog');
animal.speak();*/

/*
//ES6
class Animals {
  constructor(name) {
    this.name = name;
  }
  speak(){
    console.log(this.name + ' speak!');
  }
}
var animal = new Animals('cat');
animal.speak();
*/

//ES6中继承有了extends和super关键词
//super这里表示父类的构造函数，子类必须在constructor方法中调用super方法。因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。
//如果子类中没有定义constructor方法，这个方法会被默认添加。  constructor(...args){ super(...args) }

// class Cat extends Animals{
//   constructor(name,age){
//     super(name);
//     this.age = age;
//   }
//   speak(){
//     super.speak();
//     console.log(this.name);
//   }
// }
//
// var Tom = new Cat('Tom');
// Tom.speak();
