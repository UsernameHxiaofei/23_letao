
$(function(){
    //一进入页面发送ajax请求获取数据渲染

    $.ajax({
        type:"get",
        url:"/category/queryTopCategory",
        dataType:"json",
        success:function(info){
            console.log(info);
            $(".category_left .menu").html( template("firsttpl",info ));
            $(".category_left .menu li:first-child").addClass("current")
            render( info.rows[0].id);
        },

        
    })


    //点击一级分类发送ajax请求获取一级分类的二级分类的数据
    $(".category_left .menu").on("click","li",function(){

        $(this).addClass("current").siblings().removeClass("current");

        var id = $(this).data("id");

        render(id);
       
    })



    function render (id){
        $.ajax({
            type:"get",
            url:"/category/querySecondCategory",
            data:{
                id:id
            },
            dataType:"json",
            success:function(info){
                //console.log(info)
                $(".category_right .pp").html( template("secondtpl",info))
            }
        })
    }


    //进入页面先触发第一个li的点击事件
   
})