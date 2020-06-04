<?php
    header("Content-Type: application/json");
    include_once("../clases/class-admin.php");
    require_once("../clases/class-database.php");
    
    $database = new Database();
    $_POST = json_decode(file_get_contents('php://input'),true);
    switch($_SERVER['REQUEST_METHOD']){
        case 'GET':
            Administrador::obtenerAdmin($database->getDb());
            
        break;
    }
?>