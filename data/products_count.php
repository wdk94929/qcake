<?php
	require_once("init.php");
	$sql="select family_id,fre_title,che_title,price,weight,sweetness_index,pic,nature_img,category,sold_count from mk_cake order by sold_count desc limit 5";
	$result=mysqli_query($conn,$sql);
	$rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
	echo json_encode($rows);
?>