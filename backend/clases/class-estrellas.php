<?php
    class Estrella{
        public $cantidad;

        public function __construct($cantidad){
            $this->cantidad = $cantidad;
        }

        public function guardarEstrellas($db,$idProd,$idCat,$idEmpresa){
            $nodoReferencia = "categorias/".$idCat."/productos"."/".$idProd."/cantidadEstrellas";
            $result = $db->getReference($nodoReferencia)
                ->push($this->cantidad);

            $nodoProd = "categorias/".$idCat."/productos"."/".$idProd;
            $resultProd = $db->getReference($nodoProd)
                ->getValue();
            $idPEmpresa = $resultProd["idProducto"];

            $nodoReferenciaE = "empresas/".$idEmpresa."/promociones"."/".$idPEmpresa."/cantidadEstrellas";
            $resultE = $db->getReference($nodoReferenciaE)
                ->push($this->cantidad);

            echo '{"codigo":"correcto"}';
        }

        /**
         * Get the value of cantidad
         */ 
        public function getCantidad()
        {
                return $this->cantidad;
        }

        /**
         * Set the value of cantidad
         *
         * @return  self
         */ 
        public function setCantidad($cantidad)
        {
                $this->cantidad = $cantidad;

                return $this;
        }
    }
?>