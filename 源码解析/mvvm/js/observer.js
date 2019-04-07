function Observer (data) {//数据监听器
    //将data数据原有的属性 改成get和set的形式
    this.data = data;
    this.walk(data);
}

Observer.prototype = {
    walk: function (data) {
        var self = this;
        // 将data数据原有的属性 改成get和set的形式
        Object.keys(data).forEach(function (key) {
            //定义响应式变化
            self.defineReactive(data, key, data[key]);
        });
    },
    //定义响应式变化
    defineReactive: function (data, key, val) {
        // 每个变化的数据 都会对应一个数组,这个数组是存放所有更新的操作
        var dep = new Dep();//依赖收集
        var childObj = observe(val);//递归深度劫持
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            //获取值时调用的方法
            get: function getter () {
                if (Dep.target) {
                    dep.addSub(Dep.target);
                }
                return val;
            },
            // 当给data属性中设置值的适合 更改获取的属性的值
            set: function setter (newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                 // 通知所有人 数据更新了
                dep.notify();
            },
        });
    },
};


function observe (value, vm) {
     // defineProperty针对的是对象
    if (!value || typeof value !== 'object') {
        return;
    }
    return new Observer(value);
}

function Dep () {//发布的订阅
    this.subs = [];//订阅事件的数组
}
Dep.prototype = {
    addSub: function (sub) {
        this.subs.push(sub);
    },
    notify: function () {
        this.subs.forEach(function (sub) {
            sub.update();//通知观察者对象
        });
    },
};
Dep.target = null;
