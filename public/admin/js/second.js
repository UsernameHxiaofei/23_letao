/**
 * Created by asus on 2018/7/13.
 */


$(function(){
  //渲染页面跟页面结构
  var page =1;
  var pageSize =5;

  render();


  //点击分类显示模态框
  $(".btn-add").on("click",function(){
    $("#addModal").modal("show");
  //  修改模态框的样式
    //发送ajax请求h获取到数据
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:1,
        pageSize:100
      },
      dataType:"json",
      success:function(info){
        console.log(info)
        //渲染在下拉菜单中
        $(".dropdown-menu").html(template("firsttpl",info));
      }
    })
  })

$(".dropdown-menu").on("click","a",function(){
  //获取文本设置给button
  $(".dropdown-text").text($(this).text());
  //获取id设置给隐藏域
  $("[name='categoryId']").val($(this).data("id"));
})

  $("#fileupload").fileupload({
    dataType:"json",
    done:function(e,data){
      console.log(data.result)
      //本地预览
      $(".img_box img").attr("src",data.result.picAddr);
      //将图片的地址存储在隐藏域中
      $("[name='brandLogo']").val(data.result.picAddr);

    }
  });

  //表单校验
  $("form").bootstrapValidator({
    //校验隐藏域
    excluded: [],
    //配置图标配
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields:{
      categoryId:{
        validators:{
          notEmpty:{
            message:"一级分类不能为空"
          }
        }
      },
      categoryName:{
        validators:{
          notEmpty:{
            message:"二级分类不能为空"
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:"请输入一张图片"
          }
        }
      },
    }
  });


  $("form").on("success.form.bv",function(e){
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      data:$("form").serialize(),
      dataType:"json",
      success:function(info){
        if(info.success){
          $("#addModal").modal("hide");
          page=1;
          render();
          $("form").data("bootstrapValidator").resetForm(true);
          $(".dropdown-text").text("请输入一级分类");
          $(".img_box img").attr("src","images/none.png")

        }

      }
    })
  })

  function render(){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:page,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
          console.log(info)
        $("tbody").html(template("secondtpl",info));

      //  分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,p){
            page=p;
            render();
          }
        })
      }
    })
  }
})