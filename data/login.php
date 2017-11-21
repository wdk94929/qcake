<?php
    //加载公共程序
    require("init.php");
    //接收浏览器端发送的数据
    $uname=$_REQUEST["uname"];
    $upwd=$_REQUEST["upwd"];
    //编写SQL语句并发送
    $sql="select * from mk_user where uname='$uname' and upwd='$upwd'";
    $result=mysqli_query($conn,$sql);
    //获取返回结果并抓取一行
    $row=mysqli_fetch_assoc($result);
    //判断输出
    if($row==null){
        echo '{"code":-1,"msg":"您输入的密码不正确"}';
    }else{
        $uid=$row["uid"];
        echo '{"code":1,"msg":"","uid":'.$uid.'}';
    }
?>