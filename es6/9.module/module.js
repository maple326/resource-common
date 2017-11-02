/*//export命令   export.js
export var name = 'Co';
export var age = 26;

//==>
var name = 'Co';
var age = 26;
export { name, age };

export function multiply(x,y){
  return x * y;
}*/

//import命令
import { name, age } from './export';
import { name as nickname } from './export';

//模块的整体加载
import * as userInfo from './export';

//export default命令
//为模块指定默认输出
//export-default.js
export default function(){
  console.log('foo');
}

//import-default.js
import custom from './export-default';
custom();
