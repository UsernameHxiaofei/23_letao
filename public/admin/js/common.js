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


})