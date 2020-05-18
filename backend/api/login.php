<?php
    header("Content-Type: application/json");
    include_once("../clases/class-usuarioCliente.php");
    require_once("../clases/class-database.php");
    $database = new Database();
    $_POST = json_decode(file_get_contents('php://input'),true);
    
    switch($_SERVER['REQUEST_METHOD']){
        case 'POST'://guardar
            $usuario = UsuarioCliente::verificarUsuario($database->getDb(),$_POST["email"],$_POST["password"]);

            if($usuario){
                $arreglo = array(
                    "mensaje" => "usuario Autenticado",
                    "codigoResultado" => "1",
                    "token" => sha1(uniqid(rand(),true)),
                    "nombreUsuario" => $usuario["nombreCompleto"]
                );
                setcookie("token",$arreglo["token"] , time()+(60*60*24*31),"/");
                setcookie("nombreUsuario",$arreglo["nombreUsuario"] , time()+(60*60*24*31),"/");
                echo json_encode($arreglo);
            }else{
                setcookie("token","" , time()-1,"/");
                setcookie("nombreUsuario","" , time()-1,"/");
                echo '{"mensaje":"Usuario/Password incorrectos", "codigoResultado":"0"}';
            }
        break;
    }
?>