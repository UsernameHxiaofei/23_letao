/**
 * Created by asus on 2018/7/13.
 */

$(function(){

  var page = 1;
  var pageSize = 5;
  //进入页面就代用一次渲染页面
  render();
  function render(){
    $.ajax({
      type:"get",
      url:"/user/queryUser",
      data:{
          page:page,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        //console.log(info)
        $("tbody").html(template("usertpl",info));

      //  数据回来制作分页
        //分页的初始化
        $("#paginator").bootstrapPaginator({
          //制定版本号
          bootstrapMajorVersion:3,
          //当前页面
          currentPage:info.page,
          //总页数
          totalPages:Math.ceil(info.total/info.size),
          //点击的回调函数
          onPageClicked:function(a,b,c,p){
              page=p;
            render();
          }
        })
      }
    })
  }

  var id;
  var isDelete;
  //禁用启用的功能
  $("tbody").on("click",".btn",function(){
    //显示模态框
  $("#addModal").modal("show");
    //获取到id
    id= $(this).parent().data("id");
    isDelete = $(this).hasClass("btn-success")? 1:0;
    console.log(id)
    console.log(isDelete)
  });

  //点击确定发送ajax请求禁用启用
  $(".btnSure").on("click",function(){
    $.ajax({
      type:"post",
      url:"/user/updateUser",
      data:{
        id:id,
        isDelete:isDelete
      },
      dataType:"json",
      success:function(info){
        console.log(info)
        if(info.success){
          $("#addModal").modal("hide");
          render();
        }
      }
    })
  })
})