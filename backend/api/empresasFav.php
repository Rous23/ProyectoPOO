<?php
    header("Content-Type: application/json");
    include_once("../clases/class-empresas-fav.php");
    require_once("../clases/class-database.php");
    
    $database = new Database();
    $_POST = json_decode(file_get_contents('php://input'),true);
    switch($_SERVER['REQUEST_METHOD']){
        case 'POST':
            $empresaFav = new EmpresaFav(
                $_POST["nombreEmpresa"],
                $_POST["imgPerfil"],
                $_POST["descripcion"],
                
            );
            echo $empresaFav->guardarEmpresaFav($database->getDb(),$_GET['idCliente'],$_GET["idEmpresa"]);
        break;
        case 'DELETE':
            //UsuarioCliente::eliminarUsuario($database->getDb(),$_GET['id']);
        break;
    }
?>