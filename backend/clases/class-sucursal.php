<?php
    class SucursalEmpresa{
        private $nombreSucursal;
        private $emailSucursal;
        private $telefonoSucursal;
        private $direccionSucursal;
        private $latitudSucursal;
        private $longitudSucursal;

        public function __construct($nombreSucursal,$emailSucursal,$telefonoSucursal,$direccionSucursal,$latitudSucursal,$longitudSucursal){
            $this->nombreSucursal = $nombreSucursal;
            $this->emailSucursal = $emailSucursal;
            $this->telefonoSucursal = $telefonoSucursal;
            $this->direccionSucursal = $direccionSucursal;
            $this->latitudSucursal = $latitudSucursal;
            $this->longitudSucursal = $longitudSucursal;
        }

        public function guardarSucursal($db,$idEmpresa){
            $sucursal = $this->getData();
            $nodoReferencia = "empresas/".$idEmpresa."/sucursales";
            $result = $db->getReference($nodoReferencia)
                ->push($sucursal);
                
            if($result->getKey() != null)
                return '{"codigo": 1, "mensaje":"Registro almacenado", "key":"'.$result->getKey().'"}';
            else
                return '{"codigo": 0 ,"mensaje":"Error al guardar el registro"}';
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
            $result['longitudSucursal'] = $this->longitudSucursal;
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

        public function getLongitudSucursal()
        {
                return $this->longitudSucursal;
        }
        public function setLongitudSucursal($longitudSucursal)
        {
                $this->longitudSucursal = $longitudSucursal;

                return $this;
        }
    }
?>