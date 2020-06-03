<?php
    header("Content-Type: application/json");
    include_once("../clases/class-productos-cliente.php");
    require_once("../clases/class-database.php");
    
    $database = new Database();
    $_POST = json_decode(file_get_contents('php://input'),true);
    switch($_SERVER['REQUEST_METHOD']){
        case 'POST':
            $productoFav = new ProductoFavorito(
                $_POST["nombreProducto"],
                $_POST["imgProducto"],
                $_POST["descripcion"],
                $_POST["precioNormal"],
                $_POST["precioPromocion"],
                $_POST["porcentajeDescuento"],
                $_POST["idEmpresa"],
                $_POST["idProducto"],
                /*$_POST['idPCat'],
                $_POST['idCategoria']
                array(
                    'nombre' => $_POST['nombre'],
                    'ubicacion' => $_POST['ubicacion'],
                )*/
            );
            echo $productoFav->guardarProductoFav($database->getDb(),$_GET['idCliente']);
        break;
        case 'GET':
            //echo "Parametro GET " . $_GET['id'];
            if(isset($_GET['idProducto'])){
                ProductoFavorito::obtenerProductoFav($database->getDb(),$_GET['idProducto'],$_GET['idCliente']);
            }else{
                ProductoFavorito::obtenerProductosFav($database->getDb(),$_GET['idCliente']);
            }
        break;
        case 'DELETE':
            //UsuarioCliente::eliminarUsuario($database->getDb(),$_GET['id']);
        break;
    }
?>