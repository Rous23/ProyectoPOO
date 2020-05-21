<?php
    class EmpresaFav{
        private $nombreEmpresa;
        private $imgPerfil;
        private $descripcion;

        public function __construct($nombreEmpresa,$imgPerfil,$descripcion){
            $this->nombreEmpresa = $nombreEmpresa;
            $this->imgPerfil = $imgPerfil;
            $this->descripcion = $descripcion;
        }

        public function guardarEmpresaFav($db,$idCliente, $idEmpresa){
            $empresa = $this->getData($idEmpresa);
            $nodoReferencia = "clientes/".$idCliente."/empresasFavs";
            $result = $db->getReference($nodoReferencia)
                ->push($empresa);
            
            if($result->getKey() != null)
                return '{"mensaje":"Empresa Guardada", "key":"'.$result->getKey().'"}';
            else
                return '{"mensaje":"Error al guardar."}';

        }

        public function getData($idEmpresa){
            $result['nombreEmpresa'] = $this->nombreEmpresa;
            $result['imgPerfil'] = $this->imgPerfil;
            $result['descripcion'] = $this->descripcion;
            $result['idEmpresa'] = $idEmpresa;
            return $result;
        }
    }
?>