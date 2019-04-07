### 关联dep和watcher是怎么做到的？
watcher中有个重要的逻辑就是this.get();
每个watcher被实例化时都会获取数据从而会调用当前属性的get方法

参考：
[Vue源码解析](https://juejin.im/post/5af8eb55f265da0b814ba766#heading-14)
[手动实现Vue](https://github.com/DMQ/mvvm)