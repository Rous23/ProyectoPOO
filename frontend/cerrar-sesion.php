<?php
    /*session_start();
    echo "Cookie: ".$_COOKIE["token"]."<br>";
    echo "Session: ".$_SESSION["token"];*/
    session_start();
    session_destroy();
    setcookie("token","" , time()-1,"/");
    setcookie("nombreUsuario","" , time()-1,"/");
    setcookie("nombreEmpresa","", time()-1,"/");
    setcookie("keyCliente","", time()-1,"/");
    setcookie("keyEmpresa","" , time()-1,"/");

    header("Location: principal.html");
?> 