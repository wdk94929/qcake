<?php
	require("init.php");
	$uname=$_REQUEST["uname"];
//	$upwd=$_REQUEST["upwd"];
	$sql="select uname from mk_user where uname='$uname'";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_assoc($result);
	if($row==null){
		echo '{"code":-1,"msg":"您输入的用户名不正确"}';
	}else{
		echo '{"code":1,"msg":""}';
	}
?>