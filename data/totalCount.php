<?php
    require("init.php");
    $uid=$_REQUEST["uid"];
    $sql="select sid,count from mk_shopping_car where user_id='$uid'";
    $result=mysqli_query($conn,$sql);
    $rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($rows);
?>