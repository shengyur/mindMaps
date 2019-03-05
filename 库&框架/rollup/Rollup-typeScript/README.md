Rollup
## 入门配置
1. 常用操作
rollup src/main.js -f cjs
-f 选项（--output.format 的缩写）指定了所创建 bundle 的类型——这里是 CommonJS（在 Node.js 中运行）。由于没有指定输出文件，所以会直接打印在 stdout 中

rollup src/main.js -o bundle.js -f cjs
将 bundle 保存为文件

如果你想使用Rollup的配置文件，记得在命令行里加上--config或者-c @@2

2. 命令行的参数(Command line flags)
```
-i, --input                 要打包的文件（必须）
-o, --output.file           输出的文件 (如果没有这个参数，则直接输出到控制台)
-f, --output.format [es]    输出的文件类型 (amd, cjs, es, iife, umd)
-e, --external              将模块ID的逗号分隔列表排除
-g, --globals               以`module ID:Global` 键值对的形式，用逗号分隔开 
                              任何定义在这里模块ID定义添加到外部依赖
-n, --name                  生成UMD模块的名字
-m, --sourcemap             生成 sourcemap (`-m inline` for inline map)
--amd.id                    AMD模块的ID，默认是个匿名函数
--amd.define                使用Function来代替`define`
--no-strict                 在生成的包中省略`"use strict";`
--no-conflict               对于UMD模块来说，给全局变量生成一个无冲突的方法
--intro                     在打包好的文件的块的内部(wrapper内部)的最顶部插入一段内容
--outro                     在打包好的文件的块的内部(wrapper内部)的最底部插入一段内容
--banner                    在打包好的文件的块的外部(wrapper外部)的最顶部插入一段内容
--footer                    在打包好的文件的块的外部(wrapper外部)的最底部插入一段内容
--interop                   包含公共的模块（这个选项是默认添加的）
```
    此外，还可以使用以下参数：
    -h/--help
    打印帮助文档。

    -v/--version
    打印已安装的Rollup版本号。

    -w/--watch
    监听源文件是否有改动，如果有改动，重新打包

    --silent
    不要将警告打印到控制台。

## Rollop常见问题：
1. 什么是 ‘tree-shaking’?(What is "tree-shaking?")
Tree-shaking, 也被称为 "live code inclusion," 它是清除实际上并没有在给定项目中使用的代码的过程，但是它可以更加高效。

## 配置常见报错：
1. 'babel-core',cannot find module '@babel/core'?
```
webpack 4.x | babel-loader 8.x | babel 7.x

npm install -D babel-loader @babel/core @babel/preset-env webpack
webpack 4.x | babel-loader 7.x | babel 6.x

npm install -D babel-loader@7 babel-core babel-preset-env webpack
```

## 疑问
1. 绑定是如何工作的(How bindings work)：
“ES模块导出实时绑定，而不是值” 怎么理解？
