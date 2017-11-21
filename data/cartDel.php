<?php
	require_once("init.php");
	$sid = $_REQUEST["sid"];
	//$sql = "update mk_shopping_car set is_delete=1 where sid='$sid'";
	$sql = "delete from mk_shopping_car where sid='$sid'";
	$result = mysqli_query($conn,$sql);
	if($result){
		echo '{"code":200,"msg":"del succ"}';
	}else{
		echo '{"code":500,"msg":"del err"}';
	}
?>