<?php
	/*
	 *1.获取此用户id 并插入至mk_shopping_car表
	 *2.获取商品的cid 存在mk_shopping_car表的product_id 
	 *3.根据product_id查询mk_cake表的商品信息，并渲染
	*/
	require_once("init.php");
	$uid = $_REQUEST["uid"];
	$cid = $_REQUEST["index"];
	$buyCount = $_REQUEST["buyCount"];
	//添加一步，先查询当user_id=uid and cake_id=cid的时候sid存在吗?
	//存在执行更新
	//不存在执行插入
	$sql="select sid from mk_shopping_car where cake_id='$cid' and user_id='$uid'";
	$result = mysqli_query($conn,$sql);
	$row = mysqli_fetch_row($result);
	//echo $row;
	if(!$row){
		$sql = "insert into mk_shopping_car values(null,$uid,$cid,$buyCount,0)";
	}else{
		$sql = "update mk_shopping_car set count=count+$buyCount where cake_id='$cid' and user_id='$uid'";
	}
	$result = mysqli_query($conn,$sql);
	if($result){
		echo '{"code":200, "msg":"add succ"}';
	}else {
		echo '{"code":500, "msg":"add err"}';
	};
	//不会立即跳页，

	//	$sql = "select c.fre_title,c.che_title,c.price,c.weight,c.sweetness_index,c.details,c.spec from mk_cake c where cid='$cid'";
	//	$result = mysqli_query($conn,$sql);
	//	$rows = mysqli_fetch_all($result,MYSQLI_ASSOC);
	//	echo json_encode($rows);

	
	
	
?>