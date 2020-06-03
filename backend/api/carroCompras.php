<?php
    header("Content-Type: application/json");
    include_once("../clases/class-carro.php");
    require_once("../clases/class-database.php");
    
    $database = new Database();
    $_POST = json_decode(file_get_contents('php://input'),true);
    switch($_SERVER['REQUEST_METHOD']){
        case 'POST':
            $producto = new Carro(
                $_POST["nombreProducto"],
                $_POST["imgProducto"],
                $_POST["descripcion"],
                $_POST["precioNormal"],
                $_POST["precioPromocion"],
                $_POST["porcentajeDescuento"],
                $_POST["idEmpresa"],
                $_POST["idProducto"]
                /*array(
                    'nombre' => $_POST['nombre'],
                    'ubicacion' => $_POST['ubicacion'],
                )*/
            );
            echo $producto->guardarEnCarrito($database->getDb(),$_GET['idCliente']);
        break;
        case 'GET':
            //echo "Parametro GET " . $_GET['id'];
            if(isset($_GET['idProductoCarro'])){
                Carro::obtenerProductoCarro($database->getDb(),$_GET['idCliente'],$_GET['idProductoCarro']);
            }else{
                Carro::obtenerProductosCarro($database->getDb(),$_GET['idCliente']);
            }
        break;
        case 'DELETE':
            if(isset($_GET['idProductoCarro'])){
                Carro::eliminarProductoCarro($database->getDb(),$_GET['idCliente'],$_GET['idProductoCarro']);
            }else{
                Carro::vaciarCarro($database->getDb(),$_GET['idCliente']);
            }
        break;
    }
?>