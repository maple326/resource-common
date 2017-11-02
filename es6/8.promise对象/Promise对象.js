/*//基本用法
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');
  });
}

timeout(100).then((value) => {
  console.log(value);
}).catch((err) => {
  console.log(err);
})*/


/*function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done' + ms);
  });
}

//Promise.all()
//Promise.all方法用于将多个Promise实例包装成一个Promise实例；all是所有的状态都执行完毕，执行结果显示状态集合
Promise.all([
  timeout(1000),
  timeout(2000),
  timeout(3000)
]).then((value) => {
  console.log(value);
})

//Promise.race()
//Promise.race方法用于将多个Promise实例包装成一个Promise实例；race是哪个率先改变状态，执行结果就显示哪个状态
Promise.race([
  timeout(1000),
  timeout(2000),
  timeout(3000)
]).then((value) => {
  console.log(value);
})*/

/*//Promise.resolve()
//Promise.resolve()是将现有对象转为Promise对象
var p1 = Promise.resolve({'a': 1}).then((data) => {
  console.log(data);
});
*/


//Promise.reject()
//Promise.reject()也会返回一个新的Promise实例，该实例的状态为rejected。用法和Promise.resolve方法一致
// Promise.reject('出错了').catch((data) => {
//   console.log(data);
// })











//
