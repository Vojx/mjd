window.onload = function(){
    search();
    secondKill();
    carousel();
};
//京东顶部搜索框的透明度效果
var search = function (){
    //搜索框对象
    var search = document.querySelector(".jd-topbar");
    //banner对象
    var banner = document.querySelector(".jd-banner");
    //banner的高度
    var bannerHeight = banner.offsetHeight;
    window.onscroll = function(){
        //搜索框滚动的高度
        var scrollHeight = document.body.scrollTop;
        //console.log(scrollHeight)

        //当搜索框的高度大于banner的高度就全透明
        if(scrollHeight > bannerHeight){
            search.style.background = "rgba(201,21,35,0.85)";
        }
        else{
            var op = scrollHeight / bannerHeight * 0.85;
            search.style.background = "rgba(201,21,35,"+op+")";
        }
    }
};
//秒杀的倒计时效果
var secondKill = function(){
    var time_box = document.querySelector(".products-top");
    //span时间
    var timeList = time_box.getElementsByClassName("number");
    //console.log(timeList)
    var time = 4 * 60 * 60;

    var timer = null;
    timer = setInterval(function(){
        time--;
        var hour = Math.floor(time / 3600);
        var minute = Math.floor(time / 60 % 60);
        var second = time % 60;

        timeList[0].innerHTML = hour > 9? Math.floor( hour / 10 ) : 0;
        timeList[1].innerHTML = hour % 10;

        timeList[2].innerHTML = minute > 9? Math.floor( minute / 10 ) : 0;
        timeList[3].innerHTML = minute % 10;

        timeList[4].innerHTML = second > 9? Math.floor( second / 10 ) : 0;
        timeList[5].innerHTML = second % 10;

        if(time <= 0){
            clearInterval(timer);
        }
    },1000);
};

/*轮播图*/
function carousel(){
    /*获取到dom对象*/
    /*banner*/
    var banner = document.querySelector('.jd-banner');
    /*屏幕的宽度*/
    var width = banner.offsetWidth;
    /*图片盒子*/
    var imageBox = banner.getElementsByTagName("ul")[0];
     /*点盒子*/
    var pointBox = banner.getElementsByTagName("ul")[1];
    /*所有的点*/
    var points = pointBox.querySelectorAll('li');


    /*添加过渡*/
    var addTransition = function () {
        imageBox.style.webkitTransition = "all .2s";/*兼容*/
        imageBox.style.transition = "all .2s";
    };
    /*删除过渡*/
    var removeTransition = function () {
        imageBox.style.webkitTransition = "none";/*兼容*/
        imageBox.style.transition = "none";
    };
    /*改变位子*/
    var setTranslateX = function(translateX){
        imageBox.style.webkitTransform = "translateX("+translateX+"px)";
        imageBox.style.transform = "translateX("+translateX+"px)";
    };


    /*自动的滚动起来    （定时器，过渡）*/
    var index = 1;

    var autoPlay = function(){
        /*箱子滚动*/
        index  ++ ;
        /*定位  过渡来做定位的  这样才有动画*/
        /*加过渡*/
        addTransition();
        /*改变位子*/
        setTranslateX(-index*width);

    };

    var timer = setInterval(autoPlay,4000);
    /*绑定一个过渡结束事件*/
    imageBox.addEventListener("transitionEnd",function(){
        if(index >= 9){
            index = 1;
        }else if(index <= 0){
            index = 8;
        }
        removeTransition();
        setTranslateX(-index*width);
        setPoint();
    },false);
    imageBox.addEventListener("webkitTransitionEnd",function(){
        if(index >= 9){
            index = 1;
        }else if(index <= 0){
            index = 8;
        }
        removeTransition();
        setTranslateX(-index*width);
        setPoint();
    },false);

    /*点随之滚动起来     （改变当前点元素的样式）*/
    var setPoint = function(){
        /*把所有点的样式清除*/
        for(var i = 0 ; i < points.length ; i ++){
            points[i].className = " ";
            /* points[i].classList.remove('now');*/
        }
        points[index-1].className = "cur";
    };

    /*图片滑动 touch事件*/
    //移动开始X坐标
    var startX = 0;
    //移动结束X坐标
    var moveX = 0;
    //移动的距离
    var distanceX = 0;
    //判断是否移动
    var isMove = false;
    //点击屏幕触摸开始
    banner.addEventListener("touchstart",function(e){
        //console.log(e);
        clearInterval(timer);
        //获得触摸的开始坐标
        startX = e.touches[0].clientX;
    });
    imageBox.addEventListener('touchmove',function(e){
        isMove = true;
        moveX = e.touches[0].clientX;
        distanceX = moveX - startX;/*distanceX  值  正负*/

        /*算出当前图片盒子需要定位的位子*/
        //console.log(distanceX);

        /*将要去做定位*/
        var currX = -index*width + distanceX;
        /*删除过渡*/
        removeTransition();
        /*改变位子*/
        setTranslateX(currX);



    });
    imageBox.addEventListener('touchend',function(e){

        /*当超过了一定的距离的时候 */
        if(isMove && (Math.abs(distanceX) > width/3)){
            /*当超过了一定的距离的时候    滚动  到上一张 或 下一张  （一定的距离  1/3  屏幕宽度  过渡）*/
            if(distanceX > 0){
                index --;/*向右滑  上一张*/
            }else{
                index ++;/*向左滑 下一张*/
            }
            addTransition();
            setTranslateX(-index * width);
        }
        /*当不超过一定的滑动距离的时候*/
        else {
            /*当不超过一定的滑动距离的时候  吸附回去  定位回去     （一定的距离  1/3  屏幕宽度  过渡）*/
            addTransition();
            setTranslateX(-index * width);
        }

        /*重置*/
        startX = 0;
        moveX = 0;
        distanceX = 0;
        isMove = false;

        /*添加定时器*/
        clearInterval(timer);
        timer = setInterval(autoPlay,4000);
    });
}
