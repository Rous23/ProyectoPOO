<?php
session_start();
    if(!isset($_SESSION["token"])){
        header("Location: principal.html");
    }
    if(!isset($_COOKIE["token"])){
        header("Location: principal.html");
    }
    if($_SESSION["token"] != $_COOKIE["token"]){
        header("Location: principal.html");
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Luxuary</title>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="fontawesome-free-5.12.1-web/css/all.css">
    <link rel="stylesheet" href="css/estilos.css">
    <link href="https://fonts.googleapis.com/css2?family=Baloo+Thambi+2&family=Lobster&display=swap" rel="stylesheet">
    <link rel="shortcut icon" href="img/logo1.png">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" />
</head>
<body style="background-color: rgba(219, 238, 231, .4);">
    <nav class="navbar navbar-expand-md navbar-light bg-light fixed-top">
        <div class="container-fluid py-2">
            <a style="color:#67397F; font-family: 'Lobster', cursive;" class="navbar-brand">
                <span><img src="img/logo1.png" style="width:2.5rem; height:2.5rem;"> Luxuary</span>
            </a>
            <ul class="nav-principal">
                <li class="nav-item dropdown no-arrow">
                    <a href="#" class="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
                        <div style="display:inline-block" id="imgBarraE">
                        <img src="img/icono.png" class="img-profile rounded-circle" style="width: 2.2rem; height: 2rem;">
                        </div>
                        <span id="nombreBarraE" class="mr-2 d-none d-lg-inline">Administrador</span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right">
                        <div id="nombreDropdownE" class="text-center">Administrador</div>
                        <hr style="margin-top: .3rem;">
                        <div class="text-center">
                            <a href="cerrar-sesion.php" style="cursor: pointer;">
                            <i class="fas fa-sign-out-alt" style="color: rgba(144, 142, 143, .8)"></i>
                            <span>Cerrar Sesion</span></a>
                        </div>
                    </div>    
                </li>
            </ul>
        </div>
    </nav>
    <section class="p-3" id="contenido-informativo" style="width:100%!important">
        <table class="table table-striped table-hover ">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Plan</th>
                </tr>
            </thead>
            <tbody id="tabla-registros"></tbody>
        </table>
        <div id="loading-tabla" class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </section>

    <script src="js/jquery-3.4.1.slim.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/popper.min.js"></script>
    <script src="js/axios.min.js"></script>
    <script src="js/controlador-admin.js"></script>
</body>
</html>