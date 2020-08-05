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
            if(isset($aid)&&$aid!=""){
                readAdminNotification($aid);
            }
            else{
                insufParamMsg();
            }
        }
        elseif($_POST['notificant']=="sweeper"){
            $sid = isset($_POST['sweeper_id'])?$_POST['sweeper_id']:null;
            if(isset($sid)&&$sid!=""){
                readSweeperNotification($sid);
            }
            else{
                insufParamMsg();
            }
        }
        elseif($_POST['notificant']=="user"){
            $uid = isset($_POST['user_id'])?$_POST['user_id']:null;
            if(isset($uid)&&$uid!=""){
            readUserNotification($uid);
            }
            else{
                insufParamMsg();
            }
        }
        else{
            insufParamMsg();
        }
    
    }
    else{
        insufParamMsg();
    }
    
}

function readAdminNotification($aid){
    $db = new Database();
    $con = $db->connect();

    $admin_notification = new AdminNotification($con);
    $admin_notification->admin_id = $aid;
    if($stmt = $admin_notification->read()){
        //process data
        $unread_count = 0;
        $data = array(
            "status" => "success",
            "total_count"  => $admin_notification->count,
        );
        $data['data'] = array();
        while($res = $stmt->fetch()){
            extract($res);
            if($status == 0){
                $unread_count++;
            }

            $notification = array(
                "notification_id"  =>$id,
                "sweeper_id"       =>$sweeper_id,
                "complaint_id"     =>$complaint_id,
                "message"          =>$message,
                "timestamp"        =>$timestamp, 
                "status"           =>$status
            );
            array_push($data['data'],$notification);
        }
        $data['unread_count'] = $unread_count;
        
        echo json_encode($data);
    }
    else{
        //no data msg
        notFound();
    }

}
function readSweeperNotification($sid){
    $db = new Database();
    $con = $db->connect();

    $sweeper_notification = new SweeperNotification($con);
    $sweeper_notification->sweeper_id = $sid;
    if($stmt = $sweeper_notification->read()){
        //process data
        $unread_count = 0;
        $data = array(
            "status" => "success",
            "total_count"  => $sweeper_notification->count
        );      
         $data['data'] = array();

        while($res = $stmt->fetch()){
            extract($res);
            if($status == 0){
                $unread_count++;
            }
            $notification = array(
                "notification_id"  =>$id,
                "complaint_id"     =>$complaint_id,
                "message"          =>$message,
                "timestamp"        =>$timestamp,
                "status"           =>$status
            );
            array_push($data['data'],$notification);
        }
        $data['unread_count'] = $unread_count;
        echo json_encode($data);
    }
    else{
        //no data msg
        notFound();
    }

}
function readUserNotification($uid){
    $db = new Database();
    $con = $db->connect();

    $user_notification = new UserNotification($con);
    $user_notification->user_id = $uid;
    if($stmt = $user_notification->read()){
        //process data
        $unread_count = 0;
        $data = array(
            "status" => "success",
            "total_count"  => $user_notification->count
        );
        $data['data'] = array();
        while($res = $stmt->fetch()){
            extract($res);
            if($status == 0){
                $unread_count++;
            }
            $notification = array(
                "notification_id"  =>$id,
                "complaint_id"     =>$complaint_id,
                "message"          =>$message,
                "timestamp"        =>$timestamp,
                "feedback_link"    =>$feedback_link,
                "status"            =>$status
            );
            array_push($data['data'],$notification);
        }
        $data['unread_count'] = $unread_count;
        echo json_encode($data);
    }
    else{
        //no data msg
        notFound();
    }

}
function notFound(){
    echo json_encode(array(
        "status" => 404,
        "message"=> "no notifications"
    ));
}
function insufParamMsg(){
    echo json_encode(array(
        "status"=>"failed",
        "message"=>"Insufficient or wrong parameters/parameter-values"
    ));
}