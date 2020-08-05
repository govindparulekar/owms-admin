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

$admin->access_token = $_POST['ATkn'];

if($admin->tokenVerify()){
    http_response_code(200);
    
    echo json_encode(array("uname"=>$admin->uname,"zone"=>$admin->zone,"dp"=>$admin->dp,"id"=>$admin->id));
}
else{
    http_response_code(401);
}