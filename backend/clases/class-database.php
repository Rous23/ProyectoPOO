<?php
    require_once __DIR__.'../../vendor/autoload.php';
    use Kreait\Firebase\Factory;
    class Database{
        private $keyFile = '.';
        private $URI = '';
        private $db;
        public function __construct(){
            $firebase = (new Factory)
                ->withServiceAccount($this->keyFile)
                ->withDatabaseUri($this->URI);
            $this->db = $firebase->createDatabase();
        }

        public function getDb(){
            return $this->db;
        }
    }
?>