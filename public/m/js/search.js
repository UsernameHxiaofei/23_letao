

$(function(){

    function getNum (){
        //获取到假数据
        var str = localStorage.getItem("history");

        if(str==undefined){
            var arr=[];
        }else{
            //转成数组
        var arr = JSON.parse(str);
        
        }
        return arr;
    }
    
    
    function render(){
        //函数的返回值需要接受一下
        var arr = getNum();
        //将数组渲染在页面中;
    $(".lt_context").html( template("tpl",{info:arr}));
    }


    render();



    //2清空历史记录功能
    //1设置事件(委托)
    $(".lt_context").on("click",".deleteAll",function(){
        //弹出一个框
        mui.confirm("你是否要清空所有的历史记录","温馨提示",["取消","确定"],function(e){
            
            if(e.index==1){
                //1清空历史记录
                localStorage.removeItem("history");
                //重新渲染页面
                render();
            }
        })
    })


    //删除一条信息的功能
    $(".lt_context").on("click",".delete",function(){
       //获取到当前的索引值(先自定义存储索引值)
       var index = $(this).data("id");
       
       //删除对应的数组中的值
       var arr = getNum();
       arr.splice(index,1);
       //将数组转成字符串放入本地存储中
       var str = JSON.stringify(arr);
       localStorage.setItem("history",str);
       //重新渲染页面
       render();
    })


    //添加
    $(".btn-search").on("click",function(){
        //获取到输入框里的值
       var text =  $("[type='text']").val();
        //如果是空的话就不然添加到历史记录中;
       if(text==""){
           return 
       }
       //console.log(text)
       //将值存放到数组中
       var arr = getNum();
       if(arr.indexOf(text)!==-1){
        //在原来的数组中存在
        var index = arr.indexOf(text);
        //根据索引删除对应的数据
        arr.splice(index,1);
    }

    //将现在的数据存放到数组中
       arr.unshift(text);
    //    //历史记录判断
       if( arr.length>10 ){
        //删除数组中的最后一项
        arr.pop();

    }

       //将数组放到本地存储中
       var str = JSON.stringify(arr);
       localStorage.setItem("history",str);
       //重新渲染页面
       render();
       //清空搜索框
       $("[type='text']").val("");

       // 跳转到 searchList 页面
    location.href = "product.html?key=" + key;
      
    


    })

    
})