
$(function($){
  $.getScript("/scripts/hackback.js").done();
  var cur_count_id=0;
  var count_id=0;

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
    $("#div_ouput").text("运行结果窗口");
  });

  var runing = false;
  $("#btn_run").click(function () {
    if(runing) return;
    $("#div_ouput").text("正在编译并运行。。。");runing = true;
    $.getJSON("/serverapi/runC",{code:editor.getValue()},function(data){
      $("#div_ouput").text(data);
      runing = false;
    });
  });
  var ispop_menu = true;
  $("#btn_solder").click(function () {
    if(ispop_menu){
      $("#sitebar").css("transform","translate(100%)");
      $(this).removeClass("btn_solder_open").addClass("btn_solder_close");
      ispop_menu = false;
      $("#mask").hide(0);
    }else{
      $("#sitebar").css("transform","translate(0%)");
      $(this).removeClass("btn_solder_close").addClass("btn_solder_open");
      ispop_menu = true;
      $("#mask").show(0);
    }
    //console.log(ispop_menu);
  });

  initCata(location.hash);
  function initCata(cur_chap_id){
    var cata_url = "/chapters/menu.json";
    var list_chap = $("#list_chap");
    var iframe_main=$("#iframe_main");
    list_chap.text("正在加载目录。。。");
    $.getJSON(cata_url, function (data) {
      list_chap.text("");
      cur_count_id=0;
      count_id=0;
      //console.log(data.list);
      var chap = data.list;
      chap.forEach(function(item){
        var li_wrap = $("<li/>");

        $("<h4/>").text(item.title).appendTo(li_wrap);
        var inner_ol = $("<ol/>");
        item.list.forEach(function(item){
          var inner_ol_li =  $("<li/>").text(item.title);
          inner_ol_li.attr("ref_id",item.data);
          inner_ol_li.attr("count_id",count_id);
          inner_ol_li.click(function(){
            var ref_id = $(this).attr("ref_id");
            location.hash=ref_id;
            iframe_main.attr("src","/chapters/h"+ref_id+".html");
            $.get("/chapters/code"+ref_id+".txt",function(data){
              editor.setValue(data);
              $("#div_ouput").text("运行结果窗口");
            });
            cur_count_id=+$(this).attr("count_id");
            $("li.active",list_chap).removeClass("active");
            inner_ol_li.addClass("active");
            setTimeout(function(){
              $("#btn_solder").click();
            },400);
            //$("#btn_solder").click();
          });
          inner_ol_li.appendTo(inner_ol);

          count_id++;
        });
        inner_ol.appendTo(li_wrap);
        li_wrap.appendTo(list_chap);
      });
      cur_chap_id&&$("[ref_id='"+cur_chap_id.slice(1)+"']",list_chap).click();
    });

  }
});
