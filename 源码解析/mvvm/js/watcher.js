// 观察者的目的就是给需要变化的那个元素增加一个观察者，用新值和老值进行比对,如果数据变化就执行对应的方法
function Watcher (vm, exp, cb) {//观察者
    // 因为要获取老值 所以需要 "数据" 和 "表达式"
    this.cb = cb;//回调
    this.vm = vm;//实例
    this.exp = exp;//表达式的值
    // 先获取一下老的值 保留起来
    this.value = this.get();  // 将自己添加到订阅器的操作
}

Watcher.prototype = {
    // 对外暴露的方法，如果值改变就可以调用这个方法来更新
    update: function () {
        this.run();
    },
    run: function () {
        var value = this.vm.data[this.exp];
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            //调用对应watch的callback
            this.cb.call(this.vm, value, oldVal);
        }
    },
    get: function () {
        // 在取值前先将watcher保存到Dep上 即  缓存当前观察者对象
        Dep.target = this;  
        var value = this.vm.data[this.exp];  // 执行监听器里的get函数 
        Dep.target = null;  // 释放自己
        return value;
    },
};
