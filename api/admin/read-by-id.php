<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers:Access-Control-Allow-Origin,Access-Control-Allow-Methods,Content-Type ');

include '../../config/Database.php';
include '../../model/admin.php';
$db = new Database();
$con = $db->connect();

$admin = new Admin($con);
if(isset($_POST['id'])){
    $admin->id = $_POST['id'];
    if($admin->read()){
        $response = array(
            "status"=>"ok"
        );
        $response["data"] = array(
            "id"              => $admin->id,
            "uname"           => $admin->uname,
            "email"           => $admin->email,
            "mobile"          => $admin->mobile,
            "pan"             => $admin->pan,
            "adhaar"          => $admin->adhaar,
            "date_created"    => $admin->date_created,
            "time_created"    => $admin->time_created, 
            "dp"              => $admin->dp,
            "zone"            => $admin->zone
        ); 
        echo json_encode($response);
    }
    else{
        $response = array(
            "status"=>404,
            "message"=>"No admin found with this id!"
        );
        echo json_encode($response);

    }
}
else{
    $response = array(
        "status"=>"failed",
        "message"=>"Wrong or No parameters passed"
    );
    echo json_encode($response);
}



