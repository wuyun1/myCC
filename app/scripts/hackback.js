console.log("开始画背景！");
var q=document.getElementById("canvas_back");
var n = 100;
var context = q.getContext('2d');
var s = window.screen;
var width = q.width = s.width;
var height = q.height = s.height;
context.fillStyle='rgba(0,0,0)';
context.fillRect(0,0,width,height);
function letter(){
  this.text =Math.random()>0.5?"0":"1",
   this.speed= Math.random()*3+3,
    this.y_pos = Math.random()*height,
    this.x_pos = Math.random()*width;
  this.font =  (15+Math.round(20*Math.random()))+"pt Arial";

}
letter.prototype={
  "run":function(){
    if(this.y_pos >  758 + Math.random() * 1e4){
      this.y_pos = 0;
      this.speed = Math.random()*3+3;
      this.text = Math.random()>0.5?"0":"1";
      this.x_pos = Math.random()*width;
      this.font =  (15+Math.round(20*Math.random()))+"pt Arial";
    }else{
      this.y_pos += this.speed;
    }
  }
};
var letters = Array(n).join(1).split('').map(function(y,i){
  return new letter();
});

var draw = function () {
  context.fillStyle='rgba(0,0,0,.5)';
  context.fillRect(0,0,width,height);
  context.fillStyle='#0F0';
  letters.map(function(l, index){
    context.font = l.font;
    context.fillText(l.text, l.x_pos, l.y_pos);
    l.run();

  });
  //setTimeout(function(){
    window.requestAnimationFrame(draw);
  //},200);
};

  draw();


