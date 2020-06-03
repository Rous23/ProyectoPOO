<?php
    class Comentario{
        private $nombreCliente;
        private $contenidoComentario;
        private $idEmpresa;
        private $idCliente;
        private $idCategoria;
        private $idProductoEnEmpresa;

        public function __construct($nombreCliente,$contenidoComentario,$idEmpresa,$idCliente,$idCategoria,$idProductoEnEmpresa){
            $this->nombreCliente = $nombreCliente;
            $this->contenidoComentario = $contenidoComentario;
            $this->idEmpresa = $idEmpresa;
            $this->idCliente = $idCliente;
            $this->idCategoria = $idCategoria;
            $this->idProductoEnEmpresa = $idProductoEnEmpresa;
        }

        public function guardarComentario($db,$id1){
            $comentario = $this->getData();
            $nodoReferencia = "categorias/".$this->idCategoria."/productos"."/".$id1."/comentarios";
            $result = $db->getReference($nodoReferencia)
                ->push($comentario); //echo json_encode($result->getKey());

            $comentarioEmpresa['nombreCliente'] = $this->nombreCliente;
            $comentarioEmpresa['contenidoComentario'] = $this->contenidoComentario;
            $comentarioEmpresa['idEmpresa'] = $this->idEmpresa;
            $comentarioEmpresa['idCliente'] = $this->idCliente;
            $comentarioEmpresa['idCategoria'] = $this->idCategoria;

            $referencia = "empresas/".$this->idEmpresa."/promociones"."/".$this->idProductoEnEmpresa."/comentarios";
            $prom = $db->getReference($referencia)
                ->push($comentarioEmpresa);
            
            if($result->getKey() != null)
                return '{"codigo": 1, "mensaje":"Comentario Guardado", "key":"'.$result->getKey().'"}';
            else
                return '{"codigo": 0, "mensaje":"Error al guardar comentario."}';

        }

        public static function obtenerComentarios($db,$idEmpresa){
            $nodoReferencia = "empresas/".$idEmpresa."/promociones";
            $result = $db->getReference($nodoReferencia)
                ->getSnapshot()
                ->getValue();

            echo json_encode($result);
        }
        
        /*public static function obtenerComentario($db,$idEmpresa,$id1){
            $nodoReferencia = "empresas/".$idEmpresa."/promociones"."/";
            $result = $db->getReference($nodoReferencia)
                ->getSnapshot()
                ->getValue();

            echo json_encode($result);
        }

        public function eliminarPromocion($db,$idEmpresa,$idPromocion){
            $referencia = "empresas/".$idEmpresa."/promociones";
            $result = $db->getReference($referencia)
            ->getChild($idPromocion)
            ->getValue();
            $ruta = $result["idCategoria"]; //echo $ruta;
            
            $referenciaCategoria = "categorias/".$ruta."/productos";
            $resultado = $db->getReference($referenciaCategoria)
                ->getValue(); //echo json_encode($resultado);

            foreach ($resultado as $key => $value) {
                //echo $resultado[$key];
                if($resultado[$key]['idProducto'] == $idPromocion){
                    $db->getReference($referenciaCategoria)
                    ->getChild($key)
                    ->remove();
                break;
                }
            }
            
            $nodoReferencia = "empresas/".$idEmpresa."/promociones";
            $db->getReference($nodoReferencia)
            ->getChild($idPromocion)
            ->remove();
            
            echo '{"mensaje":"Se elimino el elemento '.$idPromocion.'","mensaje2":"Se elimino la promocion de idcategoria '.$result["idCategoria"].' idproducto '.$key.'"}';
        }
*/
        public function getData(){
            $result['nombreCliente'] = $this->nombreCliente;
            $result['contenidoComentario'] = $this->contenidoComentario;
            $result['idEmpresa'] = $this->idEmpresa;
            $result['idCliente'] = $this->idCliente;
            $result['idCategoria'] = $this->idCategoria;
            return $result;
        }

        /**
         * Get the value of nombreCliente
         */ 
        public function getNombreCliente()
        {
                return $this->nombreCliente;
        }

        /**
         * Set the value of nombreCliente
         *
         * @return  self
         */ 
        public function setNombreCliente($nombreCliente)
        {
                $this->nombreCliente = $nombreCliente;

                return $this;
        }

        /**
         * Get the value of imgPerfil
         */ 
        public function getImgPerfil()
        {
                return $this->imgPerfil;
        }

        /**
         * Set the value of imgPerfil
         *
         * @return  self
         */ 
        public function setImgPerfil($imgPerfil)
        {
                $this->imgPerfil = $imgPerfil;

                return $this;
        }

        /**
         * Get the value of contenidoComentario
         */ 
        public function getContenidoComentario()
        {
                return $this->contenidoComentario;
        }

        /**
         * Set the value of contenidoComentario
         *
         * @return  self
         */ 
        public function setContenidoComentario($contenidoComentario)
        {
                $this->contenidoComentario = $contenidoComentario;

                return $this;
        }

        /**
         * Get the value of idEmpresa
         */ 
        public function getIdEmpresa()
        {
                return $this->idEmpresa;
        }

        /**
         * Set the value of idEmpresa
         *
         * @return  self
         */ 
        public function setIdEmpresa($idEmpresa)
        {
                $this->idEmpresa = $idEmpresa;

                return $this;
        }
    }
?>