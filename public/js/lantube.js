$(function(){console.log("Hola mundo."),$("#agregar").on("click",function(o){o.preventDefault(),$.ajax({url:"/videos",method:"post",data:{url:$("#video").val(),order:$(".orden").length+1||1},success:function(o){console.log("Si!"),$("#video").val(""),$(".lista-videos").append('<tr><td class="orden">'+o.order+"</td><td>"+o.url+"</td></tr>")}})})});