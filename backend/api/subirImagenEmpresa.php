<?php
    $nombre= $_FILES["controlFileE"]['name'];
    $guardado = $_FILES["controlFileE"]['tmp_name'];
    $dir = '../../frontend/img/fotosEmpresas';
    if(move_uploaded_file($guardado, $dir."/".$nombre)){
        echo $dir."/".$nombre;
    }else{
        echo "error al subir archivo";
    }
    
?>