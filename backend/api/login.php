<?php
    header("Content-Type: application/json");
    include_once("../clases/class-usuarioCliente.php");
    include_once("../clases/class-usuarioEmpresa.php");
    require_once("../clases/class-database.php");
    $database = new Database();
    $_POST = json_decode(file_get_contents('php://input'),true);
    
    switch($_SERVER['REQUEST_METHOD']){
        case 'POST'://guardar
            $usuario = UsuarioCliente::verificarUsuario($database->getDb(),$_POST["email"],$_POST["password"]);
            if($usuario){
                $arreglo = array(
                    "mensaje" => "usuario Autenticado",
                    "codigoResultado" => "cliente",
                    "token" => sha1(uniqid(rand(),true)),
                    "nombreUsuario" => $usuario["nombreCompleto"]
                );
                setcookie("token",$arreglo["token"] , time()+(60*60*24*31),"/");
                setcookie("nombreUsuario",$arreglo["nombreUsuario"] , time()+(60*60*24*31),"/");
                setcookie("nombreEmpresa","", time()-1,"/");
                echo json_encode($arreglo);
            }else{
                $usuario2 = UsuarioEmpresa::verificarUsuario($database->getDb(),$_POST["email"],$_POST["password"]);
                if($usuario2){
                    $arreglo2 = array(
                        "mensaje" => "usuario Autenticado",
                        "codigoResultado" => "empresa",
                        "token" => sha1(uniqid(rand(),true)),
                        "nombreEmpresa" => $usuario2["nombreEmpresa"]
                    );
                    setcookie("token",$arreglo2["token"] , time()+(60*60*24*31),"/");
                    setcookie("nombreEmpresa",$arreglo2["nombreEmpresa"] , time()+(60*60*24*31),"/");
                    echo json_encode($arreglo2);
                }else{ 
                    setcookie("token","" , time()-1,"/");
                    setcookie("nombreUsuario","" , time()-1,"/");
                    setcookie("nombreEmpresa","", time()-1,"/");
                    echo '{"mensaje":"Usuario/Password incorrectos", "codigoResultado":"0"}';
                }
            }
        break;
    }
?>