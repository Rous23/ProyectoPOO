<?php
    header("Content-Type: application/json");
    include_once("../clases/class-promociones.php");
    require_once("../clases/class-database.php");
    
    $database = new Database();
    $_POST = json_decode(file_get_contents('php://input'),true);
    switch($_SERVER['REQUEST_METHOD']){
        case 'POST'://guardar
            
            $promocion = new Promocion(
                $_POST["nombreProducto"],
                $_POST["imgProducto"],
                $_POST["descripcion"],
                $_POST["precioNormal"],
                $_POST["idCategoria"],
                $_POST["precioPromocion"],
                $_POST["porcentajeDescuento"],
                $_POST["fechaInicio"],
                $_POST["fechaFin"],
                $_POST['sucursales']
            );

            echo $promocion->guardarPromocion($database->getDb(),$_GET['idEmpresa']);
            
        break;
        case 'GET':
            //echo "Parametro GET " . $_GET['id'];
            if(isset($_GET['idPromocion'])){
                Promocion::obtenerPromocion($database->getDb(),$_GET['idEmpresa'],$_GET['idPromocion']);
            }else{
                Promocion::obtenerPromociones($database->getDb(),$_GET['idEmpresa']);
            }
        break;
        case 'PUT':
        break;
        case 'DELETE':
            Promocion::eliminarPromocion($database->getDb(),$_GET['idEmpresa'],$_GET['idPromocion']);
        break;
    }
    /*
$result = $this->db->getReference('categorias')
    ->getChild("-M7dSS3CIJH-XjUnuR0o")
    ->getValue();

    $newPost = $result
    ->set([
        'nombreCategoria' => 'Niños',
        'imgCategoria' =>  'img/3.jpg',
        'icono' => 'fas fa-child',
        'productos'=>['idProducto']
    ]);*/
?>