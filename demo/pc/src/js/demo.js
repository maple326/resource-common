import demo from '../template/demo.pug';
import Foo from './module/foo';
import Bar from './module/bar';
let foo = new Foo;
let mSort = (list)=> {
    let left = 1;
    let batmanLeft = (ar,startIndex,rightIndex)=> {
        for(var i =startIndex;i<ar.length;i++){
            if(i == rightIndex){
                let temp0 = ar[0];
                ar.splice(rightIndex+1,0,temp0);
                ar.splice(0,1);
                //batmanRight(ar,rightIndex-1);
                return;
            }
            if(ar[i] > ar[0]){
                let tempi = ar[i];
                let tempRight = ar[rightIndex];
                left++;
                ar.splice(i,1,tempRight);
                ar.splice(rightIndex,1,tempi);
                batmanRight(ar,rightIndex-1);
                return;
            }

        }
    }
    let batmanRight = (ar,startIndex,isRestart)=>{
        for(let i=startIndex;i>0;i--){
            if(left == startIndex){
                let temp0 = ar[0];
                ar.splice(startIndex+1,0,temp0);
                ar.splice(0,1);
                //batmanLeft(ar,left,i);
                return;
            }
            if(ar[i] < ar[0]){
                batmanLeft(ar,left,i);
                return;
            }
        }
    }
    batmanRight(list,list.length-1);
    console.log(list)
}
class Demo extends Bar{
    constructor(){
        super(arguments);
        this.data = {
            text: '文本内容1',
            list: [{
                name: 1,
                id: 1
            },{
                name: 2,
                id: 2
            },{
                name: 3,
                id: 3
            }],
            fn:()=>{
                console.log(this.data);
            },
            arr: [10,7,9,0,6,30,2,1,100,51]
        }
    }
    init(){
        this.render();
        foo.print();
        this.print();
        this.sort();
    }
    render(){
        let domHtml = demo(this.data);
        //$("#container").html(domHtml);
        console.log(domHtml)
    }
    sort() {
        console.log(mSort(this.data.arr))
    }
}
new Demo().init();

