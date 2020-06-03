<?php
    header("Content-Type: application/json");
    include_once("../clases/class-estrellas.php");
    require_once("../clases/class-database.php");
    
    $database = new Database();
    $_POST = json_decode(file_get_contents('php://input'),true);
    switch($_SERVER['REQUEST_METHOD']){
        case 'POST':
            $estrellas = new Estrella(
                $_POST["cantidad"]
                
            );
            echo $estrellas->guardarEstrellas($database->getDb(),$_GET['idProd'],$_GET['idCat'],$_GET['idEmpresa']);
        break;
        case 'DELETE':
            //UsuarioCliente::eliminarUsuario($database->getDb(),$_GET['id']);
        break;
    }
?>