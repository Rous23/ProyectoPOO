<?php
session_start();
    if(!isset($_SESSION["token"])){
        //eliminar cookies
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
</head>
<body style="background-color: rgba(219, 238, 231, .4);">
    <nav class="navbar navbar-expand-md navbar-light bg-light fixed-top">
        <div class="container-fluid py-2">
            <a style="color:#67397F; font-family: 'Lobster', cursive;" class="navbar-brand" href="principal.html">
                <span><img src="img/logo1.png" style="width:2.5rem; height:2.5rem;"> Luxuary</span>
            </a>
            <form class="d-none d-md-inline-block form-inline ml-auto mr-auto my-2 my-md-0 navbar-search" style="align-items: center;">
                <div class="input-group my-2">
                    <input id="search-input" class="form-control" type="text" placeholder="Buscar" aria-label="Search">
                    <div class="input-group-append">
                        <button class="btn btn-grad my-sm-0" type="button">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </form>

            <ul class="nav-principal">
                <li class="nav-item dropdown text-center no-arrow d-md-none">
                    <a id="search-dropdown" href="#" class="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                        <i class="fas fa-search fa-fw"  style="color: #67397F;"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-center" aria-labelledby="searchDropdown">
                        <form class="form-inline my-2 px-2" style="align-items: center;">
                            <div class="input-group">
                                <input id="search-input" class="form-control" type="text" placeholder="Buscar" aria-label="Search" style="width: 200px!important;">
                                <div class="input-group-append">
                                    <button class="btn btn-grad my-sm-0" type="button">
                                        <i class="fas fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </li>
                <li class="nav-item dropdown no-arrow mx-1">
                    <a href="carro-compras.html" class="nav-link" role="button">
                        <span><i class="fas fa-shopping-cart" style="color: #67397F;"></i></span> 
                    </a>
                </li>
                <li class="nav-item dropdown no-arrow" >
                    <a href="#" class="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color: #67397F;"> 
                        <div style="display:inline-block" id="imgBarra"></div>
                        <span id="nombreBarra" class="mr-2 d-none d-lg-inline"></span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right">
                        <div id="nombreDropdown" class="text-center"></div>
                        <hr style="margin-top: .3rem;margin-bottom: .3rem;">
                        <div class="text-center">
                            <a href="principal.html" class="nav-link" role="button" style="color: #67397F;">Principal</a>
                            <a href="cerrar-sesion.php" style="cursor: pointer;"><i class="fas fa-sign-out-alt" style="color: rgba(144, 142, 143, .8)"></i>
                            <span>Cerrar Sesion</span></a>
                        </div>
                    </div>    
                </li>
            </ul>
        </div>
    </nav>

    <main role="main" style="min-height: 100vh;">
        <section class="container">
            <div class="imagenes" style="background-color: white;">
                <div id="contenedorImagenes" class="imagenes">
                    <div class="contenedor-perfil-cliente">
                        <div id="imagenBanner" class="contenedor-banner" style="background-color: rgb(77, 170, 135);width:100%;position:absolute;height: 300px;background-position: center center;background-repeat: no-repeat;background-size: contain;"></div>
                        <div id="imagenPerfil" class="img-perfil" style="background-position: center center;background-repeat: no-repeat;background-size: cover;border-radius: 100%;background-color:white;"></div>
                    </div>
                </div>
            </div>
            <div id="borde-info" class="container-fluid info-cliente" style="background-color: white;margin-top: 10px;">
                <div id="informacion" class="pt-2"></div>
            </div>
        </section>
        <div class="container">
            <div class="row my-4" >
                <div class="col-lg-5 col-12 py-2">
                    <div id="prod-favoritos" style="border: .5px solid rgb(232,232,232);background-color: white;"></div>  
                </div>
                <div class="col-lg-7 col-12 text-center py-2">
                    <div id="empresas-favoritas" style="border: .5px solid rgb(232,232,232);background-color: white;"></div>
                </div>
            </div>
        </div>
    </main>
    <p class="text-center pt-3">
        <a href="#" role="button" style="padding: 0%!important;">
            <span style="font-size: 3rem;color: rgb(77, 170, 135);"><i class="fas fa-arrow-circle-up"></i></span>
        </a>
    </p>
    <footer>
        <div style="color: white;">
            <p class="text-center" style="margin-bottom: 0%!important;">Copyright &copy; RA | 2020</p>
        </div>
    </footer>

    <!-- Modal1 -->
    <div class="modal fade " id="myModal1" role="dialog">
        <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <div>
                    <a style="color:#67397F; font-family: 'Lobster', cursive;" class="navbar-brand" href="index.html">
                        <span><img src="img/logo1.png" style="width:2.5rem; height:2.5rem;"> Luxuary</span>
                    </a>
                </div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                
            </div>
            <div class="modal-body">
                <div id="fotos-modal" class="container"></div>
            </div>
            <div id="modal-footer" class="modal-footer"></div>
        </div>
        </div>
    </div>
    <!-- Modal2 -->
    <div class="modal fade" id="myModal2" role="dialog">
        <div class="modal-dialog">
        
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <div>
                    <a style="color:#67397F; font-family: 'Lobster', cursive;" class="navbar-brand" href="index.html">
                        <span><img src="img/logo1.png" style="width:2.5rem; height:2.5rem;"> Luxuary</span>
                    </a>
                </div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                
            </div>
            <div class="modal-body">
                <form id="forms">
                    <div class="row px-3">
                        <div class="col-12">
                            <h5>Inicio y Seguridad</h5>
                        </div>
                        <div class="col-12">
                            <label for="nombre">Nombre Completo</label>
                            <input type="text" class="form-control" name="nombreCompleto" id="nombreCompleto">
                        </div>
                        <div class="col-12">
                            <label for="email">Email</label>
                            <input class="form-control" type="email" name="email" id="email">
                        </div>   
                        <div class="col-md-6 col-12 py-1">
                            <label for="password">Cambiar Contraseña</label>
                            <input class="form-control" type="password" name="password" id="password" placeholder="Contraseña">
                            <small style="color:red;" id="mensajePassword"></small>
                        </div> 
                        <div class="col-md-6 col-12 py-1">
                            <label for="password">Confirmar Contraseña</label>
                            <input class="form-control" type="password" id="password2" placeholder="Contraseña">
                        </div>
                        <div class="col-12 pt-4">
                            <h5>Ubicacion</h5>
                        </div>
                        <div class="col-12">
                            <label for="direccion">Direccion</label>
                            <input class="form-control" type="text" name="direccion" id="direccion" placeholder="Colonia, casa, zona">
                        </div>
                        <div class="col-md-6 col-12">
                            <label for="pais">Pais</label>
                            <select class="form-control" name="pais" id="pais">
                                <option value="honduras">Honduras</option>
                                <option value="elSalvador">El Salvador</option>
                                <option value="costarica">Costa Rica</option>
                                <option value="guatemala">Guatemala</option>
                                <option value="mexico">Mexico</option>
                            </select>
                        </div>
                        <div class="col-12 pt-4">
                            <h5>Cambiar informacion de la tarjeta</h5>
                        </div>
                        <div class="col-md-6 col-12">
                            <label for="numeroTarjeta">Numero de Tarjeta</label>
                            <input class="form-control" type="text" name="numTarjeta" id="numTarjeta" placeholder="1234-5678-1234">
                        </div>
                        <div class="col-md-3 col-6">
                            <label for="vencimiento">Vencimiento</label>
                            <input class="form-control" type="text" name="vencimientoTarjeta" id="vencimientoTarjeta" placeholder="mes/año">
                        </div>
                        <div class="col-md-3 col-6">
                            <label for="cvv">CVV</label>
                            <input class="form-control" type="text" name="cvv" id="cvv" placeholder="123">  
                        </div>
                        <input class="form-control" type="hidden" name="imgBanner" id="form-imagenBanner">
                        <input class="form-control" type="hidden" name="imgPerfil" id="form-imagenPerfil">
                        <input class="form-control" type="hidden" name="genero" id="genero">
                    </div> 
                </form>
                
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-grad" data-dismiss="modal">Cerrar</button>
                <button onclick="actualizarCliente()" type="button" class="btn btn-grad" data-dismiss="modal">Guardar</button>
            </div>
        </div>
        </div>
    </div>
    <!---->
    <!---->
    <div class="modal fade bd-example-modal-lg" id="mostrarTienda" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Informacion de la Tienda</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="imagenes">
                    <div id="contenedorImagenesModalE" class="imagenes">
                        
                    </div>
                </div>
                <div class="modal-body">
                    <div id="informacionModalE" class="text-center" style="border: .5px solid rgb(232,232,232);"></div>
                    <div id="promo" class="mt-3 pt-2" style="border: .5px solid rgb(232,232,232);"></div>
                </div>
            </div>
        </div>
    </div>
    <script src="js/jquery-3.4.1.slim.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/axios.min.js"></script>
    <script src="js/controladorClientes.js"></script>
    
    
</body>
</html>