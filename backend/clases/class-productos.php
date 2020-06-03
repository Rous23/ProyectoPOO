<?php
    class Producto{
        protected $nombreProducto;
        protected $imgProducto;
        protected $descripcion;
        protected $precioNormal;
        protected $idCategoria;
        /*private $precioPromocion;
        private $porcentajeDescuento;*/

        public function __construct($nombreProducto,$imgProducto,$descripcion,$precioNormal,$idCategoria){
            $this->nombreProducto = $nombreProducto;
            $this->imgProducto = $imgProducto;
            $this->descripcion = $descripcion;
            $this->precioNormal = $precioNormal;
            $this->idCategoria = $idCategoria;
        }

        public function guardarProducto($db,$idEmpresa){
            $producto = $this->getData();
            $nodoReferencia = "empresas/".$idEmpresa."/productos";
            $result = $db->getReference($nodoReferencia)
                ->push($producto);

            if($result->getKey() != null)
                return '{"codigo": 1, "mensaje":"Producto guardado, ingrese nuevos datos para guardar nuevo producto.", "key":"'.$result->getKey().'"}';
            else
                return '{"codigo": 0, "mensaje":"Error al guardar el producto."}';
        }

        public static function obtenerProducto($db,$idEmpresa,$idProducto){
            $nodoReferencia = "empresas/".$idEmpresa."/productos";
            $result = $db->getReference($nodoReferencia)
                ->getChild($idProducto)
                ->getValue();

            echo json_encode($result);
        }

        public static function obtenerProductos($db,$idEmpresa){
            $nodoReferencia = "empresas/".$idEmpresa."/productos";
            $result = $db->getReference($nodoReferencia)
                ->getSnapshot()
                ->getValue();

            echo json_encode($result);
        }

        public function eliminarProducto($db,$idEmpresa,$idProducto){
            $nodoReferencia = "empresas/".$idEmpresa."/productos";
            $db->getReference($nodoReferencia)
            ->getChild($idProducto)
            ->remove();

            echo '{"mensaje":"Se elimino el elemento '.$idProducto.'"}';
        }
        public function getData(){
            $result['nombreProducto'] = $this->nombreProducto;
            $result['imgProducto'] = $this->imgProducto;
            $result['descripcion'] = $this->descripcion;
            $result['precioNormal'] = $this->precioNormal;
            $result['idCategoria'] = $this->idCategoria;
            return $result;
        }
        
        public function getNombreProducto(){
            return $this->nombreProducto;
        }
        public function setNombreProducto($nombreProducto){
            $this->nombreProducto = $nombreProducto;
            return $this;
        }

        public function getImgProducto(){
            return $this->imgProducto;
        }
        public function setImgProducto($imgProducto){
            $this->imgProducto = $imgProducto;
            return $this;
        }

        public function getDescripcion(){
            return $this->descripcion;
        }
        public function setDescripcion($descripcion){
            $this->descripcion = $descripcion;
            return $this;
        }

        public function getPrecioNormal(){
            return $this->precioNormal;
        }
        public function setPrecioNormal($precioNormal){
            $this->precioNormal = $precioNormal;
            return $this;
        }

        public function getPrecioPromocion(){
            return $this->precioPromocion;
        }
        public function setPrecioPromocion($precioPromocion){
            $this->precioPromocion = $precioPromocion;
            return $this;
        }

        public function getPorcentajeDescuento(){
            $this->porcentajeDescuento;
        }
        public function setPorcentajeDescuento($porcentajeDescuento){
            $this->porcentajeDescuento = $porcentajeDescuento;
            return $this;
        }

        public function getIdCategoria(){
            return $this->idCategoria;
        }
        public function setIdCategoria($idCategoria){
            $this->idCategoria = $idCategoria;
            return $this;
        }
    }
?>