<?php
    class Administrador{
        public static function obtenerAdmin($db){
                $result = $db->getReference('Admi')
                ->getValue();
                echo json_encode($result);
        }

        public static function verificarAdministrador($db,$usuario,$password){
                $result = $db->getReference('Admi')
                        ->getValue();

                if($result["usuario"] == $usuario && $result["password"] == $password){
                        return $result;
                    }
                return null;
        }
    }
?>