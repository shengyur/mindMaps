// 在Vue中，这个步骤是交给virtualDOM完成的，这里只是简单的实现一个文本节点的编译
function Compile (el, vm) {//模板编译
    this.vm = vm;
    // 看看传递的元素是不是DOM,不是DOM我就来获取一下
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.fragment = null;
    this.init();
}

Compile.prototype = {
    init: function () {
        if (this.el) {//能获取到元素，才开始编译
            // 1.先把这些真实的DOM移入到内存中 fragment (性能优化)
            this.fragment = this.nodeToFragment(this.el);
             // 2.编译 => 提取想要的元素节点 v-model 和文本节点 {{}}
            this.compileElement(this.fragment);
             // 3.把编译好的fragment在塞回到页面里去
            this.el.appendChild(this.fragment);
        } else {
            console.log('Dom元素不存在');
        }
    },
    nodeToFragment: function (el) {//把dom节点转换为Fragment
        var fragment = document.createDocumentFragment();
        var child = el.firstChild;//返回树中节点的第一个子节点,如果没有，返回null
        while (child) {
            // 将Dom元素移入fragment中
            fragment.appendChild(child);
            child = el.firstChild;
        }
        return fragment;
    },
    compileElement: function (el) {//提取想要的元素节点 v-model 和文本节点 {{}}
        debugger;
        var childNodes = el.childNodes;
        var self = this;
        //把类数组对象转为数组 ，也可以用 Array.from(attrs)
        [].slice.call(childNodes).forEach(function (node) {
            var reg = /\{\{(.*)\}\}/;
            var text = node.textContent;
            // 是元素节点，还需要继续深入的检查
            if (self.isElementNode(node)) {
                self.compile(node);
            } else if (self.isTextNode(node) && reg.test(text)) {
                // 文本节点
                // 这里需要编译文本
                self.compileText(node, reg.exec(text)[1]);
            }
            //还有子元素时，递归调用自己
            if (node.childNodes && node.childNodes.length) {
                self.compileElement(node);
            }
        });
    },
    compile: function (node) {//编译元素节点
        // 带v-model v-text 
        var nodeAttrs = node.attributes;
        var self = this;
        Array.prototype.forEach.call(nodeAttrs, function (attr) {
            var attrName = attr.name;
            // 判断属性名字是不是包含v-model 
            if (self.isDirective(attrName)) {
                debugger;
                var exp = attr.value;//取到对应的值放到节点中
                var dir = attrName.substring(2);
                if (self.isEventDirective(dir)) {  // 事件指令 "on:"
                    self.compileEvent(node, self.vm, exp, dir);
                } else {  // v-model 指令
                    self.compileModel(node, self.vm, exp, dir);
                }
                node.removeAttribute(attrName);
            }
        });
    },
    compileText: function (node, exp) {//编译文本节点
        var self = this;
        var initText = this.vm[exp];
        //更新文本节点的值
        this.updateText(node, initText);
        // 对该文本节点的属性进行监听，在依赖收集器中添加当前订阅事件
        // 如果数据变化了，文本节点需要 重新获取依赖的属性 更新文本中的内容
        new Watcher(this.vm, exp, function (value) {
            //一旦监听到当前文本节点的属性变化，就跟新节点的value值
            self.updateText(node, value);
        });
    },
    compileEvent: function (node, vm, exp, dir) {//编译事件
        var eventType = dir.split(':')[1];
        var cb = vm.methods && vm.methods[exp];

        if (eventType && cb) {
            //原生js绑定事件
            node.addEventListener(eventType, cb.bind(vm), false);
        }
    },
    /**
     * 
     * @param {*} node  元素节点
     * @param {*} vm  vue实例
     * @param {*} exp   v-model="exp"
     * @param {*} dir 对应的指令如"model"
     */
    compileModel: function (node, vm, exp, dir) {//v- 语法的编译
        var self = this;
        debugger;
        //实例上data中的真实数据
        var val = this.vm[exp];
        this.modelUpdater(node, val);
        //新建观察者实例
        new Watcher(this.vm, exp, function (value) {
            // 当值变化后会调用cb 将新的值传递过来 然后更新节点的值
            self.modelUpdater(node, value);
        });

        //输入框处理
        node.addEventListener('input', function (e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }
            // 监听输入事件将输入的内容设置到对应数据上
            self.vm[exp] = newValue;
            val = newValue;
        });
    },
    updateText: function (node, value) {//更新文本
        node.textContent = typeof value === 'undefined' ? '' : value;
    },
    modelUpdater: function (node, value, oldValue) {//更新模板绑定dom节点的值
        node.value = typeof value === 'undefined' ? '' : value;
    },
    isDirective: function (attr) {//是否是指令
        return attr.indexOf('v-') == 0;
    },
    isEventDirective: function (dir) {//是否是事件指令
        return dir.indexOf('on:') === 0;
    },
    isElementNode: function (node) {//是否是元素节点
        return node.nodeType == 1;
    },
    isTextNode: function (node) {//是否是元素节点
        return node.nodeType == 3;
    },
};
