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
    }
?>