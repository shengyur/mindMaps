let express = require('express');
let app = express();

//以当前文件夹作为静态目录
app.use(express.static(__dirname));
 
app.listen(4000)