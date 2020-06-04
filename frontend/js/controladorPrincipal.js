principalUsuarioLogin();
(()=>{
    axios({
    url:'../../Proyecto/backend/api/categorias.php',
    method:"get",
    }).then(res=>{
        categorias = res.data;
        //console.log(categorias);
        generarCategoria(categorias);
        generarProductos(categorias);
        
    }).catch(err=>{
        console.error(err);
    })
})();

function principalUsuarioLogin(){
    let idC = getCookie("keyCliente");
    if(idC){
        axios({
            url:`../../Proyecto/backend/api/usuarioCliente.php?idCliente=${idC}`,
            method:"get",
            }).then(res=>{
                console.log(res);
                
                document.getElementById('lista-navbar').innerHTML = '';
                document.getElementById('lista-navbar').innerHTML = `
                <li class="nav-item dropdown no-arrow mx-1">
                    <a href="carro-compras.html" class="nav-link" role="button">
                        <span><i class="fas fa-shopping-cart" style="color: #67397F;"></i></span> 
                    </a>
                </li>
                <li class="nav-item dropdown no-arrow" >
                    <a href="#" class="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color: #67397F;"> 
                        <img src="Proyecto/${res.data.imgPerfil}" class="img-profile rounded-circle" style="width: 2.2rem; height: 2rem;">
                        <span class="mr-2 d-none d-lg-inline">${res.data.nombreCompleto.split(" ")[0]}</span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right">
                        <div class="text-center">${res.data.nombreCompleto}</div>
                        <hr style="margin-top: .3rem;margin-bottom: .3rem;">
                        <div class="text-center">
                            <a href="principal.html" class="nav-link" role="button" style="color: #67397F;">Principal</a>
                            <a href="perfil-cliente.php" class="nav-link" role="button" style="color: #67397F;">Perfil</a>
                            <a href="cerrar-sesion.php">
                            <i class="fas fa-sign-out-alt" style="color: rgba(144, 142, 143, .8)"></i>
                            <span>Cerrar Sesion</span>
                            </a>
                        </div>
                    </div>    
                </li>
                `;
                
            }).catch(err=>{
                console.error(err);
        })
    }else{
        document.getElementById('lista-navbar').innerHTML = `
        <li class="nav-item">
            <button type="button" class="btn btn-grad ml-1 my-1 py-1 nav-link" data-toggle="modal" data-target="#exampleModalCenter">Login</button>
        </li>
        <li class="nav-item">
            <button type="button" class="btn btn-grad ml-1 my-1 py-1 nav-link" data-toggle="modal" data-target=".bd-example-modal-lg">Registrarse</button>
        </li>
        `;
    }
    
}
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
function generarCategoria(categorias){
    //console.log("indice" + indice);
    for (let indice in categorias){
        //console.log(indice);
        document.getElementById('card-categorias').innerHTML += `
        <div class="col-lg-2 col-md-3 col-4 py-1">
            <div onclick="llenarSidebar('${indice}')" class="card" style="cursor: pointer;">
                <div>
                    <img src= ${categorias[indice].imgCategoria} class="d-block w-100 tamaño-img card-img-top">
                </div>
                <div class="card-footer py-3" style="background: #66397E; border-color: #66397E;color: white!important;padding-left: 0px!important;padding-right: 0px!important;">
                    <p class="card-text text-center" style="font-size: 15px;padding: 0%!important;">${categorias[indice].nombreCategoria}</p>
                    <!--<a href="#" class="btn btn-primary">Go somewhere</a>-->
                </div>
            </div>
        </div>`;
    }

}
function generarProductos(categorias){
    for(let indice in categorias){
        if(categorias[indice].productos){
            let productos = categorias[indice].productos;
            //console.log(productos);
            for(let key in productos){
                document.getElementById('card-productos').innerHTML += `
                <div class="col-lg-2 col-md-3 col-sm-4 col-6 pb-1 px-1">
                    <div onclick="detallesProducto('${key}','${indice}')" class="card" style="cursor:pointer;">
                        <img src="img/${productos[key].imgProducto}" class="card-img-top" style="padding: 8px;">
                        <div class="card-body">
                            <div class="precios px-3" style="color: red;">
                            <span id="precioActual">L ${productos[key].precioNormal}</span>
                            <span class="text-muted"id="precioAntes" style="text-decoration: line-through;"> L ${productos[key].precioPromocion}</span>
                            </div>
                        </div>
                        <div class="click-hover" style="border-radius: 5px;cursor:pointer;">
                            <span style="font-size: 3rem;display:block"><i class="far fa-hand-point-up"></i></span>
                            <span>Ver Producto</span>
                        </div>
                    </div>
                </div>
                `;
            }
        }
    }
}

function llenarSidebar(idCategoria){
    document.getElementById('body-principal').style.background = 'rgba(77, 170, 135, .2)';
    document.getElementById('main-box').innerHTML='';
    axios({
        url:`../../Proyecto/backend/api/categorias.php`,
        method:"get",
        }).then(res=>{
            //console.log(res.data);
            //llenarSidebar(res.data);
            let lista = '';
            for (let indice in categorias){
                const nombreCat = categorias[indice].nombreCategoria;
                lista += `
                <li onclick="mostrarProductos('${indice}','${nombreCat}')" style="cursor:pointer;" class="nav-item">
                    <span class="nav-link componentes-sidebar" data-feather="file style="display:block"><i style="color:#67397F;" class="${categorias[indice].icono}"></i>
                    <span>${categorias[indice].nombreCategoria}</span></span>
                </li>`;
            }
            document.getElementById('main-box').innerHTML+=`
            <nav id="sidebar-categoria" class="navbar-nav" style="background: rgb(242,242,242);">
                <div class="sidebar-sticky">
                    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-2 my-2 mb-1 text-muted">
                        <span class="tam-letra" style="font-size: 15px;">Categorias</span>
                    </h6>
                    <ul id="nav-sidebar" class="nav flex-column">
                    ${lista}
                    </ul>
                </div>
            </nav>
            `;
            imprimirProductos(idCategoria);
        }).catch(err=>{
            console.error(err);
    })
    
}
function imprimirProductos(idCategoria,nombreCat){
    //console.log(idCategoria);
    axios({
        url:`../../Proyecto/backend/api/categorias.php?idCategoria=${idCategoria}`,
        method:"get",
        }).then(res=>{
            let productos = '';
            for (let indice in res.data.productos){
                let stars = '';
                if(res.data.productos[indice].cantidadEstrellas){
                    let suma = 0;
                    let count = 0;
                    for(let key in res.data.productos[indice].cantidadEstrellas){
                        suma = suma + parseInt(res.data.productos[indice].cantidadEstrellas[key]);
                        count = count + 1;
                    }
                    let total = suma/count;
                    stars =  `
                    <span>${parseFloat(total.toFixed(2))+'%'} <label id="chk" for="radio1" style="font-size: 16px;color: orange;">★</label></span>
                    `;
                }
                productos += `
                <div class="col-lg-3 col-sm-4 col-6 px-1 py-1">
                    <div class="card shadow-sm">
                        <div onclick="detallesProducto('${indice}','${idCategoria}')" style="cursor:pointer">
                            <img src="Proyecto/${res.data.productos[indice].imgProducto}" class="card-img-top" >
                            <div class="card-body" style="padding: .5rem!important;">
                                <h6 class="card-title">${res.data.productos[indice].nombreProducto}</h6>
                                <span id="porcentajeEs" class="d-block">${stars}</span>
                                <span>${res.data.productos[indice].porcentajeDescuento} Descuento</span>
                                <div class="precios" style="color: red;">
                                    <span id="precioActual">L ${res.data.productos[indice].precioNormal}</span>
                                    <span class="text-muted"id="precioAntes" style="text-decoration: line-through;"> L ${res.data.productos[indice].precioPromocion}</span>
                                </div>
                            </div>
                        </div>
                        <hr style="margin:0%!important">
                        <div class="text-center py-2">
                            <div id="botonesProducto">
                                <a id="${indice}" onclick="obtenerProd('${indice}','${idCategoria}')" style="padding:5px!important;cursor:pointer;" role="button">
                                    <i class="far fa-heart" style="color: red;"></i>
                                </a>
                                <a id="${indice}" onclick="irPerfilEmpresa('${res.data.productos[indice].idEmpresa}')" style="padding:5px!important;cursor:pointer;" role="button">
                                    <i id="tienda" class="fas fa-store" style="color: rgb(77, 170, 135);"></i></a>
                                <a id="${indice}" onclick="agregarCarrito('${indice}','${idCategoria}')" style="padding:5px!important;color: rgb(102, 57, 126);cursor:pointer;" role="button">
                                <i class="fas fa-shopping-cart"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            }
            document.getElementById('main-box').innerHTML += `
            <div id="content">
                <main role="main" class="ml-sm-auto starter-template mt-2">
                    <div class="container-fluid">
                        <div id="mostrarSubCategoria" class="row py-4 px-1">
                            <div class="col-12 text-center" style="font-size: 25px;">${res.data.nombreCategoria}</div>
                            ${productos}
                        </div>
                    </div>
                </main>
            </div>
            `;
        }).catch(err=>{
            console.error(err);
    })
}

function mostrarProductos(idCategoria){
    document.getElementById('mostrarSubCategoria').innerHTML='';
    axios({
        url:`../../Proyecto/backend/api/categorias.php?idCategoria=${idCategoria}`,
        method:"get",
        }).then(res=>{
            grupoProductos = res.data.productos;
            document.getElementById('mostrarSubCategoria').innerHTML= `
            <div class="col-12 text-center" style="font-size: 25px;">${res.data.nombreCategoria}</div>
            `;
            if(grupoProductos){
                //console.log(grupoProductos);
                for (let indice in grupoProductos){
                    let stars = '';
                    if(grupoProductos[indice].cantidadEstrellas){
                        let suma = 0;
                        let count = 0;
                        for(let key in grupoProductos[indice].cantidadEstrellas){
                            suma = suma + parseInt(grupoProductos[indice].cantidadEstrellas[key]);
                            count = count + 1;
                        }
                        let total = suma/count;
                        stars =  `
                        <span>${parseFloat(total.toFixed(2))+'%'} <label id="chk" for="radio1" style="font-size: 16px;color: orange;">★</label></span>
                        `;
                    }
                    document.getElementById('mostrarSubCategoria').innerHTML += `
                    <div class="col-lg-3 col-sm-4 col-6 px-1 py-1">
                        <div class="card shadow-sm">
                            <div onclick="detallesProducto('${indice}','${idCategoria}')"style="cursor:pointer">
                                <img src="Proyecto/${grupoProductos[indice].imgProducto}" class="card-img-top">
                                <div class="card-body" style="padding: .5rem!important;">
                                    <h6 class="card-title">${grupoProductos[indice].nombreProducto}</h6>
                                    <span id="porcentajeEs" class="d-block">${stars}</span>
                                    <span>${grupoProductos[indice].porcentajeDescuento} Descuento</span>
                                    <div class="precios" style="color: red;">
                                        <span id="precioActual">L ${grupoProductos[indice].precioNormal}</span>
                                        <span class="text-muted"id="precioAntes" style="text-decoration: line-through;"> L ${grupoProductos[indice].precioPromocion}</span>
                                    </div>
                                </div>
                            </div>
                            <hr style="margin:0%!important">
                            <div class="text-center py-2">
                                <div id="botonesProducto">
                                    <a id="${indice}" onclick="obtenerProd('${indice}','${idCategoria}')" style="padding:5px!important;cursor:pointer;" role="button">
                                        <i class="far fa-heart" style="color: red;"></i>
                                    </a>
                                    <a id="${indice}" onclick="irPerfilEmpresa('${res.data.productos[indice].idEmpresa}')" style="padding:5px!important;cursor:pointer;" role="button">
                                        <i id="tienda" class="fas fa-store" style="color: rgb(77, 170, 135);"></i></a>
                                    <a id="${indice}" onclick="agregarCarrito('${indice}','${idCategoria}')" style="padding:5px!important;color: rgb(102, 57, 126);cursor:pointer;" role="button">
                                    <i class="fas fa-shopping-cart"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                }
            }
        }).catch(err=>{
            console.error(err);
        })
}

function detallesProducto(idProducto,idCategoria){
    axios({
        url:`../../Proyecto/backend/api/categorias.php?idCategoria=${idCategoria}`,
        method:"get",
        }).then(res=>{
            productos = res.data.productos;
            if(productos){
                for (let indice in productos) {
                    if(indice == idProducto){
                        //console.log(productos[indice]);
                        document.cookie = `idProducto=${idProducto}`;
                        document.cookie = `idCategoria=${idCategoria}`;
                        //document.cookie = `username=${indice}; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/`;
                        console.log(document.cookie);
                        window.location.href = `producto.html?idProducto=${idProducto}`;//
                    }
                }
            }
            
        }).catch(err=>{
            console.error(err);
    })
}

function obtenerProd(id1, id2){
    verificar = getCookie("keyCliente");
    if(verificar){
    let parametros;
        axios({
            url:`../../Proyecto/backend/api/categorias.php?idCategoria=${id2}`,
            method:"get",
            }).then(res=>{
                let categoria = res.data
                if(categoria.productos){
                    for(let key in categoria.productos){
                        if(key == id1){
                            parametros = categoria.productos[key];
                            guardarProductoFav(parametros,id1,id2);
                        }
                    }
                }
            }).catch(err=>{
                console.error(err);
        })
    }else{
        $('#exampleModalCenter').modal('show');
    }
}
function guardarProductoFav(datos,indicePCat,idCat){
    let llave = getCookie("keyCliente");
    console.log(datos);
    axios({
        url:`../../Proyecto/backend/api/usuarioCliente.php?idCliente=${llave}`,
        method:"get",
        }).then(res=>{
            cliente = res.data;
            console.log(cliente);
            document.getElementById(indicePCat).innerHTML = '';
            document.getElementById(indicePCat).innerHTML =`
            <i class="fas fa-heart" style="color: red;"></i>
            `;
            if(cliente.productosFavs){
                for(let key in cliente.productosFavs){
                    if(cliente.productosFavs[key].idProducto == datos.idProducto){
                        console.log("El producto ya esta en favoritos");
                        return;
                    }
                }
                axios({
                    url:`../../Proyecto/backend/api/productosCliente.php?idCliente=${llave}`,
                    method:"post",
                    responseType:"json",
                    data:{
                        nombreProducto : datos.nombreProducto  ,
                        imgProducto : datos.imgProducto  ,
                        descripcion : datos.descripcion  ,
                        precioNormal : datos.precioNormal  ,
                        precioPromocion : datos.precioPromocion  ,
                        porcentajeDescuento : datos.porcentajeDescuento ,                     
                        idEmpresa : datos.idEmpresa,
                        idProducto : datos.idProducto,
                        idPCat: indicePCat,
                        idCategoria : idCat
                    }
                    }).then(res=>{
                        document.getElementById('mensajeRespuesta').innerHTML = `
                        <h6>Producto guardado exitosamente en favoritos.</h6>
                        `;
                        $('#guardado').modal('show');
                        //console.log("Guardado");
                    }).catch(err=>{
                        console.error(err);
                })
            }else{
                axios({
                    url:`../../Proyecto/backend/api/productosCliente.php?idCliente=${llave}`,
                    method:"post",
                    responseType:"json",
                    data:{
                        nombreProducto : datos.nombreProducto  ,
                        imgProducto : datos.imgProducto  ,
                        descripcion : datos.descripcion  ,
                        precioNormal : datos.precioNormal  ,
                        precioPromocion : datos.precioPromocion  ,
                        porcentajeDescuento : datos.porcentajeDescuento ,                     
                        idEmpresa : datos.idEmpresa,
                        idProducto : datos.idProducto
                    }
                    }).then(res=>{
                        document.getElementById('mensajeRespuesta').innerHTML = `
                        <h6>Producto guardado exitosamente en favoritos.</h6>
                        `;
                        $('#guardado').modal('show');
                        //console.log("Guardado");
                    }).catch(err=>{
                        console.error(err);
                })
            }
            
        }).catch(err=>{
            console.error(err);
    })
}

function irPerfilEmpresa(idEmpresa){
    console.log(idEmpresa);
    verificar = getCookie("keyCliente");
    if(verificar){
        axios({
            url:`../../Proyecto/backend/api/usuarioEmpresa.php?idEmpresa=${idEmpresa}`,
            method:"get",
            }).then(res=>{
                console.log(res.data.imgPerfil);
                let promociones = res.data.promociones;
                document.getElementById('contenedorImagenes').innerHTML = `
                <div class="contenedor-perfil-cliente">
                    <div id="imagenBannerEmpresa" style="background-color: rgba(0,0,0,.2);">
                        <img class="contenedor-banner" src="img/${res.data.imgBanner}" style="width: 100%; height: 300px;">
                    </div>
                    <div id="imagenPerfilEmpresa" class="img-perfil">
                        <img class="rounded-circle img-thumbnail" src="img/${res.data.imgPerfil}" style="width: 100%;">
                    </div>
                    <span id="botonLike" class="mt-auto mx-3 mb-2" style="float: rigth;">
                        <a id="${idEmpresa}" onclick="empresaFav('${idEmpresa}')" style="padding:5px!important;cursor:pointer;" role="button">
                            <i class="far fa-heart" style="color: red;font-size:1.5rem;"></i>
                        </a>
                    </spa>
                </div>
                `;
                document.getElementById('informacion').innerHTML = `
                <span class="px-3" style="font-size: 1.3rem;">${res.data.nombreEmpresa}</span>
                <hr style="margin-top: .5rem!important;">
                <div>Correo: ${res.data.email}</div>
                <div>Descripcion: ${res.data.descripcion}</div>
                <div>Pais: ${res.data.pais}</div>
                <div>Direccion: ${res.data.direccion}</div>
                `;

                let grupoPromo = '';
                for(let key in promociones){
                    grupoPromo +=`
                    <div id="${key}" class="row no-gutters px-2" onclick="mostrarProducto('${key}')">
                        <div class="col-4">
                        <img src="img/${promociones[key].imgProducto}" class="card-img img-thumbnail" style="width: 100%; height: 100%;">
                        </div>
                        <div class="col-8">
                            <div class="descripcion-producto pl-3">
                                <span>${promociones[key].nombreProducto}</span><br>
                                <small>${promociones[key].descripcion}</small>
                            </div>
                            <div class="precios px-3" style="color: red;">
                                <span id="precioActual"> L ${promociones[key].precioNormal}</span>
                                <span class="text-muted"id="precioAntes" style="text-decoration: line-through;"> L ${promociones[key].precioPromocion}</span>
                            </div>
                            <div class="disponibles px-3">
                                <span class="text-muted">PendienteEstrellas</span>
                                <div>${promociones[key].porcentajeDescuento}</div>
                            </div>
                        </div>
                    </div>
                    <hr>`;
                }

                document.getElementById('promo').innerHTML = `<h5 class="text-center">Promociones</h5>
                <hr>
                ${grupoPromo}
                `;
                
                $('#mostrarTienda').modal('show');
                axios({
                    url:`../../Proyecto/backend/api/usuarioCliente.php?idCliente=${verificar}`,
                    method:"get",
                    }).then(res=>{
                        if(res.data.empresasFavs){
                            for(let key in res.data.empresasFavs){
                                if(res.data.empresasFavs[key].idEmpresa == idEmpresa){
                                    document.getElementById(idEmpresa).innerHTML =`
                                    <i class="fas fa-heart" style="color: red;font-size:1.5rem;"></i>
                                    `;
                                    console.log(res.data.empresasFavs[key].idEmpresa);
                                    
                                }
                            }
                        }
                        
                    }).catch(err=>{
                        console.error(err);
                })
            }).catch(err=>{
                console.error(err);
        })
    }else{
        $('#exampleModalCenter').modal('show');
    }
}

function empresaFav(idE){
    console.log(idE);
    let llave = getCookie("keyCliente");
    axios({
        url:`../../Proyecto/backend/api/usuarioEmpresa.php?idEmpresa=${idE}`,
        method:"get",
        }).then(res=>{
            document.getElementById(idE).innerHTML = '';
            document.getElementById(idE).innerHTML =`
            <i class="fas fa-heart" style="color: red;font-size:1.5rem;"></i>
            `;
            let datos = res.data;
            guardarFav(datos,llave,idE);
        }).catch(err=>{
            console.error(err);
    })
}

function guardarFav(datos,idC,idE){
    console.log(
        datos
    );
    axios({
        url:`../../Proyecto/backend/api/usuarioCliente.php?idCliente=${idC}`,
        method:"get",
        }).then(res=>{
            //document.getElementById(idE).innerHTML = '';
            let cliente = res.data;
            if(cliente.empresasFavs){
                for(let key in cliente.empresasFavs){
                    if(cliente.empresasFavs[key].idProducto == datos.idEmpresa){
                        console.log("El producto ya esta en favoritos");
                        return;
                    }
                }
                axios({
                    url:`../../Proyecto/backend/api/empresasFav.php?idCliente=${idC}&idEmpresa=${idE}`,
                    method:"post",
                    responseType:"json",
                    data:{
                        nombreEmpresa: datos.nombreEmpresa  ,
                        imgPerfil: datos.imgPerfil  ,
                        descripcion: datos.descripcion
                    }
                    }).then(res=>{
                        console.log(res.data);
                    }).catch(err=>{
                        console.error(err);
                })
            }else{
                axios({
                    url:`../../Proyecto/backend/api/empresasFav.php?idCliente=${idC}&idEmpresa=${idE}`,
                    method:"post",
                    responseType:"json",
                    data:{
                        nombreEmpresa: datos.nombreEmpresa  ,
                        imgPerfil: datos.imgPerfil  ,
                        descripcion: datos.descripcion
                    }
                    }).then(res=>{
                        console.log(res.data);
                    }).catch(err=>{
                        console.error(err);
                })
            }
            
        }).catch(err=>{
            console.error(err);
    })
}
function agregarCarrito(id1,id2){
    verificar = getCookie("keyCliente");
    if(verificar){
    let parametros;
        axios({
            url:`../../Proyecto/backend/api/categorias.php?idCategoria=${id2}`,
            method:"get",
            }).then(res=>{
                let categoria = res.data
                if(categoria.productos){
                    for(let key in categoria.productos){
                        if(key == id1){
                            parametros = categoria.productos[key];
                            guardarEnCarrito(parametros);
                        }
                    }
                }
            }).catch(err=>{
                console.error(err);
        })
    }else{
        $('#exampleModalCenter').modal('show');
    }
}

function guardarEnCarrito(datos){
    let llave = getCookie("keyCliente");
    axios({
        url:`../../Proyecto/backend/api/usuarioCliente.php?idCliente=${llave}`,
        method:"get",
        }).then(res=>{
            cliente = res.data;
            if(cliente.carroCompras){
                for(let key in cliente.carroCompras){
                    if(cliente.carroCompras[key].idProducto == datos.idProducto){
                        console.log("El producto ya existe en el carro de compras.");
                        return;
                    }
                }
                axios({
                    url:`../../Proyecto/backend/api/carroCompras.php?idCliente=${llave}`,
                    method:"post",
                    responseType:"json",
                    data:{
                        nombreProducto : datos.nombreProducto  ,
                        imgProducto : datos.imgProducto  ,
                        descripcion : datos.descripcion  ,
                        precioNormal : datos.precioNormal  ,
                        precioPromocion : datos.precioPromocion  ,
                        porcentajeDescuento : datos.porcentajeDescuento ,                     
                        idEmpresa : datos.idEmpresa,
                        idProducto : datos.idProducto
                    }
                    }).then(res=>{
                        document.getElementById('mensajeRespuesta').innerHTML = `
                        <h6>Producto guardado exitosamente en el carro de Compras.</h6>
                        `;
                        $('#guardado').modal('show');
                        //console.log("Guardado");
                    }).catch(err=>{
                        console.error(err);
                })
            }else{
                axios({
                    url:`../../Proyecto/backend/api/carroCompras.php?idCliente=${llave}`,
                    method:"post",
                    responseType:"json",
                    data:{
                        nombreProducto : datos.nombreProducto  ,
                        imgProducto : datos.imgProducto  ,
                        descripcion : datos.descripcion  ,
                        precioNormal : datos.precioNormal  ,
                        precioPromocion : datos.precioPromocion  ,
                        porcentajeDescuento : datos.porcentajeDescuento ,                     
                        idEmpresa : datos.idEmpresa,
                        idProducto : datos.idProducto
                    }
                    }).then(res=>{
                        document.getElementById('mensajeRespuesta').innerHTML = `
                        <h6>Producto guardado exitosamente en el carro de Compras.</h6>
                        `;
                        $('#guardado').modal('show');
                        //console.log("Guardado");
                    }).catch(err=>{
                        console.error(err);
                })
            }
            
        }).catch(err=>{
            console.error(err);
    })
}

function buscar(){
    window.location.href = "busquedas.html?"+document.getElementById('search-input1').value;
}
/*axios({
        url:`../../Proyecto/backend/api/categorias.php?idCategoria=${idCategoria}`,
        method:"get",
        }).then(res=>{
            categorias = res.data;
            
        }).catch(err=>{
            console.error(err);
        })*/


/*Validaciones LOGIN*/
var inputs =[
    {input:'email',valido:false},
    {input:'password',valido:false}
];

/**/

function login(){
    for(let i = 0 ; i < inputs.length ; i++)
        inputs[i].valido = validarCampoVacio(inputs[i].input);
    
    if(document.getElementById('email') != ''){
        let respuesta = validarEmail(document.getElementById('email').value);
        console.log(respuesta);
        
        inputs[1].valido = respuesta;
        colorearInput('email', respuesta);
    }       
    let listo = false;
    for(let i = 0 ; i < inputs.length ; i++){
        if(inputs[i].valido){
            listo = true;
        }else{
            listo = false;
            break;
        }
    }

    /*if(listo){
        window.location.href = "categorias.html";
    }*/
    let parametros = $("#form-login").serialize()
    console.log(parametros);
    
    axios({
        url:'../../Proyecto/backend/api/login.php',
        method:"post",
        responseType:"json",
        data:{
            email:document.getElementById('email').value,
            password:document.getElementById('password').value
        }
    }).then(res=>{
        console.log(res.data);
        if(res.data.codigoResultado == "cliente"){
            window.location.href = "principal.html";
        }else if(res.data.codigoResultado == "empresa"){
            window.location.href = "dashboard.php";
        }else if(res.data.codigoResultado == "admin"){
            window.location.href = "admin.php";
        }else{
            document.getElementById('mensajeInvalido').innerHTML = `<span style="background-color:#ff0000;">${res.data.mensaje}</span>`;
        }
    }).catch(err=>{
        console.error(err);
    })
}
function validarCampoVacio(id){
    let valorCampo = document.getElementById(id).value;
    let respuesta;
    if(valorCampo == ''){
        respuesta = false;
    }else{
        respuesta = true;
    }
    colorearInput(id,respuesta);
    return respuesta;
}

function colorearInput(id, respuesta){

    if (!respuesta){
        document.getElementById(id).classList.remove('is-valid');
        document.getElementById(id).classList.add('is-invalid');
    }else{ 
        document.getElementById(id).classList.remove('is-invalid');
        document.getElementById(id).classList.add('is-valid');
    }
}
function validarEmail(email){
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}