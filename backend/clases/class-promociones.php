<?php
include_once("../clases/class-productos.php");
    class Promocion extends Producto{
        protected $precioPromocion;
        protected $porcentajeDescuento;
        protected $fechaEfectividad;
        protected $sucursalesPromocion;
        
        public function __construct($nombreProducto,$imgProducto,$descripcion,$precioNormal,$idCategoria,$precioPromocion,$porcentajeDescuento,$fechaEfectividad,$sucursalesPromocion){
            parent::__construct($nombreProducto,$imgProducto,$descripcion,$precioNormal,$idCategoria);
            $this->precioPromocion = $precioPromocion;
            $this->porcentajeDescuento = $porcentajeDescuento;
            $this->fechaEfectividad = $fechaEfectividad;
            $this->sucursalesPromocion = $sucursalesPromocion;
        }

        public function guardarPromocion($db,$idEmpresa){
            $promocionProducto = $this->getData();
            $nodoReferencia = "empresas/".$idEmpresa."/promociones";
            $result = $db->getReference($nodoReferencia)
                ->push($promocionProducto); //echo json_encode($result->getKey());

            $promo['nombreProducto'] = $this->nombreProducto;
            $promo['imgProducto'] = $this->imgProducto;
            $promo['descripcion'] = $this->descripcion;
            $promo['precioNormal'] = $this->precioNormal;
            $promo['idEmpresa'] = $idEmpresa;
            $promo['idProducto'] = $result->getKey();
            $promo['idCategoria'] = $this->idCategoria;//cuidado
            $promo['precioPromocion'] = $this->precioPromocion;
            $promo['porcentajeDescuento'] = $this->porcentajeDescuento;
            $promo['fechaEfectividad'] = $this->fechaEfectividad;
            $promo['sucursalesPromocion'] = $this->sucursalesPromocion;

            $referencia = "categorias/".$this->getIdCategoria()."/productos";
            $prom = $db->getReference($referencia)
                ->push($promo);
            
            if($result->getKey() != null)
                return '{"mensaje":"Promocion Guardada", "key":"'.$result->getKey().'"}';
            else
                return '{"mensaje":"Error al guardar."}';

        }

        public static function obtenerPromocion($db,$idEmpresa,$idPromocion){
            $nodoReferencia = "empresas/".$idEmpresa."/promociones";
            $result = $db->getReference($nodoReferencia)
                ->getChild($idPromocion)
                ->getValue();

            echo json_encode($result);
        }

        public static function obtenerPromociones($db,$idEmpresa){
            $nodoReferencia = "empresas/".$idEmpresa."/promociones";
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

        public function getData(){
            $result['nombreProducto'] = $this->nombreProducto;
            $result['imgProducto'] = $this->imgProducto;
            $result['descripcion'] = $this->descripcion;
            $result['precioNormal'] = $this->precioNormal;
            $result['idCategoria'] = $this->idCategoria;
            $result['precioPromocion'] = $this->precioPromocion;
            $result['porcentajeDescuento'] = $this->porcentajeDescuento;
            $result['fechaEfectividad'] = $this->fechaEfectividad;
            $result['sucursalesPromocion'] = $this->sucursalesPromocion;
            return $result;
        }

        public function getPrecioPromocion(){
            return $this->precioPromocion;
        }
        public function setPrecioPromocion($precioPromocion){
            $this->precioPromocion = $precioPromocion;
            return $this;
        }

        public function getPorcentajeDescuento(){
            return $this->porcentajeDescuento;
        }
        public function setPorcentajeDescuento($porcentajeDescuento){
            $this->porcentajeDescuento = $porcentajeDescuento;
            return $this;
        }
 
        public function getFechaEfectividad(){
            return $this->fechaEfectividad;
        }
        public function setFechaEfectividad($fechaEfectividad){
            $this->fechaEfectividad = $fechaEfectividad;
            return $this;
        }

        public function getSucursalesPromocion(){
            return $this->sucursalesPromocion;
        }
        public function setSucursalesPromocion($sucursalesPromocion){
            $this->sucursalesPromocion = $sucursalesPromocion;
            return $this;
        }
    }
?>