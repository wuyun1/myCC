var fs = require("fs");
var execSync = require("child_process").exec;


function runC(code,fn){

  function run(){
    fs.writeFileSync("temp.c",code);
    execSync("g++ temp.c -o temp.exe&&temp.exe",function (error, stdout, stderr) {
      if (error) {
        fn(error,stderr);
      }else{
        fn(null,stdout);
        fs.unlinkSync("temp.exe");
      }
      fs.unlinkSync("temp.c");
    });
  }
  if(fs.existsSync("temp.c")){
    setTimeout(function(){
      runC(code,fn);
    },1000);
  }else{
    run();
  }
}

//runC("#include<stdio.h>\nint main(){printf(\"asdfsd\");return 0;}", function (err,data) {  console.log(data);});

module.exports = runC;
