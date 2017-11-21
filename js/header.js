(()=>{
    $(".header>div").addClass("fixed_nav");
    //选择城市
    var $selCity=$(".header #sec-city i");
    var $show=$(".header #sec-city .show");
    var $showUl=$(".header #sec-city ul li:first-child");
    var $showLi=$(".header #sec-city ul li a");
    //设置开关，记录当前状态
    var off=true;
    $selCity.click(function(){
        if(off){
            off=false
            $show.siblings().addClass("show");
            $showUl.addClass("show")
        }else{
            off=true;
            $show.siblings().removeClass("show");
        }
    });
    $showLi.click(function(e){
        e.preventDefault();
        $(e.target).parent().siblings().removeClass("show")
        off=true;
    });
    //点击登录 注册时跳转到登录 注册页 购物车
    var $shoppingCar=$(".header #register-box ul li:first-child");
    var $login=$(".header #register-box ul li:nth-child(2)");
    var $register=$(".header #register-box ul li:nth-child(3)");
    $shoppingCar.click(function(e){
        e.preventDefault();
        location.href="5.shoppingCart.html";
    })
    $login.click(function(e){
        e.preventDefault();
        location.href="2.login.html";
    })
    $register.click(function(e){
        e.preventDefault();
        location.href="3.register.html";
    })
})();
//显示欢迎登陆
(()=>{
    var uname=sessionStorage.getItem("uname");
    var uid=sessionStorage.getItem("uid");
    var $count = $("#register-box ul>li a");
    if(uname && uid){
        $("#register-box ul li:nth-child(2)").css("display","none");
        $("#register-box ul li:nth-child(3)").css("display","none");
        var $count = $("#register-box ul>li").first().children("a");
        //console.log($count)
        $.ajax({
            type:"GET",
            url:"data/totalCount.php",
            data:{'uid':uid},
            success:function(data){
                //console.log(data)
                var html="";
                html+=`
                <li>欢迎您 <a href="javascript:;">${uname}</a></li>
                <li><a href="javascript:;">[ 退出 ]</a></li>`;
                $("#register-box ul").append(html);
            },
            error:function(){
                alert("网络错误，请检查");
            }
        }).then((data)=>{
            var totalCount = 0;
            for(var obj of data){
                totalCount+=parseInt(obj.count);
            }
            //console.log(totalCount);
            $count.html(`${totalCount}件`)
        }).then(()=>{
            $("#register-box ul li:nth-child(5)").click(function(){
                sessionStorage.removeItem("uname");
                sessionStorage.removeItem("uid");
                $count.html(`0件`)
                $(this).prev().css("display","none");
                $(this).css("display","none");
				location.href="1.index.html";
                $("#register-box ul li:nth-child(2)").css("display","block")
                $("#register-box ul li:nth-child(3)").css("display","block")
            })
        })
    }
    // var html="";
    // html+=`<a href="javascript:;">欢迎回来${uname}</a>`;
    // $("#register-box ul li:nth-child(2)").html(html)
    //鼠标移入时，bottom的蓝色变化
    let $menuBtn=$(".menu-btn");
    // console.log($menuBtn)
    $menuBtn.hover(
        function(){
            $(this).css("border-bottom","3px solid #7B9196")
              .siblings().css("border-bottom","none");
        },
        function(){
            $(this).css("border-bottom","none");
            $("#menu-btn").css("border-bottom","3px solid #7B9196");
        }
    )
})();
