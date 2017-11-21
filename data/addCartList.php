<?php
	/*
	 *获取购物车的内容，根据购物车表中的user_id查询出cake_id
	 *根据cid=s.cake_id在mk_cake表中查询出所需要的信息
	*/
	require_once("init.php");
	$uid = $_REQUEST["uid"];
	$sql = "select s.sid,s.cake_id,s.count,s.is_delete,c.fre_title,c.che_title,c.price,c.weight,c.spec from mk_shopping_car s,mk_cake c where user_id='$uid' and cid=s.cake_id";
	$result = mysqli_query($conn,$sql);
	$rows = mysqli_fetch_all($result,MYSQLI_ASSOC);
	//echo json_encode($rows);
	/*
	 *所需照片需要在mk_cake_pic表中查询第一张sm即可
	 *
	*/
	foreach($rows as $i=>$c){
		$sql = "select sm from mk_cake_pic where cake_id=$c[cake_id] limit 1";
		$result = mysqli_query($conn,$sql);
		$row = mysqli_fetch_row($result);
		$rows[$i]['pic'] = $row[0];
	}
	$output=[
		'code'=>200,
		'msg'=>$rows
	];
	echo json_encode($output);
?>