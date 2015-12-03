/**
 * Created by WYQ on 2015/12/1.
 */
  var mopath="./a.js";
function reRequire(path){
  var pwd =require('path').resolve(mopath);
  require.cache[pwd]&&delete require.cache[pwd];
  return require(mopath);
}

console.log(rerequire(mopath));




