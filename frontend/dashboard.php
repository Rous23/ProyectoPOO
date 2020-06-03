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
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="searchDropdown">
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
                    <a role="button" class="nav-link componentes-sidebar" style="cursor:pointer" href="perfil-empresa.php"> 
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
                    <a href="cerrar-sesion.php" style="cursor: pointer;">
                        <span class="nav-link componentes-sidebar">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>Cerrar Sesion</span></span>
                    </a>
                </li> 
            </ul>
        </nav>
        <!--end sidebar-->

        <!-- Page Content  -->
        <div id="content">
            <section id="options" class="container">
                <div class="container-fluid pb-2 mb-3">
                    <div class="pt-5">
                        <h5 class="text-center py-3 card-header mb-3" style="border: .5px solid rgb(232,232,232);">Estadisticas</h5>
                    </div>
                    <div class="row pb-2">
                        <div class="col-xl-6 col-lg-12 py-2">
                            <div class="container-fluid" style="border: .5px solid rgb(232,232,232);background-color:white;">
                                <div class="text-center py-3"><h3>Ventas</h3></div>
                                <div class="p-2">
                                    <canvas id="myChart1"></canvas>
                                </div>
                                <div class="p-3" id="datoVentas"></div>
                            </div>
                        </div>
                        <div class="col-xl-6 col-lg-12 py-2">
                            <div class="container" style="border: .5px solid rgb(232,232,232);background-color:white;">
                                <div class="text-center py-3"><h3>Seguidores</h3></div>
                                <div class="container-fluid p-2">
                                    <canvas id="myChart2"></canvas>
                                </div>
                                <div class="p-3" id="datoSeguidores"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="comentariosEmpresa" class="container-fluid my-3 pt-5"></div>
                <p class="text-center pt-3">
                    <a href="#" role="button" style="padding: 0%!important;">
                        <span style="font-size: 3rem;color: rgb(77, 170, 135);"><i class="fas fa-arrow-circle-up"></i></span>
                    </a>
                </p>
            </section>
        </div>
    </div>
    <footer style="width: 100%;text-align: center;bottom: 0;left: 0;">
        <div style="padding: 5px;color: white;">
            <p class="text-center" style="margin-bottom: 0%!important;">Copyright &copy; RA | 2020</p>
        </div>
    </footer>
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
    <script src="js/chart.js"></script>
    <script src="js/axios.min.js"></script>
    <script src="js/controladorEmpresa.js"></script>
    <script src="js/controladorDashboard.js"></script>
    
</body>
</html>