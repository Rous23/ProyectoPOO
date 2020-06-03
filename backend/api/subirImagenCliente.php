<?php
    $nombre= $_FILES["controlFile"]['name'];
    $guardado = $_FILES["controlFile"]['tmp_name'];
    $dir = '../../frontend/img/fotosClientes';
    if(move_uploaded_file($guardado, $dir."/".$nombre)){
        echo $dir."/".$nombre;
    }else{
        echo "error al subir archivo";
    }
    
?>