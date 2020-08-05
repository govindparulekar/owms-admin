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

$admin->uname = $_POST['uname'];
$admin->password = $_POST['password'];

if($admin->loginVerify()){
    echo json_encode(array("ATkn"=>$admin->access_token));
    //start a new session and set session variables
    //echo json_encode(array("ATkn"=>$admin->access_token));
    http_response_code(200);
    
}
else{
    http_response_code(401);
    echo json_encode(array("message"=>"Login failed"));
}