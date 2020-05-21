<?php
    header("Content-Type: application/json");
    include_once("../clases/class-productos-cliente.php");
    require_once("../clases/class-database.php");
    
    $database = new Database();

    switch($_SERVER['REQUEST_METHOD']){
        case 'POST':
            $productoFav = new ProductoFavorito(
                $_POST["nombreProducto"],
                $_POST["imgProducto"],
                $_POST["descripcion"],
                $_POST["precioNormal"],
                $_POST["precioPromocion"],
                $_POST["porcentajeDescuento"],
                $_POST["fechaEfectividad"],
                array(
                    'nombre' => $_POST['nombre'],
                    'ubicacion' => $_POST['ubicacion'],
                )
            );
            echo $productoFav->guardarProductoFav($database->getDb(),$_GET['idCliente']);
        break;
        case 'GET':
            //echo "Parametro GET " . $_GET['id'];
            if(isset($_GET['idProducto'])){
                ProductoFavorito::obtenerProductoFav($database->getDb(),$_GET['idProducto']);
            }else{
                ProductoFavorito::obtenerProductosFav($database->getDb());
            }
        break;
        case 'DELETE':
            //UsuarioCliente::eliminarUsuario($database->getDb(),$_GET['id']);
        break;
    }
?>