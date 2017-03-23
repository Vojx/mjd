window.onload = function(){
    //单机和全选按钮的实现
    checked();
    //垃圾桶效果
    deleteObj();
    //菜单按钮效果
    menuBtn();
    //产品数量添加
    changeNum();
};
window.onresize = function(){
    location.reload(true);
};
    //单机按钮的实现
var  checked = function(){
    var checkBox = document.getElementsByClassName("jd-check-box");
    var allChose = document.querySelector(".jd-option .jd-check-box");
    for(var i = 0 ; i < checkBox.length; i++){
        checkBox[i].onclick = function(){
            addOrRemove(this);
        }
    }
    //全选按钮的实现
    allChose.onclick = function(){
        var hasChecked = this.getAttribute('checked');
        for(var i = 0; i < checkBox.length - 1; i++)
        {
            if(hasChecked !== null){
                this.removeAttribute('checked');
                checkBox[i].removeAttribute('checked');
            }else{
                this.setAttribute('checked',' ');
                checkBox[i].setAttribute('checked'," ");
            }
        }
    }
};
//添加或移除选中
var addOrRemove = function(obj){
    var hasChecked = obj.getAttribute('checked');
    if(hasChecked !== null){
        obj.removeAttribute('checked');
    }else{
        obj.setAttribute('checked',' ');
    }
};

//点击垃圾桶删除跳出模态框的动画效果

var deleteObj = function(){
    //模态框对象
    var modal = document.querySelector(".modal");
    //取消对象
    var modalCancel = modal.querySelector(".cancel");
    //确定对象
    var modalSubmit = modal.querySelector(".submit");
    //垃圾桶对象
    var deleteBoxs = document.querySelectorAll(".deleteBox");
    //垃圾桶盖子
    var deleteBoxCap;
    //遍历所有的垃圾桶
    for(var i = 0; i < deleteBoxs.length; i++){
        deleteBoxs[i].onclick = function(){
            modal.style.display = "block";
            var deleteObj = this;
            deleteBoxCap = deleteObj.getElementsByTagName("span")[0];
            //console.log(deleteBoxCap)
            deleteBoxCap.style.transition = "all 1s ease 0s";
            deleteBoxCap.style.webkitTransition = "all 1s ease 0s";

            deleteBoxCap.style.transform = "translateY(-5px) translateX(-2px) rotate(-30deg)";
            deleteBoxCap.style.webkitTransform = "translateY(-5px) translateX(-2px) rotate(-30deg)";
        }

    }
    modalCancel.onclick = function(){
        modal.style.display = "none";
        if(deleteBoxCap){
            deleteBoxCap.style.transform = "none";
            deleteBoxCap.style.webkitTransform = "none";
        }

    };
    modalSubmit.onclick = function(){
        modal.style.display = "none";
        if(deleteBoxCap){
            deleteBoxCap.style.transform = "none";
            deleteBoxCap.style.webkitTransform = "none";

            var jd_shop_product = deleteBoxCap.parentNode.parentNode.parentNode.parentNode;
            //console.log(jd_shop_product);
            var jd_shop_name = jd_shop_product.parentNode.childNodes[1];
            //console.log(jd_shop_name)
            jd_shop_product.style.display = "none";
            jd_shop_name.style.display = "none";
        }

    }
};

//菜单按钮效果
var menuBtn = function(){
    //菜单按钮对象
    var menu_btn = document.querySelector(".icon-menu");
    //导航栏对象
    var nav = document.querySelector(".jd-header-nav");
    menu_btn.onclick = function(){
        if(nav.style.display != "none"){
            nav.style.display = "none";
        }else{
            nav.style.display = "block";
        }
    };
};

//产品数量改变
var changeNum = function(){
    //加
    var addList = document.querySelectorAll(".add");
    //减
    var reduceList = document.querySelectorAll(".reduce");
    //table的个数
    var len = addList.length;

    var number = 1;

    for(var i = 0;i < len;i++){
        addList[i].onclick = function(){
            number++;
            var numTd = this.parentNode.childNodes[3];
            numTd.innerHTML = number;
        };
        reduceList[i].onclick = function(){
            if(number > 1){
                number--;
            }else{
                number = 1;
            }
            var numTd = this.parentNode.childNodes[3];

            numTd.innerHTML = number;
        }
    }

};



























//window.onload = function(){
//    var win = document.getElementsByClassName('jd_win')[0];
//    var winCon = win.getElementsByClassName('jd_win_box')[0];
//    var delBtnTop;
//
//    var deleteBtn = document.getElementsByClassName('deleteBox');
//    for(var i = 0 ; i < deleteBtn.length ; i ++){
//        deleteBtn[i].onclick = function(){
//            document.body.style.position = 'absolute';
//            win.style.display = 'block';
//            var top = document.body.scrollTop + (window.innerHeight - winCon.offsetHeight)/2;
//            /*            winCon.style.webkitTransition = 'all 0.5s ease 0s';
//             winCon.style.transition = 'all 0.5s ease 0s';
//             winCon.style.opacity = 1;
//             winCon.style.webkitTransform = 'translateY('+top+'px)';
//             winCon.style.transform = 'translateY('+top+'px)';*/
//
//            winCon.className = "jd_win_box bounceInDown";
//
//
//            /*动画*/
//            delBtnTop = this.getElementsByClassName('deleteBox_top')[0];
//            delBtnTop.style.webkitTransition = 'all 0.5s ease 0s';
//            delBtnTop.style.transition = 'all 0.5s ease 0s';
//            delBtnTop.style.webkitTransform = 'translateY(-5px) rotate(-45deg)';
//            delBtnTop.style.transform = 'translateY(-5px) rotate(-45deg)';
//        };
//    };
//
//    winCon.getElementsByClassName('cancel')[0].onclick = function(){
//        winCon.style.opacity = 0;
//        winCon.style.webkitTransform = 'translateY(0px)';
//        winCon.style.transform = 'translateY(0px)';
//        win.style.display = 'none';
//        /*动画*/
//        if(deleteBtn){
//            delBtnTop.style.webkitTransition = 'all 0.5s ease 0s';
//            delBtnTop.style.transition = 'all 0.5s ease 0s';
//            delBtnTop.style.webkitTransform = 'translateY(0px) rotate(0deg)';
//            delBtnTop.style.transform = 'translateY(0px) rotate(0deg)';
//        }
//        return false;
//    };
//    winCon.getElementsByClassName('submit')[0].onclick = function(){
//        winCon.style.opacity = 0;
//        winCon.style.webkitTransform = 'translateY(0px)';
//        winCon.style.transform = 'translateY(0px)';
//        win.style.display = 'none';
//        /*动画*/
//        if(deleteBtn){
//            delBtnTop.style.webkitTransition = 'all 0.5s ease 0s';
//            delBtnTop.style.transition = 'all 0.5s ease 0s';
//            delBtnTop.style.webkitTransform = 'translateY(0px) rotate(0deg)';
//            delBtnTop.style.transform = 'translateY(0px) rotate(0deg)';
//        }
//        return false;
//    };
//
//    var checkBtn = document.getElementsByClassName('jd_check_box');
//    for(var j = 0 ; j < checkBtn.length; j++){
//        checkBtn[j].onclick = function(){
//            var hasChecked = this.getAttribute('checked');
//            if(hasChecked !== null){
//                this.removeAttribute('checked');
//            }else{
//                this.setAttribute('checked',' ');
//            }
//        }
//    }
//};
