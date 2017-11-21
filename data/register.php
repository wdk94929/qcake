<?php
    require("init.php");
    //接收用户发来的信息
    $uname=$_REQUEST["uname"];
    $upwd=$_REQUEST["upwd"];
    $phone=$_REQUEST["phone"];
     //编写SQL语句 并且执行
    $sql="insert into mk_user values(null,'$uname','$upwd',null,'$phone',null,null,null)";
    $result=mysqli_query($conn,$sql);
    if($result){
        echo '{"code":1,"msg":"注册成功"}';
    }else{
        echo '{"code":-1,"msg":"注册失败"}';
    }
?>
