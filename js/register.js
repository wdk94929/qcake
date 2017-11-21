/****************注册表去除label内文字*********************/
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
                $tar.next("span").css("font-size","14px").html(message);
            }else{
                $tar.prev().addClass("hidden");
            }
        })
    }
    removeLabel("#user_name","请输入用户名");
    removeLabel("#user_phone","请输入您的手机号");
    removeLabel("#user_phone_confim","");
    removeLabel("#user_pwd","密码必须是6~30位字符，可使用字母、数字");
    removeLabel("#user_pwd_confirm","");
})();
//验证用户名是否正确 密码手机号是否符合规则 并注册
(()=>{
    var $uname=$("#user_name"),$phone=$("#user_phone"),$upwd=$("#user_pwd");
    var $checkBox=$("#check_box"),$btn=$("#btn"),$upwd_confirm=$("#user_pwd_confirm");
    var phoneReg=/^(\+86|0086)?\s*1[34578]\d{9}$/;
    var unameReg=/^[a-zA-z0-9]{3,10}$/;
    var upwdReg=/^[a-zA-z0-9]{6,15}$/;
    function valiUname(){
        var uname=$uname.val();
        // console.log(uname);
        if(uname==""){
            $uname.next().css({fontSize:"14px",color:"#b0916a"}).html("用户名不能为空");
            return false;
        }else if(!unameReg.test(uname)) {
            $uname.next().css({fontSize: "14px", color: "#b0916a"}).html("用户名必须是3-10位的数字或字母");
            return false;
        }else{
            $.ajax({
                type:"GET",
                url:"data/vali.php",
                data:{uname:uname},
                success:function(data){
                    if(data.code<0){
                        $uname.next().css({fontSize:"14px",color:"#b0916a"}).html("通过");
                        return true;
                    }else{
                        $uname.next().css({fontSize:"14px",color:"#b0916a"}).html("该用户名已存在");
                        return false;
                    }
                },
                error:function(){
                    alert("网络错误，请检查");
                    return false;
                }
            })
            if($uname.next().html()=="通过"){
                return true;
            };
            if($uname.next().html()==""||$uname.next().html()=="该用户名已存在"||$uname.next().html()=="用户名必须是3-10位的数字或字母"){
                return false;
            }
        }
    }
    function valiPhone(){
        var phone=$phone.val();
        if(!phoneReg.test(phone)){
            $phone.next().css({fontSize:"14px",color:"#b0916a"}).html("请输入正确格式的手机号");
            return false;
        }else{
            $phone.next().css({fontSize:"14px",color:"#b0916a"}).html("通过");
            return true;
        }
    }
    function valiUpwd(){
        var upwd=$upwd.val();
        if(!upwdReg.test(upwd)){
            $upwd.next().css({fontSize:"14px",color:"#b0916a"}).html("密码必须是6~30位字符，可使用字母、数字");
            return false;
        }else{
            $upwd.next().css({fontSize:"14px",color:"#b0916a"}).html("通过");
            return true;
        }
    }
    function valiConfirm(){
        var upwd=$upwd.val();
        var upwd_confirm=$upwd_confirm.val();
        if(upwd_confirm!=upwd){
            $upwd_confirm.next().css({fontSize:"14px",color:"#b0916a"}).html("两次输入的密码必须一致");
            return false;
        }else if(upwd_confirm==""){
            $upwd_confirm.next().html("");
            return false;
        }else{
            $upwd_confirm.next().css({fontSize:"14px",color:"#b0916a"}).html("通过");
            return true;
        }
    }
    $uname.blur(valiUname);
    $phone.blur(valiPhone);
    $upwd.blur(valiUpwd);
    $upwd_confirm.blur(valiConfirm);
    $btn.click(function(){
        var name=$uname.val(),pwd=$upwd.val(),phone=$phone.val();
        var testUname=valiUname(),testPhone=valiPhone(),testUpwd=valiUpwd();
        var testConfirm=valiConfirm();
        //判断当（testUname && testPhone && testUpwd && testConfirm）返回值为
        //true时进行注册
        if(testUname && testPhone && testUpwd && testConfirm){
            // console.log(123);
            //如果多选框选中时发送AJAX请求 否则显示
            if($checkBox.prop("checked")){
                $.ajax({
                    type:"GET",
                    url:"data/register.php",
                    data:{uname:name,upwd:pwd,phone:phone},
                    success:function(data){
                        console.log(data)
                        setInterval(function(){
                            if(data.code>0){
                                location.href="2.login.html";
                            }
                        },3000)
                    },
                    error:function(){
                        alert("网络错误，请检查")
                    }
                })
            }else{
                console.log("必须同意网站服务协议")
            }
        }
    })
})();
