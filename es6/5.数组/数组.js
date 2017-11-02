//Array.from()
//Array.from()用于将两类对象转化为真正的数组：类数组对象和可遍历对象(包括ES6中的Set和Map)
/*let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  '3': 'd',
  length: 3
}
//ES5的写法
var arr1 = [].slice.call(arrayLike);
console.log(arr1);

//ES6的写法
var arr2 = Array.from(arrayLike);
console.log(arr2);

//Set
let namesSet = new Set(['a', 'b']);
console.log(namesSet);
console.log(Array.from(namesSet));*/

/*//Array.of
//Array.of方法用于将一组值，转换为数组
//ES5
var arr1 = new Array(1,2,3,4);
console.log(arr1);

//ES6
var arr2 = Array.of(1,2,3,4);
console.log(arr2);*/

/*//find()和findIndex()
//数组实例的find方法用于找出第一个符合条件的数组成员。findIndex方法用于找出第一个符合条件的数组成员的索引值
//Example
var r1 = [1,5,10,15].find((value) => {
  return value > 9
});
console.log(r1);


var r2 = [1,5,10,15].findIndex((value) => {
  return value > 9
});
console.log(r2);*/

/*//includes()
//数组实例化的includes的方法返回一个bool值，表示某个数组是否包含给定的值。该方法属于ES7
var r1 = [1,2,3,4].includes(3);
var r2 = [1,2,3,4].includes(5);
console.log(r1);
console.log(r2);

//includes还接收第二个参数，指的是从某个位置开始搜索
var r3 = [1,2,3,4].includes(3,3);
console.log(r3);*/
