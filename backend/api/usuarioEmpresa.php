<?php
    session_start();
    if(!isset($_SESSION["token"])){
        echo '{"mensaje": "Acceso no autorizado"}';
        exit;
    }
    if(!isset($_COOKIE["token"])){
        echo '{"mensaje": "Acceso no autorizado"}';
        exit;
    }
    if($_SESSION["token"] != $_COOKIE["token"]){
        echo '{"mensaje": "Acceso no autorizado"}';
        exit;
    }
    header("Content-Type: application/json");
    include_once("../clases/class-usuarioEmpresa.php");
    require_once("../clases/class-database.php");
    $database = new Database();
    $_POST = json_decode(file_get_contents('php://input'),true);
    switch($_SERVER['REQUEST_METHOD']){
        case 'POST'://guardar
            
            $usuario = new UsuarioEmpresa(
                $_POST["nombreEmpresa"],
                $_POST["imgBanner"],
                $_POST["imgPerfil"],
                $_POST["email"],
                $_POST["password"],
                $_POST['descripcion'],
                $_POST["direccion"],
                $_POST["genero"],
                array(
                    'facebook' => $_POST['facebook'],
                    'instagram' => $_POST['instagram'],
                    'twitter' => $_POST['twitter']
                ),
                $_POST["latitud"],
                $_POST["longitud"],
                $_POST["pais"],
                array(
                    'numTarjeta' => $_POST['numTarjeta'],
                    'vencimientoTarjeta' => $_POST['vencimientoTarjeta'],
                    'cvv' => $_POST['cvv']
                ),
                $_POST['plan']
                
            );

            echo $usuario->guardarUsuario($database->getDb());
            
        break;
        case 'GET':
            //echo "Parametro GET " . $_GET['id'];
            if(isset($_GET['idEmpresa'])){
                UsuarioEmpresa::obtenerUsuario($database->getDb(),$_GET['idEmpresa']);
            }else{
                UsuarioEmpresa::obtenerUsuarios($database->getDb());
            }
        break;
        case 'PUT':
            $_PUT = array();
            parse_str(file_get_contents('php://input'),$_PUT);
            $usuario = new UsuarioEmpresa(
                $_PUT["nombreEmpresa"],
                $_PUT["imgBanner"],
                $_PUT["imgPerfil"],
                $_PUT["email"],
                $_PUT["password"],
                $_PUT['descripcion'],
                $_PUT["direccion"],
                $_PUT["genero"],
                array(
                    'facebook' => $_PUT['facebook'],
                    'instagram' => $_PUT['instagram'],
                    'twitter' => $_PUT['twitter']
                ),
                $_PUT["latitud"],
                $_PUT["longitud"],
                $_PUT["pais"],
                array(
                    'numTarjeta' => $_PUT['numTarjeta'],
                    'vencimientoTarjeta' => $_PUT['vencimientoTarjeta'],
                    'cvv' => $_PUT['cvv']
                ),
                $_PUT['plan']

            );
            echo $usuario->actualizarUsuario($database->getDb(),$_GET['idEmpresa']);
        break;
        case 'DELETE':
            UsuarioEmpresa::eliminarUsuario($database->getDb(),$_GET['idEmpresa']);
        break;
    }
?>