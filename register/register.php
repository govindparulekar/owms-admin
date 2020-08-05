<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers:Access-Control-Allow-Origin,Access-Control-Allow-Methods,Content-Type ');

include '../config/Database.php';
include '../model/admin.php';

$db = new Database();
$con = $db->connect();

$admin = new Admin($con);

$dp_path = uploadImage();

$admin->uname = $_POST['uname'];
$admin->email = $_POST['email'];
$admin->pan = $_POST['pan'];
$admin->adhaar = $_POST['adhaar'];
$admin->mobile = $_POST['mobile'];
$admin->zone = $_POST['zone'];

$admin->dp = $dp_path;
$admin->password = password_hash($_POST['pwd'],PASSWORD_DEFAULT);

if(!$admin->isUnameTaken()){
    if($admin->isRegistered()){
        echo json_encode(array(
            'message' => 'Someone already has an account with this email'
        ));
    }
    else{
    
    if($admin->register()){
        echo json_encode(array(
            'message' => 'Registered Successfully'
        ));
    }
    else{
        echo json_encode(array(
            'message' => "Could'nt register, something went wrong.."
        ));
    }
    }
}
else{
    echo json_encode(array(
        'message' => "uname taken"
    ));
}




function uploadImage(){
    $dp_folder = "dp-uploads/";
    $dp_name = $_POST['uname'];
    $dp_ext = pathinfo($_FILES['dp']['name'],PATHINFO_EXTENSION);
    $dp_path = $dp_folder.$dp_name.'.'.$dp_ext;
    move_uploaded_file($_FILES['dp']['tmp_name'],$dp_path);
    return $dp_path;
}