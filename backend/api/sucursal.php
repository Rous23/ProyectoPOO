<?php
    header("Content-Type: application/json");
    include_once("../clases/class-sucursal.php");
    require_once("../clases/class-database.php");
    
    $database = new Database();

    switch($_SERVER['REQUEST_METHOD']){
        case 'POST'://guardar
            
            $sucursal = new SucursalEmpresa(
                $_POST["nombreSucursal"],
                $_POST["emailSucursal"],
                $_POST["telefonoSucursal"],
                $_POST["direccionSucursal"],
                $_POST["latitudSucursal"],
                $_POST["longitusSucursal"]
            );

            echo $sucursal->guardarSucursal($database->getDb(),$_GET['idEmpresa']);
            
        break;
        case 'GET':
            //echo "Parametro GET " . $_GET['id'];
            if(isset($_GET['idSucursal'])){
                SucursalEmpresa::obtenerSucursal($database->getDb(),$_GET['idEmpresa'],$_GET['idSucursal']);
            }else{
                SucursalEmpresa::obtenerSucursales($database->getDb(),$_GET['idEmpresa']);
            }
        break;
        case 'PUT':
        break;
        case 'DELETE':
            SucursalEmpresa::eliminarSucursal($database->getDb(),$_GET['idEmpresa'],$_GET['idSucursal']);
        break;
    }
?>