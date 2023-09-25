var startY; //定义开始时候的坐标位置
document.addEventListener('touchstart',function (ev) {
    startY = ev.touches[0].pageY;
}, false);

document.addEventListener('touchend',function (ev) {
    var endY;//定义结束时候的坐标位置
    endY = ev.changedTouches[0].pageY;
    var direction =  getDirection( startY, endY);
    switch(direction) {
        case 0:
                console.log("不变");
            break;
        case 1:
             console.log("  向上");
             
             var content = document.querySelector(".content")
            content.style.display = "block"
            break;
        case 2:
             console.log("向下");
              //处理逻辑
            break;
        default:
    }
  }, false);

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
