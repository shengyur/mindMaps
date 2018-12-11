let express = require('express');
let app = express();

let whiteList = ['http://localhost:3000']
app.use(function(req,res,next){
    let origin = req.headers.origin;
    if(whiteList.includes(origin)){
        //设置哪个源可以访问我
        res.setHeader('Access-Control-Allow-Origin',origin);
        //允许携带哪些header访问我
        res.setHeader('Access-Control-Allow-Headers','name');
        // 允许哪个方法访问我
        res.setHeader('Access-Control-Allow-Methods','PUT');
        // 允许携带cookie
        res.setHeader('Access-Control-Allow-Credentials',true);
        // 预检的存活时间
        res.setHeader('Access-Control-Max-Age',6);//6秒内不预检
        // 允许返回的头
        res.setHeader('Access-Control-Expose-Headers','name');//6秒内不预检

        if(req.method === 'OPTIONS'){
            res.end();
        }
    }
    next()
})
app.put('/getData',function(req,res){
    console.log(req.headers)
    res.setHeader('name','shengyu');
    res.end('冬天好冷啊put')
})
app.get('/getData',function(req,res){
    console.log(req.headers)
    res.end('冬天好冷啊')
})
//以当前文件夹作为静态目录
app.use(express.static(__dirname));
 
app.listen(4000)  