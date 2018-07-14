

$(function(){
    //1table的渲染跟分页的制作
    var page = 1;
    var pageSize = 2;
    var imgs = [];
    //进入页面渲染一次
    render();
//顶级分类按钮让模态框显示
$(".btn-add").on("click",function(){
    $("#addModal").modal("show")
    //1修改模态框的样式

    //2发送ajax
    $.ajax({
        type:"get",
        url:"/category/querySecondCategoryPaging",
        data:{
            page:1,
            pageSize:100,
        },
        dataType:"json",
        success:function(info){
            console.log(info)
            //渲染数据
            $(".dropdown-menu").html( template("tpl",info))
        }
    })
});

//给动态渲染的a设置点击事件获取到id跟文本
$(".dropdown-menu").on("click","a",function(){
    $(".dropdown-text").text($(this).text());
    $("[name='brandId']").val($(this).data("id"));
    $("form").data("bootstrapValidator").updateStatus("brandId",'VALID')
})

//图片上传
$("#fileupload").fileupload({
    dataType:"json",
    done:function(e,data){
        console.log(data.result);
        //获取到图片的地址
        //动态渲染图片
        $('<img src="'+ data.result.picAddr +'" width="100" alt="">').prependTo($(".img_box"));
        //将每一张的·图片对象渲染到数组中
        imgs.unshift(data.result);
        
        if(imgs.length===3){
            $('form').data("bootstrapValidator").updateStatus("brandLogo","VALID")
        }
       // console.log(imgs)
        //限制上传图片的张数
        if( imgs.length>3 ){
            imgs.splice(3);
            //删除最后一张图片
            $(".img_box img:last-child").remove();
            
        }
    }
})

// $(".btn-ce").on("click",function(){
//     alert(1)
//     // $("#addModal").modal("hide")
//     // $("form").data("bootstrapValidor").resultForm(true);
//     // $('.dropdown-text').text("请输入二级分类");
//     // $(".img_box").empty();
// })


//表单校验的功能
$("form").bootstrapValidator({
    //校验隐藏域
    excluded: [],
    //excluded: [':disabled', ':hidden', ':not(:visible)'],
    //配置图标配
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
        brandId:{
            validators:{
                notEmpty:{
                    message:"请输入二级分类"
                }
            }
        },
        proName:{
            validators:{
                notEmpty:{
                    message:"请输入商品的名称"
                }
            }
        },
        proDesc:{
            validators:{
                notEmpty:{
                    message:"请输入商品的描述"
                }
            }
        },
        num:{
            validators:{
                notEmpty:{
                    message:"请输入商品的描述"
                },
                //正则校验
                regexp: {
                    regexp: /^[1-9]\d{0,4}$/,
                    message: "请输入正确的库存"
                }
            }
        },
        size:{
            validators:{
                notEmpty:{
                    message:"请输入商品的描述"
                },
                 //正则校验
                 regexp: {
                    regexp:/^\d{2}-\d{2}$/,
                    message: "请输入正确的尺码"
                }
            }
        },

        oldPrice:{
            validators:{
                notEmpty:{
                    message:"请输入商品的名称"
                }
            }
        },
        price:{
            validators:{
                notEmpty:{
                    message:"请输入商品的名称"
                }
            }
        },
        brandLogo:{
            validators:{
                notEmpty:{
                    message:"请上传三张图片"
                }
            }
        },
    }
});

//当表单校验成功设置事件
$("form").on("success.form.bv",function(e){
    //阻止表单的默认的提交
    e.preventDefault();
    var str = $('form').serialize();
    str += "&picName1="+imgs[0].picName + "$picAddr1="+imgs[0].picAddr;
    str += "&picName2="+imgs[1].picName + "$picAddr2="+imgs[1].picAddr;
    str += "&picName3="+imgs[2].picName + "$picAddr3="+imgs[2].picAddr;
    console.log(str)
    $.ajax({
        type:"post",
        url:"/product/addProduct",
        data:str,
        dataType:"json",
        success:function(info){
            console.log(info)
            if(info.success){
                $("#addModal").modal("hide");
                page=1;
                render();
                $("form").data("bootstrapValidator").resetForm(true);
                $(".dropdown-text").text("请输入二级分类");
                imgs=[];
                $(".img_box img").remove();
            }
        }
    })
})



    function render(){
        $.ajax({
            type:"get",
            url:"/product/queryProductDetailList",
            data:{
                page:page,
                pageSize:pageSize
            },
            dataType:"json",
            success:function(info){
                
                $("tbody").html( template( "producttpl",info ));
                // 制作分页
                $("#paginator").bootstrapPaginator({
                    // 版本 
                    bootstrapMajorVersion:3,
                    // 当前页
                    currentPage:page,
                    //总页数
                    totalPages:Math.ceil(info.total/info.size),
                    //点击事件
                    onPageClicked:function(a,b,c,p){
                        page=p;
                        //渲染点击的页面
                        render()
                    },
                    //显示按钮的中文文本
                    itemTexts:function( type, page, current){
                        
                        switch(type){
                            case "first":
                            return "首页";
                            case "prev":
                            return "上一页";
                            case "next":
                            return "下一页";
                            case "last":
                            return "最后一页";
                            case "page":
                            return page;

                        }
                    },
                    //显示tital提示
                    tooltipTitles : function(type, page, current){
                        switch(type){
                            case "first":
                            return "首页";
                            case "prev":
                            return "上一页";
                            case "next":
                            return "下一页";
                            case "last":
                            return "最后一页";
                            case "page":
                            return "前往"+ page;
                        }
                    },
                    
                    useBootstrapTooltip:true
                })
            }
        })
    }
})