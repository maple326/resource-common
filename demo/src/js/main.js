/**
 * Created by Administrator on 2017/8/3.
 */
class A {
    constructor() {

    }
    test() {
        document.getElementsByTagName('body')[0].innerHTML = '123'
    }
}
let a = new A();
a.test();