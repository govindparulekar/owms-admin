<?php
class Database{
    private $PDOconn;
    private $host = 'localhost';
    private $user = 'govind';
    private $pass = 'govind2322';
    private $dbname = 'owms';

    public function connect(){
        try{
        $dsn = "mysql:host=$this->host;dbname=$this->dbname";
        $this->PDOconn = new PDO($dsn,$this->user,$this->pass);
        $this->PDOconn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE,PDO::FETCH_ASSOC);
        return $this->PDOconn;
        }
        catch(PDOException $e){
            return 0;

        }
    }
    
    public function close($PDOconn){
        $this->PDOconn = null;
    }

}

?>