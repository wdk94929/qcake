/**
 * 请求页面头部和尾部,在页面中引用common.js即可调用
 */
(function () {
    $.ajax({
        type:"GET",
        url:"header.html",
        success:function(data){
             //console.log(data)
            // $("head").append(`<link rel="stylesheet" href="css/header.css">`);
            $(".header").html(data);
			$("body").append(`<script src="js/header.js"></script> `)
        },
        error:function(){
            alert("网络错误，请检查");
        }
    });
    $.ajax({
        type:"GET",
        url:"footer.html",
        success:function(data){
            $("head").append(`<link rel="stylesheet" href="css/footer.css">`);
            $(".footer").html(data)
        },
        error:function(){
            alert("网络错误，请检查")
        }
    });
})();
//设置加入购物车 && 购买按钮 悬停的样式
function inChange(selector, txt1, txt2) {
	selector.hover(
		function () {
			selector.css("backgroundColor", "#8b7860");
			selector.attr("value", txt1);
		},
		function () {
			selector.css("backgroundColor", "#b0916a");
			selector.attr("value", txt2);
		}
	)
}

/*
* 点击时进行自增 && 自减 以及输入框的数字的正则判断
* 此方法调用需要设置num全局变量
* */
function addCartReg(Midinput,addRight,subLeft){
    //当表单的内容小于1或者为空时，设置内容为1
    Midinput.blur(function () {
        /*
         // if(Number(aa)){
         //     if(aa<=1){
         //         $inputMid.val(1);
         //     }else{
         //         $inputMid.val(aa);
         //     }
         // }else{
         //     $inputMid.val(1);
         // }
         */
        num = parseInt(Midinput.val());
        //console.log(num);
        var aReg = /^[1-9]\d{0,5}$/;
        if (aReg.test(num)) {
            Midinput.val(num);
        } else {
            Midinput.val(1);
        }
    });
    //点击增加
    addRight.click(function () {
        num = parseInt(Midinput.val());
        num++;
        Midinput.val(num);
    });
    //点击减少
    subLeft.click(function () {
        // num=parseInt($inputMid.val());
        if (num > 1) {
            num--;
            Midinput.val(num);
        } else {
            Midinput.val(1);
        }
    });
}
/*
* 点击时判断 如果sessionStorage的uname为空时，跳登录页 否则跳购物车
*
* */
function isLogin(selector){
	selector.click(function (e) {
		e.preventDefault();
		if (sessionStorage.getItem("uname") == null) {
			location.href = "2.login.html"
		} else {
			location.href = "5.shoppingCart.html";
		}
	})
}


