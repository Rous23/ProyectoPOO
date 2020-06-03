<?php
    $nombre= $_FILES["imagenPr"]['name'];
    $guardado = $_FILES["imagenPr"]['tmp_name'];
    $dir = '../../frontend/img/fotosEmpresas/productos';
    if(move_uploaded_file($guardado, $dir."/".$nombre)){
        echo $dir."/".$nombre;
    }else{
        echo "error al subir archivo";
    }
    
?>