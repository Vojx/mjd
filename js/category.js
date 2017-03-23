window.onload = function(){
    //初始化左边栏
    initLeft();
    //初始化右边栏
    initRight();
    //菜单按钮
    menuBtn();
};
window.onresize = function(){
    location.reload(true);
};
/*左侧分类*/
var parentDom;
function initLeft(){
    //找到父容器
    parentDom = document.getElementsByClassName("jd-category-left")[0];
    var rightDom = document.getElementsByClassName("pd-box")[0];
    //找到子容器
    var childDom = parentDom.getElementsByTagName('ul')[0];
    //点击滑动左分类栏
    var liDom = childDom.getElementsByTagName('li');

    //取到父容器内容的高度
    var parentH = parentDom.offsetHeight;//先取到盒子的高度
    parentH = parentH - 45;//减去头部的高度就是内容的高度
    //取到子容器盒子的高度
    var childH = childDom.offsetHeight;
    //console.log(parentH)
    //console.log(childH)

    /*添加过渡*/
    var addTransition = function(){
        childDom.style.webkitTransition = "all .3s ease 0s";
        childDom.style.transition = "all .3s ease 0s";
    };
    /*删除过渡*/
    var removeTransition = function(){
        childDom.style.webkitTransition = "all 0s ease 0s";
        childDom.style.transition = "all 0s ease 0s";
    };
    /*滑动*/
    var startY = 0;//开始的Y坐标
    var endY = 0;//结束的Y坐标
    var moveY = 0;//滑动的距离
    var currY = 0;//当前translateY的值
    //滑动的时候限制的最大滑动距离和最小滑动距离
    var maxY = 150,minY = -(childH - parentH + 150);
    //点击时间
    var startTime = 0,endTime = 0;

    childDom.addEventListener('touchstart',function(e){
        console.log(123);
        //拿到开始的Y坐标
        startY = e.touches[0].clientY;//相对你的父容器
        startTime = new Date().getTime();
    },false);
    childDom.addEventListener('touchmove',function(e){
        e.preventDefault();
        console.log(1);
        //难道结束时候的Y坐标
        endY = e.touches[0].clientY;
        moveY = startY - endY;
        //只允许你在区间
        if((currY - moveY) <= maxY && (currY - moveY) >= minY){
            removeTransition();
            childDom.style.transform = "translateY("+(currY - moveY)+"px)";
            childDom.style.webkitTransform = "translateY("+(currY - moveY)+"px)";
        }
    },false);
    childDom.addEventListener('touchcancel',function(e){
        alert(0);
        //滑动结束之后记录下当前的translateY的值
        if((currY - moveY) <= 0 && (currY - moveY) >= -(childH - parentH)){
            currY = currY - moveY;
        }
        //当超过了0的时候就让子容器弹回去
        else if((currY - moveY) > 0){
            currY = 0;
            addTransition();
            childDom.style.transform = "translateY("+(currY)+"px)";
            childDom.style.webkitTransform = "translateY("+(currY)+"px)";
        }
        //当超过了最大上滑动距离的时候就让子容器弹回去
        else if((currY - moveY) < -(childH - parentH)){
            currY = -(childH - parentH);
            addTransition();
            childDom.style.transform = "translateY("+(currY)+"px)";
            childDom.style.webkitTransform = "translateY("+(currY)+"px)";
        }
        //把参数清0
        startY = 0;
        endY = 0;
        moveY = 0;
    });
    childDom.addEventListener('touchend',function(e){
        console.log(2);
        //滑动结束之后记录下当前的translateY的值
        if((currY - moveY) <= 0 && (currY - moveY) >= -(childH - parentH)){
            currY = currY - moveY;
        }
        //当超过了0的时候就让子容器弹回去
        else if((currY - moveY) > 0){
            currY = 0;
            addTransition();
            childDom.style.transform = "translateY("+(currY)+"px)";
            childDom.style.webkitTransform = "translateY("+(currY)+"px)";
        }
        //当超过了最大上滑动距离的时候就让子容器弹回去
        else if((currY - moveY) < -(childH - parentH)){
            currY = -(childH - parentH);
            addTransition();
            childDom.style.transform = "translateY("+(currY)+"px)";
            childDom.style.webkitTransform = "translateY("+(currY)+"px)";
        }

        endTime = new Date().getTime();
        //tap
        console.log(moveY+"==="+(endTime-startTime));
        if(moveY == 0 && endTime-startTime < 200){
            var target = e.target.parentNode;
            //清除class给点击的元素加上now
            for(var i = 0 ; i < liDom.length ; i ++){
                liDom[i].index = i;
                liDom[i].className = " ";
            }
            target.className = "now";

            //计算需要滚动的高度
            var top = target.index*50;
            if(top < (childH - parentH)){
                addTransition();
                childDom.style.transform = "translateY("+(-top)+"px)";
                childDom.style.webkitTransform = "translateY("+(-top)+"px)";
                //设置当前的translateY的值
                currY = -top;
            }else{
                addTransition();
                childDom.style.transform = "translateY("+(-(childH - parentH))+"px)";
                childDom.style.webkitTransform = "translateY("+(-(childH - parentH))+"px)";
                //设置当前的translateY的值
                currY = -(childH - parentH);
            }

            rightDom.style.webkitTransition= "all 0.2s ease 0s";
            rightDom.style.transition = "all 0.2s ease 0s";
            rightDom.style.opacity = 0;
            setTimeout(function(){
                rightDom.style.opacity = 1;
            },300);
        }

        //把参数清0
        startY = 0;
        endY = 0;
        moveY = 0;
    },false);

     //for(var i = 0 ; i < liDom.length ; i ++){
     //    liDom[i].index = i;
     //    liDom[i].addEventListener('click',function(e){
     ////清除class给点击的元素加上now
     //for(var j = 0 ; j < liDom.length ; j ++){
     //    liDom[j].className = " ";
     //}
     //this.className = "now";
     //
     ////计算需要滚动的高度
     //var top = this.index*liH;
     //if(top < (childH - parentH)){
     //addTransition();
     //childDom.style.transform = "translateY("+(-top)+"px)";
     //childDom.style.webkitTransform = "translateY("+(-top)+"px)";
     ////设置当前的translateY的值
     //currY = -top;
     //}else{
     //addTransition();
     //childDom.style.transform = "translateY("+(-(childH - parentH))+"px)";
     //childDom.style.webkitTransform = "translateY("+(-(childH - parentH))+"px)";
     ////设置当前的translateY的值
     //currY = -(childH - parentH);
     //}
     //
     ////bug 2015-12-11 不加dom操作  分类点击后无法滑动
     ////模拟加载效果
     //rightDom.style.webkitTransition= "all 0.2s ease 0s";
     //rightDom.style.transition = "all 0.2s ease 0s";
     //rightDom.style.opacity = 0;
     //setTimeout(function(){
     //rightDom.style.opacity = 1;
     //},300);
     //
     //},false);
     //}
}
/*右边*/
function initRight(){
    //右侧
    var parentDom = document.getElementsByClassName("jd-category-right")[0];
    //找到子容器
    var childDom = parentDom.getElementsByClassName('category-right-box')[0];

    //取到父容器内容的高度
    var parentH = parentDom.offsetHeight;
    //取到子容器盒子的高度
    var childH = childDom.offsetHeight;

    /*添加过渡*/
    var addTransition = function(){
        childDom.style.webkitTransition = "all .3s ease 0s";
        childDom.style.transition = "all .3s ease 0s";
    };
    /*删除过渡*/
    var removeTransition = function(){
        childDom.style.webkitTransition = "all 0s ease 0s";
        childDom.style.transition = "all 0s ease 0s";
    };

    /*滑动*/
    var startY = 0;//开始的Y坐标
    var endY = 0;//结束的Y坐标
    var moveY = 0;//滑动的距离
    var currY = 0;//当前translateY的值
    //滑动的时候限制的最大滑动距离和最小滑动距离
    var maxY = 150,minY = -(childH - parentH + 150);

    childDom.addEventListener('touchstart',function(e){
        //拿到开始的Y坐标
        startY = e.touches[0].clientY;
    },false);
    childDom.addEventListener('touchmove',function(e){
        e.preventDefault();
        //难道结束时候的Y坐标
        endY = e.touches[0].clientY;
        moveY = startY - endY;
        //只允许你在区间
        if((currY - moveY) <= maxY && (currY - moveY) >= minY){
            removeTransition();
            childDom.style.transform = "translateY("+(currY - moveY)+"px)";
            childDom.style.webkitTransform = "translateY("+(currY - moveY)+"px)";
        }
    },false);
    childDom.addEventListener('touchend',function(e){
        //滑动结束之后记录下当前的translateY的值
        if((currY - moveY) <= 0 && (currY - moveY) >= -(childH - parentH)){
            currY = currY - moveY;
        }
        //当超过了0的时候就让子容器弹回去
        else if((currY - moveY) > 0){
            currY = 0;
            addTransition();
            childDom.style.transform = "translateY("+(currY)+"px)";
            childDom.style.webkitTransform = "translateY("+(currY)+"px)";
        }
        //当超过了最大上滑动距离的时候就让子容器弹回去
        else if((currY - moveY) < -(childH - parentH)){
            currY = -(childH - parentH);
            addTransition();
            childDom.style.transform = "translateY("+(currY)+"px)";
            childDom.style.webkitTransform = "translateY("+(currY)+"px)";
        }
        startY = 0;
        endY = 0;
    },false);
}

//菜单按钮效果
var menuBtn = function(){
    //菜单按钮对象
    var menu_btn = document.querySelector(".icon-menu");
    //导航栏对象
    var nav = document.querySelector(".jd-header-nav");
    menu_btn.onclick = function(){
        if(nav.style.display != "none"){
            nav.style.display = "none";
            parentDom.style.paddingTop = 45+"px";
        }else{
            nav.style.display = "block";
            parentDom.style.paddingTop = 102+"px";
        }
    }
};