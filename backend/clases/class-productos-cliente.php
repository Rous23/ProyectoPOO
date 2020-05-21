<?php
    class ProductoFavorito{
        private $nombreProducto;
        private $imgProducto;
        private $descripcion;
        private $precioNormal;
        private $precioPromocion;
        private $porcentajeDescuento;
        private $fechaEfectividad;
        private $sucursalesPromocion;

        public function __construct($nombreProducto,$imgProducto,$descripcion,$precioNormal,$precioPromocion,$porcentajeDescuento,$fechaEfectividad,$sucursalesPromocion){
            $this->nombreProducto = $nombreProducto;
            $this->imgProducto = $imgProducto;
            $this->descripcion = $descripcion;
            $this->precioNormal = $precioNormal;
            $this->precioPromocion = $precioPromocion;
            $this->porcentajeDescuento = $porcentajeDescuento;
            $this->fechaEfectividad = $fechaEfectividad;
            $this->sucursalesPromocion = $sucursalesPromocion;
        }

        function guardarProductoFav($db,$idCliente){
            $producto = $this->getData();
            $nodoReferencia = "clientes/".$idCliente."/productosFavs";
            $result = $db->getReference($nodoReferencia)
                ->push($producto);
            
            if($result->getKey() != null)
                return '{"mensaje":"Producto Guardada", "key":"'.$result->getKey().'"}';
            else
                return '{"mensaje":"Error al guardar."}';
        }

        public static function obtenerProductoFav($db,$idProducto){
            $result = $db->getReference('categorias')  
                ->getValue();

            foreach ($result as $key => $value) {
                if(isset($result[$key]['productos'])){
                    $objeto = $result[$key]["productos"];
                    foreach ($objeto as $key => $value) {
                        if($key == $idProducto){//echo $key;
                            return json_encode($objeto[$key]);
                        }
                    }
                }
            }
        }

        public function getData(){
            $result['nombreProducto'] = $this->nombreProducto;
            $result['imgProducto'] = $this->imgProducto;
            $result['descripcion'] = $this->descripcion;
            $result['precioNormal'] = $this->precioNormal;
            $result['precioPromocion'] = $this->precioPromocion;
            $result['porcentajeDescuento'] = $this->porcentajeDescuento;
            $result['fechaEfectividad'] = $this->fechaEfectividad;
            $result['sucursalesPromocion'] = $this->sucursalesPromocion;
            return $result;
        }
    }
?>