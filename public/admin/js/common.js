/**
 * Created by asus on 2018/7/11.
 */


//公共功能每个页面多有的功能
$(function(){
  //1公共的精度条功能
//在第一个ajax发送前开启进度条
  $(document).ajaxStart(function(){
    NProgress.start();
  })
  //在所有的ajax回来的时候关闭进度条
  $(document).ajaxStop(function(){
    NProgress.done();
  })


  //2点击分类管理2点击分类管理让二级导航显示
  $(".categroy").on("click",function(){
    $(this).stop().siblings().slideToggle();
  })


  $(".lt_muen").on("click",function(){
    $(".lt_aside").toggleClass("active");
    $("body").toggleClass("active");
  })


  //退出功能
  $(".loginout").on("click",function(){
    //弹出模态框
    $("#Modal").modal("show");
  })

  $(".addBtn").click(function(){
    $.ajax({
      type:"get",
      url:"/employee/employeeLogout",
      dataType:"json",
      success:function(info){
        //console.log(info)
        if(info.success){
          location.href="login.html";
        }
      }
    })
  })


  

})