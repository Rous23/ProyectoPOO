<?php
    require_once __DIR__.'../../vendor/autoload.php';
    use Kreait\Firebase\Factory;
    class Database{
        private $keyFile = '../secret/proyectopoo-6722b-2d433c44eb3b.json';
        private $URI = 'https://proyectopoo-6722b.firebaseio.com/';
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