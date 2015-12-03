/**
 * Created by WYQ on 2015/12/1.
 */
function reRequire(mopath){
  var pwd =require('path').resolve(mopath);
  require.cache[pwd]&&delete require.cache[pwd];
  return require(pwd);
}
  let initcount = 0;

  let run =(err,env) => {
    console.log("MIDTEMP:",initcount++);
    return reRequire('./serverapi/server.js')(err,env);
  }

  module.exports=run;
