<?php
//include '../config/Database.php';
class UserNotification{

    private $table_name = "user_notifications";
    private $con;

    public $notification_id;
    public $user_id;
    public $complaint_id;
    public $message;
    public $status;
    public $timestamp;
    public $feedback_link;
    public $count;

    public function __construct($con){
        $this->con = $con;
    }


    public function create(){
        if(!$this->isDup()){
        //preparing
        
            $query = "INSERT INTO user_notifications(user_id,complaint_id,feedback_link,message,status,timestamp) values(?,?,?,?,0,CURRENT_TIMESTAMP)";
            $stmt = $this->con->prepare($query);
            //cleasning
            $user_id = htmlspecialchars(strip_tags($this->user_id));
            $complaint_id = htmlspecialchars(strip_tags($this->complaint_id));
            $feedback_link = htmlspecialchars(strip_tags($this->feedback_link));
            $message = htmlspecialchars(strip_tags($this->message));
            
            //binding
            $stmt->bindParam(1,$user_id);
            $stmt->bindParam(2,$complaint_id);
            $stmt->bindParam(3,$feedback_link);
            $stmt->bindParam(4,$message);
            
            //executing
            if($stmt->execute()){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
        
        
    }

    public function read(){
        $query_count = "SELECT COUNT(*) FROM $this->table_name WHERE user_id = ?";
        $query = "SELECT id,complaint_id,message,feedback_link,timestamp,status FROM $this->table_name WHERE user_id = ?";
        $stmt1 = $this->con->prepare($query_count);
        $stmt1->bindParam(1,$this->user_id);
        $stmt1->execute();
        if(($count = $stmt1->fetchColumn())>0){
            $this->count = $count; 
            $stmt = $this->con->prepare($query);
            $stmt->bindParam(1,$this->user_id);
            $stmt->execute();
            return $stmt;
        }
        else{
            return false;
        }
    }

    public function isDup(){
        $query = "SELECT COUNT(*) FROM $this->table_name WHERE complaint_id = ? AND message = ?";
        $stmt = $this->con->prepare($query);

        $stmt->bindParam(1,$this->complaint_id);
        $stmt->bindParam(2,$this->message);

        $stmt->execute();
        if(($res = $stmt->fetchColumn())>=1){
            return true;
        }
        else{
            return false;
        }
    }

    public function markRead(){
        $query = "UPDATE $this->table_name SET status = 1 WHERE user_id = ? AND status = 0";
        $stmt = $this->con->prepare($query);
        $stmt->bindParam(1,$this->user_id);
        
        if($stmt->execute()){
            return $stmt->rowCount();
        }
        else{
            return false;
        }

    }
}
