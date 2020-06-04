<?php
        class UsuarioEmpresa{
                private $nombreEmpresa;
                private $imgBanner;
                private $imgPerfil;
                private $email;
                private $password;
                private $descripcion;
                private $direccion;
                private $genero;
                private $redes;
                private $latitud;
                private $longitud;
                private $pais;
                private $tarjeta;
                private $plan;
                
                


        public function __construct($nombreEmpresa,$imgBanner,$imgPerfil,$email,$password,$descripcion,$direccion,$genero,$redes,$latitud,$longitud,$pais,$tarjeta,$plan){
                $this->nombreEmpresa = $nombreEmpresa;
                $this->imgBanner = $imgBanner;
                $this->imgPerfil = $imgPerfil;
                $this->email = $email;
                $this->password = $password;
                $this->descripcion = $descripcion;
                $this->direccion = $direccion;
                $this->genero = $genero;
                $this->redes = $redes;
                $this->latitud = $latitud;
                $this->longitud = $longitud;
                $this->pais = $pais;
                $this->tarjeta = $tarjeta;
                $this->plan = $plan;
        }

        public function guardarUsuario($db){
                $usuario = $this->getData();
                $result = $db->getReference('empresas')
                        ->getSnapshot()
                        ->getValue();
                foreach($result as $key => $value){
                        if($result[$key]["email"] == $this->email){
                        return '{"mensaje":"El correo ya existe.", "codigo": 0}';
                        }
                }
                $result = $db->getReference('empresas')
                        ->push($usuario);
                
                $ref = 'Admi/'.'empresas';
                $resultAdmi = $db->getReference($ref)
                        ->push($this->guardarEmpresaAdmin());
                

                if($result->getKey() != null){
                        $arreglo = array(
                        "mensaje" => "usuario Autenticado",
                        "codigo" => "1",
                        "token" => sha1(uniqid(rand(),true)),
                        "nombreEmpresa" => $this->nombreEmpresa
                        );
                        session_start();
                        $_SESSION["token"] = $arreglo["token"];
                        setcookie("token",$arreglo["token"] , time()+(60*60*24*31),"/");
                        setcookie("nombreEmpresa",$arreglo["nombreEmpresa"] , time()+(60*60*24*31),"/");
                        setcookie("keyEmpresa",$result->getKey(), time()+(60*60*24*31),"/");
                        return json_encode($arreglo);
                }
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
                ->set($this->getDataActualizar($db,$id))
                ->getValue();
                echo json_encode($result);
        }

        public static function verificarUsuario($db,$email,$password){
                $passwordSha1 = sha1($password);
                $result = $db->getReference('empresas')
                        ->getValue();
                foreach ($result as $key => $value) {
                        # code...
                        if($result[$key]["email"] == $email && $result[$key]["password"] == $password){
                        setcookie("keyEmpresa",$key , time()+(60*60*24*31),"/");
                        return $result[$key];
                        }
                }
                setcookie("keyEmpresa","" , time()-1,"/");
                return null;
        }

        public static function eliminarUsuario(){}

        public function guardarEmpresaAdmin(){
                $result['nombreEmpresa'] = $this->nombreEmpresa;
                $result['email'] = $this->email;
                $result['plan'] = $this->plan;
                return $result;
        }

        public function getDataActualizar($db,$id){
                $resultadoDB = $db->getReference('empresas')
                ->getChild($id)
                ->getValue();

                $result['nombreEmpresa'] = $this->nombreEmpresa;
                $result['imgBanner'] = $this->imgBanner;
                $result['imgPerfil'] = $this->imgPerfil;
                $result['email'] = $this->email;
                $result['password'] = $this->password;
                $result['descripcion'] = $this->descripcion;
                $result['direccion'] = $this->direccion;
                $result['genero'] = $this->genero;
                $result['redes'] = $this->redes;
                $result['latitud'] = $this->latitud;
                $result['longitud'] = $this->longitud;
                $result['pais'] = $this->pais;
                $result['tarjeta'] = $this->tarjeta;
                $result['plan'] = $this->plan;
                if(isset($resultadoDB["sucursales"])){
                        $result['sucursales'] = $resultadoDB["sucursales"];
                }
                if(isset($resultadoDB["productos"])){
                        $result['productos'] = $resultadoDB["productos"];
                }
                if(isset($resultadoDB["promociones"])){
                        $result['promociones'] = $resultadoDB["promociones"];
                }
                return $result;
        }

        public function getData(){
                $result['nombreEmpresa'] = $this->nombreEmpresa;
                $result['imgBanner'] = $this->imgBanner;
                $result['imgPerfil'] = $this->imgPerfil;
                $result['email'] = $this->email;
                $result['password'] = $this->password;
                $result['descripcion'] = $this->descripcion;
                $result['direccion'] = $this->direccion;
                $result['genero'] = $this->genero;
                $result['redes'] = $this->redes;
                $result['latitud'] = $this->latitud;
                $result['longitud'] = $this->longitud;
                $result['pais'] = $this->pais;
                $result['tarjeta'] = $this->tarjeta;
                $result['plan'] = $this->plan;
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

        public function getPassword()
        {
                return $this->password;
        }

        public function setPassword($password)
        {
                $this->password = $password;

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

        public function getPlan()
        {
                return $this->plan;
        }
        public function setPlan($plan)
        {
                $this->plan = $plan;

                return $this;
        }
        }
?>