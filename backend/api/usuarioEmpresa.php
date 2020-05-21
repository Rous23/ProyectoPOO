<?php
    header("Content-Type: application/json");
    include_once("../clases/class-usuarioEmpresa.php");
    require_once("../clases/class-database.php");
    
    $database = new Database();

    switch($_SERVER['REQUEST_METHOD']){
        case 'POST'://guardar
            
            $usuario = new UsuarioEmpresa(
                $_POST["nombreEmpresa"],
                $_POST["imgPerfil"],
                $_POST["imgBanner"],
                $_POST["email"],
                $_POST["password"],
                $_POST["genero"],
                $_POST["pais"],
                $_POST["direccion"],
                $_POST["latitud"],
                $_POST["longitud"],
                array(
                    'numTarjeta' => $_POST['numTarjeta'],
                    'vencimientoTarjeta' => $_POST['vencimientoTarjeta'],
                    'cvv' => $_POST['cvv']
                ),
                array(
                    'facebook' => $_POST['facebook'],
                    'instagram' => $_POST['instagram'],
                    'twitter' => $_POST['twitter']
                ),
                $_POST['descripcion']
            );

            echo $usuario->guardarUsuario($database->getDb());
            
        break;
        case 'GET':
            //echo "Parametro GET " . $_GET['id'];
            if(isset($_GET['id'])){
                UsuarioEmpresa::obtenerUsuario($database->getDb(),$_GET['id']);
            }else{
                UsuarioEmpresa::obtenerUsuarios($database->getDb());
            }
        break;
        case 'PUT':
            $_PUT = array();
            parse_str(file_get_contents('php://input'),$_PUT);
            $usuario = new UsuarioEmpresa(
                $_PUT["nombreEmpresa"],
                $_PUT["imgPerfil"],
                $_PUT["imgBanner"],
                $_PUT["email"],
                $_PUT["password"],
                $_PUT["genero"],
                $_PUT["pais"],
                $_PUT["direccion"],
                $_PUT["latitud"],
                $_PUT["longitud"],
                array(
                    'numTarjeta' => $_PUT['numTarjeta'],
                    'vencimientoTarjeta' => $_PUT['vencimientoTarjeta'],
                    'cvv' => $_PUT['cvv']
                ),
                array(
                    'facebook' => $_PUT['facebook'],
                    'instagram' => $_PUT['instagram'],
                    'twitter' => $_PUT['twitter']
                ),
                $_PUT['descripcion']

            );
            echo $usuario->actualizarUsuario($database->getDb(),$_GET['id']);
        break;
        case 'DELETE':
            UsuarioEmpresa::eliminarUsuario($database->getDb(),$_GET['id']);
        break;
    }
?>