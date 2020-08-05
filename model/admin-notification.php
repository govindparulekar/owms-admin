<?php
class AdminNotification{

    private $table_name = "admin_notifications";
    private $con;

    public $notification_id;
    public $admin_id;
    public $complaint_id;
    public $sweeper_id;
    public $message;
    public $status;
    public $timestamp;
    public $count;

    public function __construct($con){
        $this->con = $con;
    }


    public function create(){

        if(!$this->isDup()){
        //preparing
            $query = "INSERT INTO $this->table_name(admin_id,complaint_id,sweeper_id,message,status,timestamp) values(?,?,?,?,0,CURRENT_TIMESTAMP)";
            $stmt = $this->con->prepare($query);
            //cleasning
            $admin_id = htmlspecialchars(strip_tags($this->admin_id));
            $complaint_id = htmlspecialchars(strip_tags($this->complaint_id));
            $sweeper_id = htmlspecialchars(strip_tags($this->sweeper_id));
            $message = htmlspecialchars(strip_tags($this->message));
        
            //binding
            $stmt->bindParam(1,$admin_id);
            $stmt->bindParam(2,$complaint_id);
            $stmt->bindParam(3,$sweeper_id);
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
        $query_count = "SELECT COUNT(*) FROM $this->table_name WHERE admin_id = ?";
        $query = "SELECT id,complaint_id,sweeper_id,message,timestamp,status FROM $this->table_name WHERE admin_id = ?";
        $stmt1 = $this->con->prepare($query_count);  
        $stmt1->bindParam(1,$this->admin_id);
        $stmt1->execute();
        if(($count = $stmt1->fetchColumn())>0){
            $this->count = $count; 
            $stmt = $this->con->prepare($query);
            $stmt->bindParam(1,$this->admin_id);
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
        $query = "UPDATE $this->table_name SET status = 1 WHERE admin_id = ? AND status = 0";
        $stmt = $this->con->prepare($query);
        $stmt->bindParam(1,$this->admin_id);
        
        if($stmt->execute()){
            return $stmt->rowCount();
        }
        else{
            return false;
        }

    }


}
