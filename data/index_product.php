<?php
    require("init.php");
    $sql="select cid,family_id,fre_title,che_title,price,weight,sweetness_index,pic,nature_img,category,href from mk_cake";
    $result=mysqli_query($conn,$sql);
    $rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($rows);
?>