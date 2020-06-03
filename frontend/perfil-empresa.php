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
            <span style="color:#67397F; font-family: 'Lobster', cursive;font-size:25px;"><img src="img/logo1.png" style="width:2.5rem; height:2.5rem;"> Luxuary</span>

            <ul class="nav-principal">
                <li class="nav-item dropdown no-arrow">
                    <a href="#" class="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
                        <div style="display:inline-block" id="imgBarraE"></div>
                        <span id="nombreBarraE" class="mr-2 d-none d-lg-inline"></span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right">
                        <div id="nombreDropdownE" class="text-center"></div>
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
    <div class="wrapper">
        <!-- Sidebar  -->
        <nav id="sidebar" class="navbar-nav">
            <ul class="list-unstyled">
                <li class="nav-item">
                    <a role="button" href="dashboard.php" class="nav-link componentes-sidebar">
                    <i class="fas fa-chart-line"></i>
                    <span>Dashboard</span></a>
                </li>
                <li class="nav-item">
                    <a role="button" href="perfil-empresa.php" class="nav-link componentes-sidebar" style="cursor:pointer">
                        <i class="fas fa-user-alt"></i>
                    <span>Perfil</span></a>
                </li>
                <li class="nav-item">
                    <a role="button" onclick="registrarProducto()" class="nav-link componentes-sidebar" style="cursor:pointer">
                    <i class="fas fa-tags"></i>
                    <span>Registrar productos</span></a>
                </li>
                <li class="nav-item">
                    <a role="button" onclick="registrarPromocion()" class="nav-link componentes-sidebar" style="cursor:pointer">
                    <i class="fas fa-percent"></i>
                    <span>Registrar promocion</span></a>
                </li>
                <li class="nav-item">
                    <a role="button" onclick="registrarSucursal()" class="nav-link componentes-sidebar" style="cursor:pointer">
                    <i class="fas fa-fw fa-table"></i>
                    <span>Registrar sucursales</span></a>
                </li>
                <li class="nav-item">
                    <a role="button" onclick="configuracionEmpresa()" class="nav-link componentes-sidebar" style="cursor:pointer">
                    <i class="fas fa-fw fa-table"></i>
                    <span>Actualizar Perfil</span></a>
                </li>
                <li class="nav-item">
                    <a href="cerrar-sesion.php">
                    <span class="nav-link componentes-sidebar" style="cursor:pointer">
                    <i class="fas fa-sign-out-alt"></i>
                    <span>Cerrar Sesion</span></span></a>
                </li> 
            </ul>
        </nav>
        <!--sidebar-->

        <!--Content  -->
        <div id="content">
            <section id="options" class="container">
                <div class="imagenes" style="background-color: white;">
                    <div id="contenedorImagenes" class="imagenes">
                        <div class="contenedor-perfil-empresa">
                            <div id="imagenBanner" class="contenedor-banner" style="background-color: rgb(77, 170, 135);width:100%;position:absolute;height: 300px;background-position: center center;background-repeat: no-repeat;background-size: contain;"></div>
                            <div id="imagenPerfil" class="img-perfil" style="background-position: center center;background-repeat: no-repeat;background-size: cover;border-radius: 100%;background-color:white;"></div>
                        </div>
                    </div>
                </div>
                <div class="info-empresa" style="margin-top: 10px;background-color: white;">
                    <div class="pt-2" style="border: .5px solid rgb(232,232,232);">
                        <div id="informacionEmpresarial"></div>
                        <hr>
                        <div class="row">
                            <div class="col-lg-6 col-12">
                                <div class="mapa px-3 pb-4">
                                    <div>
                                        <span><i class="fas fa-map-marked-alt"></i> Ubicacion de la tienda principal:</span>
                                        <div id="map1" style="width:100%;height:400px;"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-sm-6 col-12">
                                <div id="redesEmpresa" class="container text-center"></div>
                            </div>
                            <div class="col-lg-3 col-sm-6 col-12">
                                <div id="sucursalesEmpresa" class="sucursales container text-center"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container py-2">
                    <div class="row mt-4 my-3" >
                        <div class="col-lg-5 col-12">  
                            <div id="productosEmpresa" style="border: .5px solid rgb(232,232,232);border-bottom:0px!important;background-color: white;"></div>
                        </div>
                        <div class="col-lg-7 col-12">
                            <div id="promocionesEmpresa" style="border: .5px solid rgb(232,232,232);border-bottom:0px!important;background-color: white;"></div>
                        </div>
                    </div>
                </div>
                <p class="text-center pt-3">
                    <a href="#" role="button" style="padding: 0%!important;">
                        <span style="font-size: 3rem;color: rgb(77, 170, 135);"><i class="fas fa-arrow-circle-up"></i></span>
                    </a>
                </p>
            </section>
        </div>
    </div>
    <footer class="sticky-footer">
        <div style="padding: 5px;color: white;">
            <p class="text-center" style="margin-bottom: 0%!important;">Copyright &copy; RA | 2020</p>
        </div>
    </footer>

    <!-- Modal1 -->
    <div class="modal fade " id="actualizarFotos" role="dialog">
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
            <div id="modal-empresa" class="modal-body"></div>
            <div id="footer-modal" class="modal-footer"></div>
        </div>
        </div>
    </div>
    <!---->
    <div class="modal fade bd-example-modal-lg" id="mostrarSucursal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Informacion de la Sucursal</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="informacion" class="text-center pt-2" style="border: .5px solid rgb(232,232,232);"></div>
                </div>
            </div>
        </div>
    </div>
    <!--configuracion-->
    <div class="modal fade bd-example-modal-lg" id="configuracion" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Configuracion de la Cuenta</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group container" style="max-width: 500px; margin-top: 40px;">
                        <form id="formulario">
                            <input class="form-control mb-2" placeholder="Nombre Empresa" name="nombreEmpresa" type="text" id="nombreEmpresa">
                            <input class="form-control mb-2" name="email" placeholder="Email" type="email" id="email">
                            <input class="form-control mb-2" name="password" type="password" id="password">
                            <input class="form-control mb-2" name="descripcion" placeholder="Descripcion" type="descripcion" id="descripcion">
                            <input class="form-control mb-2" type="text" name="direccion" id="direccion" placeholder="Direccion">
                            <label for="pais">Pais</label>
                            <select class="form-control" name="pais" id="pais">
                                <option value="Pais" selected disabled></option>
                                <option value="honduras">Honduras</option>
                                <option value="elSalvador">El Salvador</option>
                                <option value="costarica">Costa Rica</option>
                                <option value="guatemala">Guatemala</option>
                                <option value="mexico">Mexico</option>
                            </select>
                            <div class="text-center pt-4">
                                <h5>Cambiar informacion de la tarjeta</h5>
                            </div>
                            <label for="numeroTarjeta">Numero de Tarjeta</label>
                            <input class="form-control" type="text" name="numTarjeta" id="numTarjeta" placeholder="1234-5678-1234">
                            <label for="vencimiento">Vencimiento</label>
                            <input class="form-control" type="text" name="vencimientoTarjeta" id="vencimientoTarjeta" placeholder="mes/año">
                            <label for="cvv">CVV</label>
                            <input class="form-control" type="text" name="cvv" id="cvv" placeholder="123">
                            <div class="text-center pt-4">
                                <h5>Cambiar Plan</h5>
                            </div>
                            <select class="form-control" name="plan" id="plan">
                                <option value="Nuevo Plan" selected disabled></option>
                                <option value="Gratis">Gratis (0$)</option>
                                <option value="Pro">Pro (15$)</option>
                                <option value="Crecimiento">Crecimiento (29$)</option>
                            </select>
                            <div class="text-center py-2">
                                <h4 style="padding-top:10px;">Ubicacion en el mapa</h4>
                                <div id="mapC" style="width: 100%;height: 300px;"></div>
                                <form name="ejemplo2" action="17-jquery-change-demo2.php" method="POST">
                                    <input class="form-control mt-2 mb-2" placeholder="Latitud" type="text" name="latitud" id="latitud">
                                    <input class="form-control mb-2" placeholder="Longitud" name="longitud" type="text" id="longitud">
                                </form>
                            </div>
                            <label class="pt-2" for="password">Para confirmar la informacion escriba su contraseña</label><input class="form-control mb-2" name="password2" placeholder="Contraseña" type="password" id="password2">
                        </form>
                        <button onclick="formulario();" class="btn btn-grad my-2" type="button">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="js/jquery-3.4.1.slim.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/popper.min.js"></script>
    <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"></script>
    <script src="js/axios.min.js"></script>
    <script src="js/controladorEmpresa.js"></script>
    <script src="js/controladorPerfilEmpresa.js"></script>
</body>
</html>