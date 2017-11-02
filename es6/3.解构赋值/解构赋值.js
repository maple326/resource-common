/*//从数组中获取元素
console.log('--获取数组中的元素--')
//ES5
var array = [1,2,3,4];
var first = array[0];
var third = array[2];
console.log(first, third);

//ES6
let array2 = [1,2,3,4];
let [first2, ,third2] = array2;
console.log(first2, third2);*/


/*//交换值
console.log('--交换值--');
//ES5
var a = 1;
var b = 2;
var tmp = a;
a = b;
b = tmp;
console.log(a,b);

//ES6
let c = 1;
let d = 2;
[c, d] = [d, c];
console.log(c,d);*/

/*//多个返回值的解构
console.log('--多个返回值的解构--');
//ES5
function margin(){
  var left = 1, right = 2, top = 3, bottom = 4;
  return {
    left: left,
    right: right,
    top: top,
    bottom: bottom
  }
}
var data = margin();
var left = data.left;
var bottom = data.bottom;
console.log(left,bottom);

//ES6
function margin2(){
  var left = 1, right = 2, top = 3, bottom = 4;
  return {
    left,
    right,
    top,
    bottom
  }
}
var { left, bottom } = margin2();
console.log(left,bottom);*/

/*//深度匹配
console.log('--深度匹配--');
//ES5
function settings(){
  return { display: { color: 'red'}, keyboard: {layout: 'query'}};
}
var tmp = settings();
var displayColor = tmp.display.color;
var keyboardLayout = tmp.keyboard.layout;
console.log(displayColor, keyboardLayout);

//ES6
function settings(){
  return { display: { color: 'red'}, keyboard: {layout: 'query'}};
}
var { display: { color: displayColor}, keyboard: {layout: keyboardLayout}} = settings();
console.log(displayColor, keyboardLayout);*/

/*//不定参数的解构赋值
//ES5
var array = [1,2,3,4,5];
var a = array[0];
var b = array[1];
var other = array.slice(2);
console.log(a,b,other);

//ES6
var array = [1,2,3,4,5];
var [a,b,...other] = array;
console.log(a,b,other);*/

/*//ES5
function sortArgs1(){
  // var sortedArgs = arguments.sort();
  // var sortedArgs = Array.prototype.slice.call(arguments).sort();
  return sortedArgs;
}
console.log(sortArgs1(5,3,7,1));

// function sortArgs2(...theArgs){
//   var sortedArgs = theArgs.sort();
//   return sortedArgs;
// }
// console.log(sortArgs2(5,3,7,1));*/
