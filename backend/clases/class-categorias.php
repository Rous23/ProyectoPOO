<?php
    class Categoria{

        public static function obtenerCategoria($db,$idCategoria){
            $result = $db->getReference('categorias')
                ->getChild($idCategoria)
                ->getValue();

            echo json_encode($result);
        }

        public static function obtenerCategorias($db){
            $result = $db->getReference('categorias')
                ->getSnapshot()
                ->getValue();

            echo json_encode($result);
        }

        public static function obtenerProductoCategoria($db,$idProducto){
            $result = $db->getReference('categorias')
                ->getSnapshot()
                ->getValue();

            $resultadoP = array();
            foreach ($result as $key => $value){
                if(isset($result[$key]['productos'])){
                    $objeto = $result[$key]['productos'];
                    foreach ($objeto as $key2 => $value2) {
                        if($key2 == $idProducto){//echo $key;
                            echo json_encode($objeto[$key2]);
                        }
                    }
                }
            }
            //echo json_encode($result);
        }
    }
?>