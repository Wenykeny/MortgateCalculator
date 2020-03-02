<?php
ob_start();
if (!isset($_SESSION)) {
    session_start();
}
$conn = mysqli_connect('localhost','root','','mortgage') or die ('THERE IS NOT A DATABASE CONNECTION');
// if ($conn) {
//     echo 'Connected';
// }

if (isset($_POST['sendData'])) {
    $name = $_POST['name'];
    $price = $_POST['price'];
    $deposit = $_POST['deposit'];
    $interest = $_POST['interest'];
    $year = $_POST['year'];

    //echo 'Mortgage name: "'. $name .'" was saved. <br>'. $price .', '. $deposit .', '. $interest .', '. $year;

    $query = "SELECT * FROM calc_saved WHERE name='{$name}' ";
    $result = mysqli_query($conn, $query);
    if (mysqli_num_rows($result) <= 0) {
        $insert = "INSERT INTO calc_saved(name, purchase, deposit, interest, bondyear) VALUES ('{$name}',{$price},{$deposit},{$interest},{$year})";
        $res = mysqli_query($conn, $insert);

        if ($res) {
            echo 'inserted';
        }else{
            echo 'not inserted';
        }

    } else {
        echo 'not';
    }
}

if (isset($_POST['requestList'])) {
    $cars = array();
    
    $query = "SELECT name FROM calc_saved ORDER BY id DESC";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) > 0) {
        foreach ($result as $row) {
            $cars[] = $row["name"];
        }
        echo json_encode($cars);

    } else {
        echo 'not';
    }
}

if (isset($_POST['requestData'])) {
    $name = $_POST['name'];
    $query = "SELECT purchase,deposit,interest,bondyear FROM calc_saved WHERE name='{$name}' ";
    $result = mysqli_query($conn, $query);
    $getAll = mysqli_fetch_assoc($result);

    if (mysqli_num_rows($result) > 0) {
        echo json_encode($getAll);
    } else {
        echo 'not';
    }
}