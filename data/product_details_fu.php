<?php
    require("init.php");
	$cid=$_REQUEST["index"];
	if(!$cid){
		$cid=1;
	};
	$output=[
		"descData"=>[],
		"picData"=>[]
	];
	$sql="select c.fre_title,c.che_title,c.price,c.weight,c.sweetness_index,c.details,c.spec from mk_cake c where cid='$cid'";
	//$sql="select sm,md,lg from mk_cake_pic where cake_id=1";
	//$sql="select c.cid,p.sm,p.md,p.lg,p.cake_id,c.fre_title,c.che_title,c.price,c.weight,c.sweetness_index,c.details,c.spec from mk_cake c,mk_cake_pic p where c.cid=p.cake_id=1";
    $result=mysqli_query($conn,$sql);
    $rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
	$output["descData"] = $rows;
	$sql="select sm,md,lg from mk_cake_pic where cake_id=$cid order by pid";
	$result=mysqli_query($conn,$sql);
    $rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
	$output["picData"] = $rows;
    echo json_encode($output);
?>
