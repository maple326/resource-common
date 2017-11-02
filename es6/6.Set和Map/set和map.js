//ES6提供了新的数据结构Set。它类似于数组，但是成员的值都是唯一的。
/*var s = new Set();
s.add(1).add(2);
console.log(s);

var arr = Array.from(s);
console.log(arr);*/

/*//由于set结构没有键名，只有键值，所以key方法和value方法的行为一致
let set = new Set(['red','green','blue']);

for(let item of set.keys()){
  console.log(item);
}

for(let item of set.values()){
  console.log(item);
}

for(let item of set.entries()){
  console.log(item);
}*/

/*//数组去重
Array.prototype.unique1 = function(){
  var r = [];
  for(var i = 0; i< this.length; i++){
    if(r.indexOf(this[i]) === -1){
      r.push(this[i]);
    }
  }
  return r;
}


Array.prototype.unique2 = function(){
  this.sort();
  var re = [this[0]];
  for(var i = 1;i< this.length;i++){
    if(this[i] !== re[re.length - 1]){
      re.push(this[i]);
    }
  }
  return re;
}

Array.prototype.unique3 = function(){
  var n = {}, r = [];
  for(var i = 0; i< this.length; i++){
    if(!n[this[i]]){
      n[this[i]] = true;
      r.push(this[i]);
    }
  }
  return r;
}

var arr1 = [1,1,2,3,4,5,5].unique1();
var arr2 = [1,1,2,3,4,5,5].unique2();
var arr3 = [1,1,2,3,4,5,5].unique3();
console.log(arr1);
console.log(arr2);
console.log(arr3);

var arr3 = new Set([1,1,2,3,4,5,5]);
console.log(Array.from(arr3));*/

//Map结构的目的和基本用法
// JavaScript的对象只能用字符串当作键。而为了解决这个问题，ES6提供了Map数据结构，类似于对象也是键值对的集合，键可以使用各种类型。
//Example
/*var m = new Map();
var o = {p: 'Hello World'};

m.set(o, 'content');
console.log(m);

let map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

for (let key of map.keys()) {
  console.log(key);
}

for (let value of map.values()) {
  console.log(value);
}

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}*/
