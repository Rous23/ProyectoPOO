<?php
        class UsuarioEmpresa{
                private $nombreEmpresa;
                private $imgPerfil;
                private $imgBanner;
                private $email;
                private $contraseña;
                private $genero;
                private $pais;
                private $direccion;
                private $latitud;
                private $longitud;
                private $tarjeta;
                private $redes;
                private $descripcion;


        public function __construct($nombreEmpresa,$imgPerfil,$imgBanner,$email,$contraseña,$genero,$pais,$direccion,$latitud,$longitud,$tarjeta,$redes,$descripcion){
                $this->nombreEmpresa = $nombreEmpresa;
                $this->imgPerfil = $imgPerfil;
                $this->imgBanner = $imgBanner;
                $this->email = $email;
                $this->contraseña = $contraseña;
                $this->genero = $genero;
                $this->pais = $pais;
                $this->direccion = $direccion;
                $this->latitud = $latitud;
                $this->longitud = $longitud;
                $this->tarjeta = $tarjeta;
                $this->redes = $redes;
                $this->descripcion = $descripcion;
        }

        public function guardarUsuario($db){
                $usuario = $this->getData();

                $result = $db->getReference('empresas')
                ->push($usuario);
                
                if($result->getKey() != null)
                return '{"mensaje":"Registro almacenado", "key":"'.$result->getKey().'"}';
                else
                return '{"mensaje":"Error al guardar el registro"}';
        }

        public static function obtenerUsuario($db,$id){
                $result = $db->getReference('empresas')
                ->getChild($id)
                ->getValue();

                echo json_encode($result);
        }

        public static function obtenerUsuarios($db){
                $result = $db->getReference('empresas')
                ->getSnapshot()
                ->getValue();

                echo json_encode($result);
        }

        public function actualizarUsuario($db,$id){
                $result = $db->getReference('empresas')
                ->getChild($id)
                ->set($this->getDataActualizar($db,$id));

                if($result->getKey() != null)
                        return '{"mensaje":"Registro actualizado", "key":"'.$result->getKey().'"}';
                else
                        return '{"mensaje":"Error al actualizar el registro"}';
        }

        public static function eliminarUsuario(){}

        public function getDataActualizar($db,$id){
                $resultadoDB = $db->getReference('empresas')
                ->getChild($id)
                ->getValue();

                $result['nombreEmpresa'] = $this->nombreEmpresa;
                $result['imgBanner'] = $this->imgPerfil;
                $result['imgPerfil'] = $this->imgBanner;
                $result['email'] = $this->email;
                $result['contraseña'] = $this->contraseña;
                $result['genero'] = $this->genero;
                $result['direccion'] = $this->direccion;
                $result['pais'] = $this->pais;
                $result['latitud'] = $this->latitud;
                $result['longitud'] = $this->longitud;
                $result['tarjeta'] = $this->tarjeta;
                $result['redes'] = $this->redes;
                $result['descripcion'] = $this->descripcion;
                $result['sucursales'] = $resultadoDB["sucursales"];
                return $result;
        }

        public function getData(){
                $result['nombreEmpresa'] = $this->nombreEmpresa;
                $result['imgBanner'] = $this->imgPerfil;
                $result['imgPerfil'] = $this->imgBanner;
                $result['email'] = $this->email;
                $result['contraseña'] = $this->contraseña;
                $result['genero'] = $this->genero;
                $result['direccion'] = $this->direccion;
                $result['pais'] = $this->pais;
                $result['latitud'] = $this->latitud;
                $result['longitud'] = $this->longitud;
                $result['tarjeta'] = $this->tarjeta;
                $result['redes'] = $this->redes;
                $result['descripcion'] = $this->descripcion;
                
                return $result;
        }

        public function getNombreEmpresa()
        {
                return $this->nombreEmpresa;
        }

        public function setNombreEmpresa($nombreEmpresa)
        {
                $this->nombreEmpresa = $nombreEmpresa;

                return $this;
        }

        public function getImgPerfil()
        {
                return $this->imgPerfil;
        }

        public function setImgPerfil($imgPerfil)
        {
                $this->imgPerfil = $imgPerfil;

                return $this;
        }

        public function getImgBanner()
        {
                return $this->imgBanner;
        }

        public function setImgBanner($imgBanner)
        {
                $this->imgBanner = $imgBanner;

                return $this;
        }

        public function getEmail()
        {
                return $this->email;
        }

        public function setEmail($email)
        {
                $this->email = $email;

                return $this;
        }

        public function getContraseña()
        {
                return $this->contraseña;
        }

        public function setContraseña($contraseña)
        {
                $this->contraseña = $contraseña;

                return $this;
        }

        public function getPais()
        {
                return $this->pais;
        }

        public function setPais($pais)
        {
                $this->pais = $pais;

                return $this;
        }

        public function getDireccion()
        {
                return $this->direccion;
        }

        public function setDireccion($direccion)
        {
                $this->direccion = $direccion;

                return $this;
        }

        public function getTarjeta()
        {
                return $this->tarjeta;
        }

        public function setTarjeta($tarjeta)
        {
                $this->tarjeta = $tarjeta;

                return $this;
        }

        public function getGenero()
        {
                return $this->genero;
        }

        public function setGenero($genero)
        {
                $this->genero = $genero;

                return $this;
        }

        public function getRedes()
        {
                return $this->redes;
        }

        public function setRedes($redes)
        {
                $this->redes = $redes;

                return $this;
        }

        public function getLatitud()
        {
                return $this->latitud;
        }

        public function setLatitud($latitud)
        {
                $this->latitud = $latitud;

                return $this;
        }

        public function getLongitud()
        {
                return $this->longitud;
        }

        public function setLongitud($longitud)
        {
                $this->longitud = $longitud;

                return $this;
        }
        
        public function getDescripcion()
        {
                return $this->descripcion;
        }
        public function setDescripcion($descripcion)
        {
                $this->descripcion = $descripcion;

                return $this;
        }
        }
?>