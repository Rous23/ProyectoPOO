<?php
    include_once("../clases/class-productos-cliente.php");
    class Carro extends ProductoFavorito{

        public function __construct($nombreProducto,$imgProducto,$descripcion,$precioNormal,$precioPromocion,$porcentajeDescuento,$idEmpresa,$idProducto){
            parent::__construct($nombreProducto,$imgProducto,$descripcion,$precioNormal,$precioPromocion,$porcentajeDescuento,$idEmpresa,$idProducto);
        }

        public function guardarEnCarrito($db,$idCliente){
            $producto = $this->getData();
            $nodoReferencia = "clientes/".$idCliente."/carroCompras";
            $result = $db->getReference($nodoReferencia)
                ->push($producto);
            
            if($result->getKey() != null)
                return '{"mensaje":"Producto guardado en el carrito", "key":"'.$result->getKey().'"}';
            else
                return '{"mensaje":"Error al guardar."}';
        }

        public static function obtenerProductoCarro($db,$idCliente,$idProductoCarro){
            $nodoReferencia = "clientes/".$idCliente."/carroCompras";
            $result = $db->getReference($nodoReferencia)
                ->getChild($idProductoCarro)
                ->getValue();

            echo json_encode($result);
        }

        public static function obtenerProductosCarro($db,$idCliente){
            $nodoReferencia = "clientes/".$idCliente."/carroCompras";
            $result = $db->getReference($nodoReferencia)
                ->getSnapshot()
                ->getValue();

            echo json_encode($result);
        }

        public static function eliminarProductoCarro($db,$idCliente,$idProductoCarro){
            $nodoReferencia = "clientes/".$idCliente."/carroCompras";
            $db->getReference($nodoReferencia)
            ->getChild($idProductoCarro)
            ->remove();
            echo '{"mensaje":"Se elimino el elemento '.$idProductoCarro.'"}';
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
            //$result['sucursalesPromocion'] = $this->sucursalesPromocion;
            return $result;
        }

        public static function vaciarCarro($db,$idCliente){
            $nodoReferencia = "clientes/".$idCliente;
            $db->getReference($nodoReferencia)
            ->getChild("carroCompras")
            ->remove();
            echo '{"mensaje":"correcto"}';
        }
    }
?>