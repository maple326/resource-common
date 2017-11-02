/*// 默认值
function add(x,y){
  return x + y;
}
let res = add(1,5);
console.log(res);

function addDefault(x = 0, y = 0){
  return x + y;
}
let res2 = addDefault(1);
console.log(res2);*/

/*//rest参数
//rest参数用于获取函数的多余参数。rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
function rest(a, ...arg){
  console.log('fitst: ',a);
  console.log('others: ',arg);
}
rest(2,3,4,5,6,7);

//扩展运算符
//扩展运算符好比rest参数的逆运算，将一个数组转为用逗号分隔的参数序列。
//求最大值
let arr = [1,2,3,4,5];
let m = Math.max(...arr);
console.log(m);

//concat
var a1 = [10,['a','b']];
var r = [1,2,3,4].concat(...a1);
console.log(r);*/


/*//箭头函数
//ES5
let func1 = function(a){
  return a + 1;
}

//ES6
let func2 = (a) => {
  return a + 1;
}

console.log(func1(100));
console.log(func1(100));*/

/*//箭头函数this
function func(){
  setTimeout(function(){
    console.log(this);
    console.log(this.id);
  })
}

function func1(){
  setTimeout(function(){
    console.log(this);
    console.log(this.id);
  }.bind(this))
}

function func2(){
  setTimeout( () => {
    console.log(this);
    console.log(this.id);
  })
}

let obj = {
  id: 123
}

func.call(obj);
// func2.call(obj);*/
