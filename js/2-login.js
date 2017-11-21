
(()=>{
    function removeLabel(selector,message){
        $(selector).focus(e=>{
            var $tar=$(e.target);
            $tar.next("span").html("");
            $tar.prev().addClass("hidden");
        }).blur(e=>{
            var $tar=$(e.target);
            if($tar.val()==""){
                $tar.prev().removeClass("hidden");
                $tar.next("span").html(message);
            }else{
                $tar.prev().addClass("hidden");
            }
        })
    }
    removeLabel("#user_name","")
    removeLabel("#user_pwd","")
})();
//登录验证
(()=>{
    //为登录按钮绑定单击事件
    $(".login_btn").click(function(){
        var n=$("#user_name").val();
        var p=$("#user_pwd").val();
        // console.log(n)
        if(n==""){
            $(".vali_phone_error").css({fontSize:"14px",color:"#b0916a"}).html("用户名不能为空");
        }else{
            $.ajax({
                type:"GET",
                url:"data/login.php",
                data:{uname:n,upwd:p},
                success:function(data){
                    if(data.code>0){
                        sessionStorage.setItem("uname",n);
                        //判断uid防止非法登录
                        sessionStorage.setItem("uid",data.uid);
                        location.href="2.login_success.html";
                    }
                },
                error:function(){
                    alert("网络错误，请检查");
                }
            })
        }

    })
})();
//验证用户名或密码是否正确
(()=>{
    function valiUname(){
        var uname=$("#user_name").val();
        if(uname==""){
            $(".vali_phone_error").css({fontSize:"14px",color:"#b0916a"}).html("用户名不能为空");
        }else{
            $.ajax({
                type:"GET",
                url:"data/vali.php",
                data:{uname:uname},
                success:function(data){
                    if(data.code<0){
                        $(".vali_phone_error").css({fontSize:"14px",color:"#b0916a"}).html(data.msg);
                    }else{
                        $(".vali_phone_error").css({fontSize:"14px",color:"#b0916a"}).html(data.msg);
                    }
                },
                error:function(){
                    alert("网络错误，请检查");
                }
            })
        }
    }
    function valiUpwd(){
        var uname=$("#user_name").val();
        var upwd=$("#user_pwd").val();
        if(upwd==""){
            $(".vali_pwd_error").css({fontSize:"14px",color:"#b0916a"}).html("密码不能为空");
        }else{
            $.ajax({
                type:"GET",
                url:"data/vali_upwd.php",
                data:{uname:uname,upwd:upwd},
                success:function(data){
                    if(data.code<0){
                        $(".vali_pwd_error").css({fontSize:"14px",color:"#b0916a"}).html(data.msg);
                    }else{
                        $(".vali_pwd_error").css({fontSize:"14px",color:"#b0916a"}).html(data.msg);
                    }
                },
                error:function(){
                    alert("网络错误，请检查");
                }
            })
        }
    }
    $("#user_name").blur(valiUname);
    $("#user_pwd").blur(valiUpwd);
})()