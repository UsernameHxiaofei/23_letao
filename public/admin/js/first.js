/**
 * Created by asus on 2018/7/13.
 */

$(function(){
  //1渲染数据+制作分页
  var page = 1;
  var pageSize = 2;
  render();

  //分类功能
    $(".btn-add").on("click",function(){
      //模态框显示
      $("#addModal").modal("show")
    })

  //表单校验
  $("form").bootstrapValidator({
    //配置图标配
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:"一级分类不能为空"
          }
        }
      }
    }
  });


  //在表单校验成功获取到表单的值阻止默认的提交进行ajax提交
  $("form").on("success.form.bv",function(e){
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/category/addTopCategory",
      data:$("form").serialize(),
      dataType:"json",
      success:function(info){
        console.log(info)
        //关闭模态框
        $("#addModal").modal("hide");
        page=1;
        render();
        //重置表单
        $("form").data("bootstrapValidator").resetForm(true)
      }
    })
  })





  function render(){
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:page,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        console.log(info)
        $("tbody").html(template("firsttpl",info));

        $("#paginator").bootstrapPaginator({
          //版本
          bootstrapMajorVersion:3,
          currentPage:page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,p){
            page=p;
            render()
          }
        })
      }
    })
  }
})