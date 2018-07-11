/**
 * Created by asus on 2018/7/11.
 */
$(function(){

  //1表单检验初始化
  $("form").bootstrapValidator({
    //配置图标配
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //配置字段
    fields:{
      username:{
        validators:{
          notEmpty:{
            message:"用户名不能为空"
          },
          stringLength:{
            min:3,
            max:6,
            message:"长度为3-6位"
          },
          callback:{
            message:"用户名不存在"
          }
        }
      },
      password:{
        validators:{
          notEmpty:{
            message:"密码不能为空"
          },
          stringLength:{
            min:6,
            max:12,
            message:"密码的长度为6-12位"
          },
          callback:{
            message:"密码错误"
          }
        }
      }

    }
  });
  //2表单校验成功事件阻止默认提交ajax提交
  $("form").on("success.form.bv",function(e){
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$("form").serialize(),
      dataType:"json",
      success:function(info){
        console.log(info)
        if(info.success){
          //跳转到等首页
          location.href="index.html"
        }
        if(info.error===1000){
          $("form").data("bootstrapValidator").updateStatus("username","INVALID","callback")
        }
        if(info.error===1001){
          //alert("密码错误")
          $("form").data("bootstrapValidator").updateStatus("password","INVALID","callback")
        }
      }
    })
  });
  //表单重置功能
  $('[type="reset"]').on("click",function(){
    console.log(11)
    $("form").data("bootstrapValidator").resetForm(true);
  })
})