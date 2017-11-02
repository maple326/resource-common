//var和let的作用域
function varTest(){
  var x = 31;
  if(true){
    var x = 71;
    console.log(x);
  }
  console.log(x);
}

function letTest(){
  let x = 31;
  if(true){
    let x = 71;
    console.log(x);
  }
  console.log(x);
}

// varTest();
// letTest();

//暂存死区
function do_something(){
  console.log(foo);
  let foo = 2;
}
// do_something();
