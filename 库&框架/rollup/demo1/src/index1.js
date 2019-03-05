// import util1 from './util1.js'
// import {fn1,fn2} from './util2.js'

// console.log(util1)
// fn1();
// fn2();

class MathHandle{
    constructor(x,y){
        this.x = x
        this.y = y
    }
    add(){
        return this.x+this.y
    }
}

const m = new MathHandle(2,3)

console.log(typeof MathHandle)
console.log(MathHandle.prototype.constructor === MathHandle)
console.log(m.__proto__ === MathHandle.prototype)