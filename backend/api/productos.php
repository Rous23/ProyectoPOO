<?php
    header("Content-Type: application/json");
    include_once("../clases/class-productos.php");
    require_once("../clases/class-database.php");
    
    $database = new Database();
    $_POST = json_decode(file_get_contents('php://input'),true);

    switch($_SERVER['REQUEST_METHOD']){
        case 'POST'://guardar
            
            $producto = new Producto(
                $_POST["nombreProducto"],
                $_POST["imgProducto"],
                $_POST["descripcion"],
                $_POST["precioNormal"],
                $_POST["idCategoria"]
            );

            echo $producto->guardarProducto($database->getDb(),$_GET['idEmpresa']);
            
        break;
        case 'GET':
            //echo "Parametro GET " . $_GET['id'];
            if(isset($_GET['idProducto'])){
                Producto::obtenerProducto($database->getDb(),$_GET['idEmpresa'],$_GET['idProducto']);
            }else{
                Producto::obtenerProductos($database->getDb(),$_GET['idEmpresa']);
            }
        break;
        case 'PUT':
        break;
        case 'DELETE':
            Producto::eliminarProducto($database->getDb(),$_GET['idEmpresa'],$_GET['idProducto']);
        break;
    }
?>