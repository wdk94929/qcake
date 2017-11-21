<?php
    require("init.php");
//    $sql="select * from mk_cake_pic where cake_id=1";
	$sql="select c.cid,p.sm,p.md,p.lg,p.cake_id,c.fre_title,c.che_title,c.price,c.weight,c.sweetness_index,c.details,c.spec from mk_cake c,mk_cake_pic p where c.cid=p.cake_id";
    $result=mysqli_query($conn,$sql);
    $rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($rows);
?>
