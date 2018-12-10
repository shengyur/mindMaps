let express = require('express');
let app = express();

let whiteList = ['http://localhost:3000']
app.use(function(req,res,next){
    let origin = req.headers.origin;
    if(whiteList.includes(origin)){
        res.setHeader('Access-Control-Allow-Origin',origin);
    }
    next()
})

app.get('/getData',function(req,res){
    console.log(req.headers)
    res.end('冬天好冷啊')
})
//以当前文件夹作为静态目录
app.use(express.static(__dirname));
 
app.listen(4000)  