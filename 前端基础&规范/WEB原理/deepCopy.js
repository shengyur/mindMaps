var start={
    "a":1,
    "b":undefined,
    "c":function(){
        console.log(111)
    },
    "d":[1,2,4,5],
    "e":"deepCopy",
    "f":{
        "jay":111,
        "chou":{
            "song":"听妈妈的话",
            "another":"七里香"
        }
    },
    "g":null
}

function deepCopy1(obj){
    //局限：
    //1.会忽略 undefined function 对象
    //2.不能序列化函数  https://www.cnblogs.com/craftsman-gao/p/5130567.html
    //3.不能解决循环引用的对象
    return JSON.parse(JSON.stringify(obj))
    //{ a: 1, d: [ 1, 2, 4, 5 ], e: 'deepCopy' }
}

function deepCopy2(obj) {
    return new Promise((resolve) => {
      const {port1, port2} = new MessageChannel();
      port2.onmessage = ev => resolve(ev.data);
      port1.postMessage(obj);
    });
}

deepCopy2(start).then((copy) => {           // 请记住`MessageChannel`是异步的这个前提！
        let copyObj = copy;
        console.log(copyObj, start)
        console.log(copyObj == obj)
    });



// console.log(deepCopy1(start));