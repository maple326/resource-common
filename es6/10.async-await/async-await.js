function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, ms+'done');
  });
}

let asyncFun = async function() {
  let first = await timeout(1000);
  console.log(first);

  let second = await timeout(500);
  console.log(second);

  let third = await timeout(1500);
  console.log(third);
}

asyncFun();
