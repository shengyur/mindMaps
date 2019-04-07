function Vue (options) {
    var self = this;
    //先把可用的东西 挂在在实例上
    this.data = options.data;
    this.methods = options.methods;
    //将数据代理到实例上直接操作实例即可，不需要通过vm.$data来进行操作
    Object.keys(this.data).forEach(function (key) {
        self.proxyKeys(key);
    });

    observe(this.data);
    new Compile(options.el, this);
    options.mounted.call(this); // 所有事情处理好后执行mounted函数
}

Vue.prototype = {
    proxyKeys: function (key) {//实现实例代理data属性
        var self = this;
        Object.defineProperty(this, key, {
            enumerable: false,
            configurable: true,
            get: function () {
                return self.data[key];
            },
            set: function (newVal) {
                self.data[key] = newVal;
            },
        });
    },
};
