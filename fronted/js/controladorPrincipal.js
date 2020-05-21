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
principalUsuarioLogin();
function principalUsuarioLogin(){
    let valorCookie = obtenerValorCookie();
    if(valorCookie){
        document.getElementById('lista-navbar').innerHTML = '';
        document.getElementById('lista-navbar').innerHTML = `
        <li class="nav-item">
            <a href="perfil-cliente.html" class="nav-link" role="button" style="color: #67397F;">Perfil</a>
        </li>
        <li class="nav-item dropdown no-arrow mx-1">
            <a href="#" class="nav-link" role="button">
                <span><i class="fas fa-shopping-cart" style="color: #67397F;"></i></span> 
            </a>
        </li>
        <li class="nav-item dropdown no-arrow" >
            <a href="#" class="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color: #67397F;"> 
                <img src="img/perfil.jpg" class="img-profile rounded-circle" style="width: 2rem; height: 2rem;">
                <span class="mr-2 d-none d-lg-inline">${valorCookie}</span>
            </a>
            <div class="dropdown-menu dropdown-menu-right">
                <div class="text-center">${valorCookie}</div>
                <hr style="margin-top: .3rem;">
                <div class="text-center">
                    <a href="logout.html">
                    <i class="fas fa-sign-out-alt" style="color: rgba(144, 142, 143, .8)"></i>
                    <span>Cerrar Sesion</span>
                    </a>
                </div>
            </div>    
        </li>
        `;
    }
}

/*ObtenerNombreUsuario*/
function obtenerValorCookie(){
    let cookie = document.cookie.split(';');
    for(let i=0 ; i<cookie.length ; i++){
        cookie[i].split('=');
        let nombreUsuarioCookie = cookie[i].split('=')
        //console.log(nombreUsuarioCookie);
        if(nombreUsuarioCookie[0] == " nombreUsuario"){
            nombrePerfil = nombreUsuarioCookie[1].split('+');
            return nombrePerfil[0];
        }
        //console.log(cookie[i].split('='));
    }
    //console.log(cookie);
}

function generarCategoria(categorias){
    for (let indice in categorias) {
        //console.log("indice" + indice);
        document.getElementById('card-categorias').innerHTML += `
        <div class="col-lg-2 col-md-3 col-4 py-1">
            <div onclick="llenarSidebar('${indice}')" class="card" style="cursor: pointer;">
                <div>
                    <img src= ${categorias[indice].imgCategoria} class="d-block w-100 tamaño-img card-img-top" style="height: 170px">
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
                lista += `
                <li onclick="mostrarProductos('${indice}')" style="cursor:pointer;" class="nav-item">
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
function imprimirProductos(idCategoria){
    //console.log(idCategoria);
    axios({
        url:`../../Proyecto/backend/api/categorias.php?idCategoria=${idCategoria}`,
        method:"get",
        }).then(res=>{
            //console.log(res.data);
            let productos = '';
            let grupoProductos = res.data.productos;
            for (let indice in grupoProductos){
                productos += `
                <div class="col-lg-3 col-sm-4 col-6 px-1 py-1">
                    <div id="${indice}" class="card shadow-sm">
                        <div onclick="detallesProducto('${indice}','${idCategoria}')" style="cursor:pointer">
                            <img src="img/${grupoProductos[indice].imgProducto}" class="card-img-top" style="height:180px;">
                            <div class="card-body" style="padding: .5rem!important;">
                                <h6 class="card-title">${grupoProductos[indice].nombreProducto}</h6>
                                <span>${grupoProductos[indice].porcentajeDescuento}</span>
                                <div class="precios" style="color: red;">
                                <span id="precioActual">L ${grupoProductos[indice].precioNormal}</span>
                                <span class="text-muted"id="precioAntes" style="text-decoration: line-through;"> L ${grupoProductos[indice].precioPromocion}</span>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer text-center" style="padding: .2rem .5rem!important;">
                            <button onclick="guardarProductoFav('${indice}')" class="btn btn-grad btn-sm" style="padding:5px!important" type="button">
                            <i class="fas fa-heart"></i></button>
                            <button onclick="irPerfilEmpresa(${grupoProductos[indice].idEmpresa})" class="btn btn-grad btn-sm" style="padding:5px!important" type="button">
                            <i class="fas fa-store"></i></button>
                            <button onclick="agregarCarrito('${indice}','${idCategoria}')"class="btn btn-grad btn-sm" style="padding:5px!important" type="button">
                            <i class="fas fa-shopping-cart"></i></button>
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
                    document.getElementById('mostrarSubCategoria').innerHTML += `
                    <div class="col-lg-3 col-md-4 col-6 px-1 py-1">
                        <div onclick="detallesProducto('${indice}','${idCategoria}')" id="${indice}" class="card shadow-sm" style="cursor:pointer">
                            <img src="img/${grupoProductos[indice].imgProducto}" class="card-img-top" style="height:180px;">
                            <div class="card-body" style="padding: .5rem!important;">
                                <h6 class="card-title">${grupoProductos[indice].nombreProducto}</h6>
                                <span>${grupoProductos[indice].porcentajeDescuento}</span>
                                <div class="precios" style="color: red;">
                                <span id="precioActual">L ${grupoProductos[indice].precioNormal}</span>
                                <span class="text-muted"id="precioAntes" style="text-decoration: line-through;"> L ${grupoProductos[indice].precioPromocion}</span>
                                </div>
                            </div>
                            <div class="card-footer" style="padding: .2rem .5rem!important;">
                                <p class="card-text">${grupoProductos[indice].porcentajeDescuento}</p>
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
                        console.log(productos[indice]);
                        document.cookie = `idProducto=${idProducto}`;
                        //document.cookie = `username=${indice}; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/`;
                        console.log(document.cookie);
                        window.location.href = `producto.html`;//?${idProducto}
                    }
                }
            }
            
        }).catch(err=>{
            console.error(err);
    })
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
    {input:'contraseña',valido:false}
];

function login(){
    console.log('hola');
    
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
        window.location.href = "principal.html";
    }*/
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