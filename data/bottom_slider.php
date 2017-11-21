<?php
    require("init.php");
    $sql="select img from mk_index_carousel";
    $result=mysqli_query($conn,$sql);
    $rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($rows);
?>