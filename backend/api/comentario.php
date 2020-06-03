<?php
    header("Content-Type: application/json");
    include_once("../clases/class-comentarios.php");
    require_once("../clases/class-database.php");
    
    $database = new Database();
    $_POST = json_decode(file_get_contents('php://input'),true);

    switch($_SERVER['REQUEST_METHOD']){
        case 'POST'://guardar
            $comentario = new Comentario(
                $_POST['nombreCliente'],
                $_POST['contenidoComentario'],
                $_POST['idEmpresa'],
                $_POST['idCliente'],
                $_POST['idCategoria'],
                $_POST['idProductoEnEmpresa']
            );

            echo $comentario->guardarComentario($database->getDb(),$_GET['id1']);
            
        break;
        case 'GET':
            //echo "Parametro GET " . $_GET['id'];
            if(isset($_GET['id1'])){
                Comentario::obtenerComentarios($database->getDb(),$_GET['idEmpresa'],$_GET['id1']);
            }else{
                Comentario::obtenerComentarios($database->getDb(),$_GET['idEmpresa']);
            }
        break;
        case 'DELETE':
        break;
    }
?>