console.log('撒的发生短发撒的发');

$(function($){
  //$.getScript("./scripts/hackback.js").done();


  var editor = CodeMirror.fromTextArea(document.getElementById("codEdeit"), {
    lineNumbers: true,
    matchBrackets: true,
    mode: "text/x-csrc",
    keyMap: "sublime",
    autoCloseBrackets: true,
    showCursorWhenSelecting: true,
    theme: "midnight",
    tabSize: 2
  });
  $.get("chapters/code_hollc.txt",function(data){
    editor.setValue(data);
  });

  var runing = false;
  $("#btn_run").click(function () {
    if(runing) return;
    $("#ouput").text("正在编译并运行。。。");runing = true;
    $.getJSON("/serverapi/runC",{code:editor.getValue()},function(data){
      $("#ouput").text(data);
      runing = false;
    });
  })

});

