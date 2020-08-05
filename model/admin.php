<?php
class Admin{

    private $table_name = "admin";
    private $con;

    public $id;
    public $uname;
    public $email;
    public $dp;
    public $mobile;
    public $admin_id;
    public $password;
    public $pan;
    public $adhaar;
    public $date_created;
    public $time_created;
    public $access_token;
    public $zone;

    function __construct($PDOcon){
        $this->con = $PDOcon;
    }

    public function read(){
        if(isset($this->id)){
            $query = "SELECT * FROM admin WHERE id = :id";
            $stmt = $this->con->prepare($query);

            $id = htmlspecialchars(strip_tags($this->id));
            $stmt->bindParam(':id',$id);
        }
        elseif(isset($this->zone)){
            $query = "SELECT * FROM admin WHERE zone = :zone";
            $stmt = $this->con->prepare($query);

            $zone = htmlspecialchars(strip_tags($this->zone));
            $stmt->bindParam(':zone',$zone);
        }
        $stmt->execute();

        $res = $stmt->fetch();
        if($res){
            extract($res);
            $this->id = $id;
            $this->uname = $uname;
            $this->email = $email;
            $this->mobile = $mobile;
            $this->adhaar = $adhaar;
            $this->pan = $pan;
            $this->dp = $dp;
            $this->date_created = $date_created;
            $this->time_created = $time_created;
            $this->zone = $zone;

            return true;
        }
        else{
            return false;
        }
    }

    public function register(){
            $query = "INSERT INTO $this->table_name(uname,email,mobile,adhaar,pan,password,dp,date_created,time_created,zone,access_token) VALUES(:uname,:email,:mobile,:adhaar,:pan,:password,:dp,CURRENT_DATE,CURRENT_TIME,:zone,:access_token)";
            $stmt = $this->con->prepare($query);

            $uname = htmlspecialchars(strip_tags($this->uname));
            $email = htmlspecialchars(strip_tags($this->email));
            $pan = htmlspecialchars(strip_tags($this->pan));
            $mobile = htmlspecialchars(strip_tags($this->mobile));
            $adhaar = htmlspecialchars(strip_tags($this->adhaar));
            $password =htmlspecialchars(strip_tags($this->password));
            $dp = htmlspecialchars(strip_tags($this->dp));
            $zone = htmlspecialchars(strip_tags($this->zone));
            $access_token = hash('md5',$uname);


           
            $stmt->bindParam(':uname',$uname);
            $stmt->bindParam(':email',$email);
            $stmt->bindParam(':mobile',$mobile);
            $stmt->bindParam(':adhaar',$adhaar);
            $stmt->bindParam(':pan',$pan);
            $stmt->bindParam(':password',$password);
            $stmt->bindParam(':dp',$dp);
            $stmt->bindParam(':zone',$zone);
            $stmt->bindParam(':access_token',$access_token);


            if($stmt->execute()){
                return true;
            }
            else{
                return false;
            };
    
    }
    function getAtkn(){

    }
    public function isRegistered(){
        $query = "SELECT COUNT(*) FROM $this->table_name WHERE email = :email";
        //$stmt = $this->con->query($query);
        $stmt = $this->con->prepare($query);
        $stmt->bindParam(':email',$this->email);
        $stmt->execute();
        $count = $stmt->fetchColumn();
        if($count){
            return true;
        }
    }
    public function isUnameTaken(){
        $query = "SELECT COUNT(*) FROM $this->table_name WHERE uname = :uname";
        //$stmt = $this->con->query($query);
        $stmt = $this->con->prepare($query);
        $stmt->bindParam(':uname',$this->uname);
        $stmt->execute();
        $count = $stmt->fetchColumn();
        if($count){
            return true;
        }
    }

    public function loginVerify(){
        //check if uname exists
        //$uname = "govind2322";
        $query = "SELECT uname,password,access_token FROM $this->table_name WHERE uname=:uname";
        $stmt = $this->con->prepare($query);
        $stmt->bindParam(':uname',$this->uname);
        $stmt->execute();
        //if uname doesn't exixts fetch will return false
        $res = $stmt->fetch();
        extract($res);
        if($res){
            //verify password
            if(password_verify($this->password,$password)){
                //password matches
                $this->access_token = $access_token;                                     
                return true;
            }
            else{
                return false;
            }

        }
        else{
            //inalid uname or password
            return false;
        }
    }

    public function tokenVerify(){
        $query = "SELECT id,uname,zone,dp FROM $this->table_name WHERE access_token = :access_token";
        $stmt = $this->con->prepare($query);
        $stmt->bindParam(':access_token',$this->access_token);
        $stmt->execute();
        if($res = $stmt->fetch()){
            extract($res);
            $this->uname = $uname;
            $this->zone = $zone;
            $this->dp = $dp;
            $this->id = $id;
            return true;
        }
        else{
            return false;
        }
    }


    public function sendComplaint($complaint_id,$s_uuid_arr){
        $query1 = "UPDATE incoming_complaints SET is_under_process = 1 WHERE id = ?";
        $stmt = $this->con->prepare($query1);
        $stmt->execute([$complaint_id]);
        $query2 = "INSERT INTO under_process_complaints(sweeper_uuid,complaint_id) VALUES(?,?)";
        $stmt = $this->con->prepare($query2);
        $aff_row_count = 0;

        for($i = 0; $i<sizeof($s_uuid_arr);$i++){
            $stmt->execute([$s_uuid_arr[$i],$complaint_id]) or die('error executing query');
            $aff_row_count += $stmt->rowCount();

        }
        return $aff_row_count;
    }

}

