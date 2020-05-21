<?php
    header("Content-Type: application/json");
    include_once("../clases/class-usuarioCliente.php");
    require_once("../clases/class-database.php");
    
    $database = new Database();

    switch($_SERVER['REQUEST_METHOD']){
        case 'POST'://guardar
            
            $usuario = new UsuarioCliente(
                $_POST["nombreCompleto"],
                $_POST["imgBanner"],
                $_POST["imgPerfil"],
                $_POST["email"],
                $_POST["password"],
                $_POST["direccion"],
                $_POST["pais"],
                $_POST["genero"],
                array(
                    'numTarjeta' => $_POST['numTarjeta'],
                    'vencimientoTarjeta' => $_POST['vencimientoTarjeta'],
                    'cvv' => $_POST['cvv']
                )/*,
                array(
                    'idEmpresa' => array("")
                ),
                array(
                    'idProductos' => array("")
                )*/

            );

            echo $usuario->guardarUsuario($database->getDb());
            
        break;
        case 'GET':
            //echo "Parametro GET " . $_GET['id'];
            if(isset($_GET['idCliente'])){
                UsuarioCliente::obtenerUsuario($database->getDb(),$_GET['idCliente']);
            }else{
                UsuarioCliente::obtenerUsuarios($database->getDb());
            }
        break;
        case 'PUT':
            $_PUT = array();
            parse_str(file_get_contents('php://input'),$_PUT);
            $usuario = new UsuarioCliente(
                $_PUT["nombreCompleto"],
                $_PUT["imgBanner"],
                $_PUT["imgPerfil"],
                $_PUT["email"],
                $_PUT["password"],
                $_PUT["direccion"],
                $_PUT["pais"],
                $_PUT["genero"],
                array(
                    'numTarjeta' => $_PUT['numTarjeta'],
                    'vencimientoTarjeta' => $_PUT['vencimientoTarjeta'],
                    'cvv' => $_PUT['cvv']
                )
            );
            echo $usuario->actualizarUsuario($database->getDb(),$_GET['idCliente']);
        break;
        case 'DELETE':
            UsuarioCliente::eliminarUsuario($database->getDb(),$_GET['idCliente']);
        break;
    }
?>