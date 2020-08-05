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
            $cid = isset($_POST['complaint_id'])?$_POST['complaint_id']:null;
            $sid = isset($_POST['sweeper_id'])?$_POST['sweeper_id']:null;
            $msg = isset($_POST['message'])?$_POST['message']:null;
            
            if(isset($aid)&&isset($cid)&&isset($sid)&&isset($msg)){
                createAdminNotification($aid,$cid,$sid,$msg);   
            }
            else{
                echo insufParamMsg();
                
            }
        }
        elseif(($_POST['notificant']=="sweeper")){
            $cid = isset($_POST['complaint_id'])?$_POST['complaint_id']:null;
            $sid = isset($_POST['sweeper_id'])?$_POST['sweeper_id']:null;
            $msg = isset($_POST['message'])?$_POST['message']:null;
    
            if(isset($cid)&&isset($sid)&&isset($msg)){
                createSweeperNotification($cid,$sid,$msg);   
            }
            else{
                echo insufParamMsg();
            }
    
        }
        elseif(($_POST['notificant']=="user")){
            $cid = isset($_POST['complaint_id'])?$_POST['complaint_id']:null;
            $uid = isset($_POST['user_id'])?$_POST['user_id']:null;
            $msg = isset($_POST['message'])?$_POST['message']:null;
            $fback_link = isset($_POST['feedback_link'])?$_POST['feedback_link']:null;
    
            if(isset($cid)&&isset($uid)&&isset($msg)&&isset($fback_link)){
    
                createUserNotification($cid,$uid,$msg,$fback_link);   
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




function createAdminNotification($aid,$cid,$sid,$msg){
    $db = new Database();
    $con = $db->connect();
    $admin_notification = new AdminNotification($con);

    $admin_notification->admin_id = $aid;
    $admin_notification->complaint_id = $cid;
    $admin_notification->sweeper_id = $sid;
    $admin_notification->message = $msg;

    if($admin_notification->create()){
        successMsg();
    }
    else{
        failedMsg();
    }
   
}
function createSweeperNotification($cid,$sid,$msg){
    $db = new Database();
    $con = $db->connect();
    $sweeper_notification = new SweeperNotification($con);

    $sweeper_notification->complaint_id = $cid;
    $sweeper_notification->sweeper_id = $sid;
    $sweeper_notification->message = $msg;

    if($sweeper_notification->create()){
        successMsg();
    }
    else{
        failedMsg();
    }
   
}
function createUserNotification($cid,$uid,$msg,$fback_link){

    $db = new Database();
    $con = $db->connect();
    $user_notification = new UserNotification($con);

    $user_notification->complaint_id = $cid;
    $user_notification->user_id = $uid;
    $user_notification->message = $msg;
    $user_notification->feedback_link = $fback_link;
    
    if($user_notification->create()){
        successMsg();
    }
    else{
        failedMsg();
    }
    
   
}

function successMsg(){
    echo json_encode(array(
        "status"=>"success",
        "message"=>"Notification created successfully"
    ));
}

function failedMsg(){
    echo json_encode(array(
        "status"=>"failed",
        "message"=>"something went wrong/notification exists"
    ));
}
function insufParamMsg(){
    echo json_encode(array(
        "status"=>"failed",
        "message"=>"Insufficient or wrong parameters/parameter-values"
    ));
}

