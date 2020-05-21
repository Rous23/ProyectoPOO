<?php
    header("Content-Type: application/json");
    include_once("../clases/class-categorias.php");
    require_once("../clases/class-database.php");
    
    $database = new Database();
    //$_POST = json_decode(file_get_contents('php://input'),true);

    switch($_SERVER['REQUEST_METHOD']){
        case 'GET':
            //echo "Parametro GET " . $_GET['id'];
            if(isset($_GET['idCategoria'])){
                Categoria::obtenerCategoria($database->getDb(),$_GET['idCategoria']);
            }else{
                Categoria::obtenerCategorias($database->getDb());
            }
        break;
    }
?>