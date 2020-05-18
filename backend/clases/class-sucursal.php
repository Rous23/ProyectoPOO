<?php
    class SucursalEmpresa{
        private $nombreSucursal;
        private $emailSucursal;
        private $telefonoSucursal;
        private $direccionSucursal;
        private $latitudSucursal;
        private $longitusSucursal;

        public function __construct($nombreSucursal,$emailSucursal,$telefonoSucursal,$direccionSucursal,$latitudSucursal,$longitusSucursal){
            $this->nombreSucursal = $nombreSucursal;
            $this->emailSucursal = $emailSucursal;
            $this->telefonoSucursal = $telefonoSucursal;
            $this->direccionSucursal = $direccionSucursal;
            $this->latitudSucursal = $latitudSucursal;
            $this->longitusSucursal = $longitusSucursal;
        }

        public function guardarSucursal($db,$idEmpresa){
            $sucursal = $this->getData();
            $nodoReferencia = "empresas/".$idEmpresa."/sucursales";
            $result = $db->getReference($nodoReferencia)
                ->push($sucursal);
                
            if($result->getKey() != null)
                return '{"mensaje":"Registro almacenado", "key":"'.$result->getKey().'"}';
            else
                return '{"mensaje":"Error al guardar el registro"}';
        }

        public static function obtenerSucursal($db,$idEmpresa,$idSucursal){
            $nodoReferencia = "empresas/".$idEmpresa."/sucursales";
            $result = $db->getReference($nodoReferencia)
                ->getChild($idSucursal)
                ->getValue();

            echo json_encode($result);
        }

        public static function obtenerSucursales($db,$idEmpresa){
            $nodoReferencia = "empresas/".$idEmpresa."/sucursales";
            $result = $db->getReference($nodoReferencia)
                ->getSnapshot()
                ->getValue();

            echo json_encode($result);
        }

        public static function eliminarSucursal($db,$idEmpresa,$idSucursal){
            $nodoReferencia = "empresas/".$idEmpresa."/sucursales";
            $db->getReference($nodoReferencia)
            ->getChild($idSucursal)
            ->remove();
            echo '{"mensaje":"Se elimino el elemento '.$idSucursal.'"}';
        }

        public function getData(){
            $result['nombreSucursal'] = $this->nombreSucursal;
            $result['emailSucursal'] = $this->emailSucursal;
            $result['telefonoSucursal'] = $this->telefonoSucursal;
            $result['direccionSucursal'] = $this->direccionSucursal;
            $result['latitudSucursal'] = $this->latitudSucursal;
            $result['longitusSucursal'] = $this->longitusSucursal;
            
            return $result;
        }
        public function getNombreSucursal()
        {
                return $this->nombreSucursal;
        }
        public function setNombreSucursal($nombreSucursal)
        {
                $this->nombreSucursal = $nombreSucursal;

                return $this;
        }

        public function getEmailSucursal()
        {
                return $this->emailSucursal;
        }
        public function setEmailSucursal($emailSucursal)
        {
                $this->emailSucursal = $emailSucursal;

                return $this;
        }

        public function getTelefonoSucursal()
        {
                return $this->telefonoSucursal;
        }
        public function setTelefonoSucursal($telefonoSucursal)
        {
                $this->telefonoSucursal = $telefonoSucursal;

                return $this;
        }

        public function getDireccionSucursal()
        {
                return $this->direccionSucursal;
        }
        public function setDireccionSucursal($direccionSucursal)
        {
                $this->direccionSucursal = $direccionSucursal;

                return $this;
        }

        public function getLatitudSucursal()
        {
                return $this->latitudSucursal;
        }
        public function setLatitudSucursal($latitudSucursal)
        {
                $this->latitudSucursal = $latitudSucursal;

                return $this;
        }

        public function getLongitusSucursal()
        {
                return $this->longitusSucursal;
        }
        public function setLongitusSucursal($longitusSucursal)
        {
                $this->longitusSucursal = $longitusSucursal;

                return $this;
        }
    }
?>