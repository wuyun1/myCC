var express = require('express');
//var bodyParser     =         require("body-parser");
var query = require("querystring");
var router = express.Router();
var runC = require("./runc.js");
console.log("ROUTE:");
// 该路由使用的中间件
//router.use(bodyParser.urlencoded({ extended: false }));
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// 定义网站主页的路由
router.get('/', function(req, res) {
  res.end('Birds home page');
});
// 定义 about 页面的路由
router.get('/runC', function(req, res) {
  var code = query.parse(req._parsedUrl.query).code;
  console.log(code);
  runC(code,function(err,data){
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(data));
  });

});
module.exports = router;
