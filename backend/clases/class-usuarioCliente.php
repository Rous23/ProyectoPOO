<?php
    class UsuarioCliente{
        private $nombreCompleto;
        private $imgBanner;
        private $imgPerfil;
        private $email;
        private $password;
        private $direccion;
        private $pais;
        private $genero;
        private $tarjeta;

        //construcctor
        public function __construct($nombreCompleto,$imgBanner,$imgPerfil,$email,$password,$direccion,$pais,$genero,$tarjeta/*,$empresasFavoritas,$productosFavoritos*/){
            $this->nombreCompleto = $nombreCompleto;
            $this->imgBanner = $imgBanner;
            $this->imgPerfil = $imgPerfil;
            $this->email = $email;
            $this->password = $password;
            $this->direccion = $direccion;
            $this->pais = $pais;
            $this->genero = $genero;
            $this->tarjeta =$tarjeta;
        }

        //GuardarUsuariolClienteBD
        public function guardarUsuario($db){
            $usuario = $this->getData();
            $result = $db->getReference('clientes')
                ->getSnapshot()
                ->getValue();
            foreach($result as $key => $value){
                if($result[$key]["email"] == $this->email){
                    return '{"mensaje":"El correo ya existe.", "codigo": 0}';
                }
            }
            $result = $db->getReference('clientes')
                ->push($usuario);

            if($result->getKey() != null){
                $arreglo = array(
                    "mensaje" => "usuario Autenticado",
                    "codigo" => "1",
                    "token" => sha1(uniqid(rand(),true)),
                    "nombreUsuario" => $this->nombreCompleto
                );
                session_start();
                $_SESSION["token"] = $arreglo["token"];
                setcookie("token",$arreglo["token"] , time()+(60*60*24*31),"/");
                setcookie("nombreUsuario",$arreglo["nombreUsuario"] , time()+(60*60*24*31),"/");
                setcookie("keyCliente",$result->getKey(), time()+(60*60*24*31),"/");
                return json_encode($arreglo);
            }
        }

        public static function obtenerUsuario($db,$id){
            $result = $db->getReference('clientes')
                ->getChild($id)
                ->getValue();

            echo json_encode($result);
        }

        public static function obtenerUsuarios($db){
            $result = $db->getReference('clientes')
                ->getSnapshot()
                ->getValue();

            echo json_encode($result);
        }

        public function actualizarUsuario($db,$id){
            $result = $db->getReference('clientes')
                ->getChild($id)
                ->set($this->getDataActualizar($db,$id))
                ->getValue();
            echo json_encode($result);
            /*
            if($result->getKey() != null){
                return `{"datos": $res,"mensaje":"Registro actualizado", "key":"'.$result->getKey().'"}`;
            }else{
                return '{"mensaje":"Error al actualizar el registro"}';
            }*/

        }

        public static function eliminarUsuario($db,$id){
            $db->getReference('clientes')
            ->getChild($id)
            ->remove();
            echo '{"mensaje":"Se elimino el elemento '.$id.'"}';
        }

        public function getDataActualizar($db,$id){
            $resultadoDB = $db->getReference('clientes')
                ->getChild($id)
                ->getValue();

            $result['nombreCompleto'] = $this->nombreCompleto;
            $result['imgBanner'] = $this->imgBanner;
            $result['imgPerfil'] = $this->imgPerfil;
            $result['email'] = $this->email;
            if( $resultadoDB["password"] == $this->password){
                $result['password'] = $this->password;
            }else{
                $result['password'] = sha1($this->password);
            }
            $result['direccion'] = $this->direccion;
            $result['pais'] = $this->pais;
            $result['genero'] = $this->genero;
            $result['tarjeta'] = $this->tarjeta;
            if(isset($resultadoDB["productosFavs"])){
                $result['productosFavs'] = $resultadoDB["productosFavs"];
            }
            if(isset($resultadoDB["empresasFavs"])){
                $result['empresasFavs'] = $resultadoDB["empresasFavs"];
            }
            if(isset($resultadoDB["carroCompras"])){
                $result['carroCompras'] = $resultadoDB["carroCompras"];
            }
            return $result;
        }
        public function getData(){
            $result['nombreCompleto'] = $this->nombreCompleto;
            $result['imgBanner'] = $this->imgBanner;
            $result['imgPerfil'] = $this->imgPerfil;
            $result['email'] = $this->email;
            $result['password'] = sha1($this->password);
            $result['direccion'] = $this->direccion;
            $result['pais'] = $this->pais;
            $result['genero'] = $this->genero;
            $result['tarjeta'] = $this->tarjeta;
            /*$result['empresasFavoritas'] = $this->empresasFavoritas;
            $result['productosFavoritos'] = $this->productosFavoritos;*/
            return $result;
        }

        public static function verificarUsuario($db,$email,$password){
            $passwordSha1 = sha1($password);
            $result = $db->getReference('clientes')
                    ->getValue();
            foreach ($result as $key => $value) {
                # code...
                if($result[$key]["email"] == $email && $result[$key]["password"] == $passwordSha1){
                    setcookie("keyCliente",$key , time()+(60*60*24*31),"/");
                    return $result[$key];
                }
            }
            setcookie("keyCliente","" , time()-1,"/");
            return null;
        }

        public function getNombreCompleto(){
            return $this->nombreCompleto;
        }
        public function setNombreCompleto($nombreCompleto){
            $this->nombreCompleto = $nombreCompleto;
            return $this;
        }

        public function getImgBanner(){
            return $this->imgBanner;
        }
        public function setImgBanner($imgBanner){
            $this->imgBanner = $imgBanner;
            return $this;
        }

        public function getImgPerfil(){
            return $this->imgPerfil;
        }
        public function setImgPerfil($imgPerfil){
            $this->imgPerfil = $imgPerfil;
            return $this;
        }

        public function getEmail(){
            return $this->email;
        }
        public function setEmail($email){
            $this->email = $email;
            return $this;
        }

        public function getPassword(){
            return $this->password;
        }
        public function setPassword($password){
            $this->password = $password;
            return $this;
        }

        public function getDireccion(){
            return $this->direccion;
        }
        public function setDireccion($direccion){
            $this->direccion = $direccion;
            return $this;
        }

        public function getPais(){
            return $this->pais;
        }
        public function setPais($pais){
            $this->pais = $pais;
            return $this;
        }

        public function getGenero(){
            return $this->genero;
        }
        public function setGenero($genero){
            $this->genero = $genero;
            return $this;
        }

        public function getTarjeta(){
            return $this->tarjeta;
        }
        public function setTarjeta($tarjeta){
            $this->tarjeta = $tarjeta;
            return $this;
        }

        public function getEmpresasFavoritas(){
            return $this->empresasFavoritas;
        }
        public function setEmpresasFavoritas($empresasFavoritas){
            $this->empresasFavoritas = $empresasFavoritas;
            return $this;
        }

        public function getProductosFavoritos(){
            return $this->productosFavoritos;
        }
        public function setProductosFavoritos($productosFavoritos){
            $this->productosFavoritos = $productosFavoritos;
            return $this;
        }

        
    }
?>