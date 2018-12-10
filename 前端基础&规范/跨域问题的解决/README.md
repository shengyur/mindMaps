## 同源策略
协议 域名 端口 （同域）

## 为什么浏览器不支持跨域
Cookie
LocalStorage
Dom元素也有同源策略 iframe
ajax也不支持跨域

## 实现跨域
- jsonp
    缺点：
        只能发送get请求  不支持 post put  delete
        不安全 易发生XSS攻击 不采用

- cors
- postMessage
- document.domain
- window.name
- localtion.hash
- http-proxy
- nginx
- websocket