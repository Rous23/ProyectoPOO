<?php
    class ProductoFavorito{
        public $nombreProducto;
        public $imgProducto;
        public $descripcion;
        public $precioNormal;
        public $precioPromocion;
        public $porcentajeDescuento;
        public $idEmpresa;
        public $idProducto;
        //public $idPCat;
        //public $idCategoria;
        //private $sucursalesPromocion;

        public function __construct($nombreProducto,$imgProducto,$descripcion,$precioNormal,$precioPromocion,$porcentajeDescuento,$idEmpresa,$idProducto/*,$idPCat,$idCategoria,$sucursalesPromocion*/){
            $this->nombreProducto = $nombreProducto;
            $this->imgProducto = $imgProducto;
            $this->descripcion = $descripcion;
            $this->precioNormal = $precioNormal;
            $this->precioPromocion = $precioPromocion;
            $this->porcentajeDescuento = $porcentajeDescuento;
            $this->idEmpresa = $idEmpresa;
            $this->idProducto = $idProducto;
            //$this->idPCat = $idPCat;
            //$this->idCategoria = $idCategoria;
            //$this->sucursalesPromocion = $sucursalesPromocion;
        }

        function guardarProductoFav($db,$idCliente){
            $producto = $this->getData();
            $nodoReferencia = "clientes/".$idCliente."/productosFavs";
            $result = $db->getReference($nodoReferencia)
                ->push($producto);
            
            if($result->getKey() != null)
                return '{"mensaje":"Producto Guardado", "key":"'.$result->getKey().'"}';
            else
                return '{"mensaje":"Error al guardar."}';
        }

        public static function obtenerProductoFav($db,$idProducto,$idCliente){
            $nodoReferencia = "clientes/".$idCliente."/productosFavs";
            $result = $db->getReference($nodoReferencia)  
                ->getChild($idProducto)
                ->getValue();
            echo json_encode($result);
            /*foreach ($result as $key => $value){
                if(isset($result[$key]['productos'])){
                    $objeto = $result[$key]["productos"];
                    foreach ($objeto as $key => $value) {
                        if($key == $idProducto){//echo $key;
                            return json_encode($objeto[$key]);
                        }
                    }
                }
            }*/
        }

        public static function obtenerProductosFav($db,$idCliente){
            $nodoReferencia = "clientes/".$idCliente."/productosFavs";
            $result = $db->getReference($nodoReferencia)
                ->getValue();
            echo json_encode($result);
            
        }

        public function getData(){
            $result['nombreProducto'] = $this->nombreProducto;
            $result['imgProducto'] = $this->imgProducto;
            $result['descripcion'] = $this->descripcion;
            $result['precioNormal'] = $this->precioNormal;
            $result['precioPromocion'] = $this->precioPromocion;
            $result['porcentajeDescuento'] = $this->porcentajeDescuento;
            $result['idEmpresa'] = $this->idEmpresa;
            $result['idProducto'] = $this->idProducto;
            //$result['$idPCat']= $this->idPCat;
            //$result['$idCategoria']= $this->idCategoria;
            //$result['sucursalesPromocion'] = $this->sucursalesPromocion;
            return $result;
        }
    }
?>