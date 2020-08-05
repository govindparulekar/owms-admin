<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers:Access-Control-Allow-Origin,Access-Control-Allow-Methods,Content-Type ');

include '../../config/Database.php';
include '../../model/admin-notification.php';
include '../../model/sweeper-notification.php';
include '../../model/user-notification.php';

if($_SERVER['REQUEST_METHOD']!="POST"){
    echo json_encode(array(
        "status"=>"failed",
        "message"=>"Use POST method"
    ));
}
else{
    if(isset($_POST['notificant'])){
        if($_POST['notificant']=="admin"){
            $aid = isset($_POST['admin_id'])?$_POST['admin_id']:null;

            if(isset($aid)){
                markAdminNotification($aid);   
            }
            else{
                echo insufParamMsg();
                
            }
        }
        elseif(($_POST['notificant']=="sweeper")){
            $sid = isset($_POST['sweeper_id'])?$_POST['sweeper_id']:null;

            if(isset($sid)){
                markSweeperNotification($sid);   
            }
            else{
                echo insufParamMsg();
            }

        }
        elseif(($_POST['notificant']=="user")){
            $uid = isset($_POST['user_id'])?$_POST['user_id']:null;
            if(isset($uid)){

                markUserNotification($uid);   
            }
            else{
                echo insufParamMsg();
            }
        }
        else{
            echo insufParamMsg();
        }
    }
    else{
        echo insufParamMsg();
    }
}


function markAdminNotification($aid){
    $db = new Database();
    $con = $db->connect();
    $admin_notification = new AdminNotification($con);

    $admin_notification->admin_id = $aid;

    if($read_count = $admin_notification->markRead()){
        successMsg($read_count);
    }
    else{
        failedMsg();
    }
   
}
function markSweeperNotification($sid){
    $db = new Database();
    $con = $db->connect();
    $sweeper_notification = new SweeperNotification($con);
    $sweeper_notification->sweeper_id = $sid;

    if($read_count = $sweeper_notification->markRead()){
        successMsg($read_count);
    }
    else{
        failedMsg();
    }
   
}
function markUserNotification($uid){

    $db = new Database();
    $con = $db->connect();
    $user_notification = new UserNotification($con);

    $user_notification->user_id = $uid;
    
    if($read_count = $user_notification->markRead()){
        successMsg($read_count);
    }
    else{
        failedMsg();
    }
    
   
}

function successMsg($read_count){
    echo json_encode(array(
        "status"=>"success",
        "message"=>"$read_count notification/s marked read successfully"
    ));
}

function failedMsg(){
    echo json_encode(array(
        "status"=>"failed",
        "message"=>"something went wrong/notification marked read exists"
    ));
}
function insufParamMsg(){
    echo json_encode(array(
        "status"=>"failed",
        "message"=>"Insufficient or wrong parameters/parameter-values"
    ));
}