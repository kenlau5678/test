var startY; //定义开始时候的坐标位置
document.addEventListener('touchstart',function (ev) {
    startY = ev.touches[0].pageY;
}, false);

var content = document.querySelectorAll(".content")
var slide = document.querySelector(".slide")
document.addEventListener('touchend',function (ev) {
    var endY;//定义结束时候的坐标位置
    endY = ev.changedTouches[0].pageY;
    var direction =  getDirection( startY, endY);
    switch(direction) {
        case 0:
                console.log("不变");
            break;
        case 1:
             console.log("向上");

             fadeOut(slide, 200)
            slide.style.display = "none"
             
            content[0].style.display = "block"
            fadeIn(content[0], 200)
            

            break;
        case 2:
             console.log("向下");
              //处理逻辑
            break;
        default:
    }
  }, false);

var btrue = document.querySelector(".Btrue")
btrue.onclick = function(){
    
    fadeOut(content[0], 200)
    content[0].style.display = "none"


    content[1].style.display = "block"
    fadeIn(content[1], 200)
    
}

var wrong = document.querySelectorAll(".wrong")


for(var i=0;i<wrong.length;i++){
    (function(i){
        wrong[i].onclick = function(){
            this.style.boxShadow = "0 0 20px rgb(219, 88, 52)"
        }
    })(i);
}

var con = document.querySelector(".continue")
con.onclick = function(){
    fadeOut(content[1], 200)
    content[1].style.display = "none"
    
    content[2].style.display = "block"
    fadeIn(content[2], 200)
}

var end = document.querySelector(".end")
end.onclick = function(){
    window.location.replace(document.referrer);
}

function getDirection(startY, endY) { //根据坐标判断是上拉还是下滑
    var dy = startY - endY;
    var result = 0;
    if(dy>0) {//向上滑动
        result=1;
    }else if(dy<0){//向下滑动
        result=2;
    }
    return result;
 }


 function fadeIn(element,speed){
    if(element.style.opacity !=1){
        var speed = speed || 30 ;
        var num = 0;
        var st = setInterval(function(){
        num++;
        element.style.opacity = num/10;
        if(num>=10)  {  clearInterval(st);  }
        },70);
    }
}

function fadeOut(element){
    if(element.style.opacity !=0){
        var speed = speed || 30 ;
        var num = 10;
        var st = setInterval(function(){
        num--;
        element.style.opacity = num / 10 ;
        if(num<=0)  {   clearInterval(st);  }
        },70);
    }
}