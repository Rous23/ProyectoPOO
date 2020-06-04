var URLsearch = window.location.search;
if(URLsearch.substr(0, 11) == '?idProducto'){
    var idProd = URLsearch.substr(12);
}
var miCodigoQR = new QRCode("codigoQR");
var producto;
var nombreC;
(()=>{
    axios({
    url:`../../Proyecto/backend/api/categorias.php?idProducto=${idProd}`,
    method:"get",
    }).then(res=>{
        producto = res.data;
        imprimirDatosProducto(producto);

    }).catch(err=>{
        console.error(err);
    })
})();

principalUsuarioLogin()
function principalUsuarioLogin(){
    let idC = getCookie("keyCliente");
    if(idC){
        axios({
            url:`../../Proyecto/backend/api/usuarioCliente.php?idCliente=${idC}`,
            method:"get",
            }).then(res=>{
                nombreC = res.data.nombreCompleto.split(" ")[0];
                document.getElementById('lista-navbar').innerHTML = '';
                document.getElementById('lista-navbar').innerHTML = `
                <li class="nav-item">
                    <a href="perfil-cliente.php" class="nav-link" role="button" style="color: #67397F;">Perfil</a>
                </li>
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
                        <hr style="margin-top: .3rem;">
                        <div class="text-center">
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
function imprimirDatosProducto(datosP){
    let grupoComentarios = '';
    //console.log(datosP);
    document.getElementById('informacionProd').innerHTML = `
    <div class="row no-gutters py-4 px-3">
        <div class="col-md-6 col-12">
            <img src="img/${datosP.imgProducto}" class="card-img img-thumbnail" style="width: 100%;">
        </div>
        <div class="col-md-6 col-12 py-4">
            <div class="descripcion-producto pl-3 py-2">
                <h3>${datosP.nombreProducto}</h3>
                <span>${datosP.descripcion}</span>
            </div>
            <div class="precios px-3 py-2" style="color: red;">
                <span id="precioActual"> L ${datosP.precioPromocion}</span>
                <span class="text-muted py-3"id="precioAntes" style="text-decoration: line-through;"> L ${datosP.precioNormal}</span>
            </div>
            <div class="px-3 py-2">
                <span>${datosP.porcentajeDescuento} Descuento</span>
            </div>
            <div class="px-3 pb-3">
                <div id="porcentajeEstrellas"></div>
                <form id="formEstrellas">
                <p id="estrellas" class="clasificacion">
                </p>
                </form>
            </div>
            <div class="py-2 text-center">
                <div class="px-2" style="display: inline-block;">
                    <a id="${idProd}" onclick="getProducto('${idProd}','${datosP.idCategoria}')" style="cursor:pointer;" role="button">
                        <i class="far fa-heart btn" style="color: red;font-size: 2rem;"></i>
                    </a>
                </div>
                <div class="px-2" style="display: inline-block;">
                    <a id="${idProd}" onclick="irPerfilEmpresa('${datosP.idEmpresa}')"style="cursor:pointer;" role="button">
                    <i id="tienda" class="fas fa-store btn" style="color: rgb(77, 170, 135);font-size: 2rem;"></i></a>
                </div>
                <div class="px-2" style="display: inline-block;">
                    <a id="${idProd}" onclick="agregarCarrito('${idProd}','${datosP.idCategoria}')" style="cursor:pointer;" role="button">
                    <i class="fas fa-shopping-cart btn" style="color: rgb(102, 57, 126);font-size: 2rem;"></i></a>
                </div>
            </div>
            <div>
            </div>
        </div>
    </div>
    `;
    if(datosP.cantidadEstrellas){
        let suma = 0;
        let count = 0;
        for(let key in datosP.cantidadEstrellas){
            suma = suma + parseInt(datosP.cantidadEstrellas[key]);
            count = count + 1;
        }
        let total = suma/count;
        document.getElementById('porcentajeEstrellas').innerHTML = `
        <span>${parseFloat(total.toFixed(2))} <label id="chk" for="radio1" style="font-size: 16px;color: orange;">★</label></span>
        `;
    }
        
    for(let i=5 ; i> 0 ; i--){
        document.getElementById('estrellas').innerHTML +=`
        <input onclick="estrellasPintadas(${i})" id="radio${i}" type="radio" name="estrellas" value="${i}">
        <label for="radio${i}">★</label>
        `;
    }
    for(let key in datosP.comentarios){
        grupoComentarios += `
        <div class="p-2 my-2" style="border: 1px solid rgba(0,0,0,.1);">
            <!--<img src="img/icono.png" style="max-width:2rem">-->
            <b><span>${datosP.comentarios[key].nombreCliente}</span></b>
            <span>${datosP.comentarios[key].contenidoComentario}</span>
        </div>
        `; 
    }
    document.getElementById('comentariosC').innerHTML = `
    <strong><h5>Comentarios</h5></strong>
    ${grupoComentarios}
    `;
    document.getElementById('postComm').innerHTML = `
    <button onclick="guardarComentario('${idProd}','${datosP.idCategoria}','${datosP.idEmpresa}','${datosP.idProducto}')" type="button" class="btn btn-outline-grad" style="border-color:rgb(102, 57, 126) ;color: rgb(102, 57, 126);"><i class="fas fa-comments"></i></button>
    `;
    mapaSucursales(datosP.sucursales);
    generarQR(`http://localhost/POO/Proyecto/frontend/producto.html?idProducto=${idProd}`);
}

function mapaSucursales(sucursales){
    if(sucursales){
        console.log(producto);
        
        axios({
            url:`../../Proyecto/backend/api/sucursal.php?idEmpresa=${producto.idEmpresa}`,
            method:"get"
            }).then(res=>{
                console.log(res);
                let sucursalesData = res.data;

                var map = L.map('map1').setView([51.505, -0.09], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);
                for(let i=0 ;i<sucursales.length; i++){
                    for(let key in sucursalesData){
                        if(key == sucursales[i]){
                            console.log("entro");
                            L.marker([sucursalesData[key].latitudSucursal,sucursalesData[key].longitudSucursal]).addTo(map)
                                .bindPopup(sucursalesData[key].nombreSucursal)
                                .openPopup();
                        }
                    }
                }
            }).catch(err=>{
                console.error(err);
        })
    }else{
        
    }
    
}
function generarQR(ruta){
    var cadena = ruta;
    miCodigoQR.makeCode(cadena);
    console.log(cadena);
    
}

function guardarComentario(idPC,idCat,idEmp,idPEmp){
    let keyCl = getCookie("keyCliente");

    if (document.getElementById('contenidoComm').value == ""){
        document.getElementById('contenidoComm').classList.remove('is-valid');
        document.getElementById('contenidoComm').classList.add('is-invalid');
        return;
    }else{ 
        document.getElementById('contenidoComm').classList.remove('is-invalid');
        document.getElementById('contenidoComm').classList.add('is-valid');
    }

    if(keyCl){
        axios({
            url:`../../Proyecto/backend/api/comentario.php?id1=${idPC}`,
            method:"post",
            responseType:"json",
            data:{
                nombreCliente: nombreC,
                contenidoComentario: document.getElementById('contenidoComm').value,
                idEmpresa: idEmp,
                idCliente: keyCl,
                idCategoria: idCat,
                idProductoEnEmpresa: idPEmp
            }
            }).then(res=>{
                //console.log(res.data);
                let contenido =document.getElementById('contenidoComm').value;
                anexarComentario(nombreC, contenido);
                
            }).catch(err=>{
                console.error(err);
        })
    }else{
        $('#exampleModalCenter').modal('show');
    }
}

function anexarComentario(nombre,contenido){
    document.getElementById('comentariosC').innerHTML += `
    <div class="p-2 my-2" style="border: 1px solid rgba(0,0,0,.1);">
        <!--<img src="img/icono.png" style="max-width:2rem">-->
        <b><span>${nombre}</span></b>
        <span>${contenido}</span>
    </div>
    `;
}

function getProducto(id1,id2){
    let cliente = getCookie("keyCliente");
    if(cliente){
        axios({
            url:`../../Proyecto/backend/api/categorias.php?idCategoria=${id2}&idProducto=${id1}`,
            method:"get",
            }).then(res=>{
                let prod = res.data
                productoFav(prod,id1,cliente);
                
            }).catch(err=>{
                console.error(err);
        })
    }else{
        $('#exampleModalCenter').modal('show');
    }
}
function productoFav(datos,id1,keyC){
    //console.log(datos);
    let parametros = getDatos(datos);
    axios({
        url:`../../Proyecto/backend/api/usuarioCliente.php?idCliente=${keyC}`,
        method:"get",
        }).then(res=>{
            cliente = res.data;
            //console.log(cliente);
            document.getElementById(id1).innerHTML = '';
            document.getElementById(id1).innerHTML =`
            <i class="fas fa-heart btn" style="color: red;font-size: 2rem;"></i>
            `;
            if(cliente.productosFavs){
                for(let key in cliente.productosFavs){
                    if(cliente.productosFavs[key].idProducto == datos.idProducto){
                        console.log("El producto ya esta en favoritos");
                        return;
                    }
                }
                guardarProducto(parametros,keyC);
            }else{
                guardarProducto(parametros,keyC);
            }
            
        }).catch(err=>{
            console.error(err);
    })
}

function guardarProducto(parametros,keyC){
    axios({
        url:`../../Proyecto/backend/api/productosCliente.php?idCliente=${keyC}`,
        method:"post",
        responseType:"json",
        data: parametros
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

function irPerfilEmpresa(idEmpresa){
    //console.log(idEmpresa);
    let cliente = getCookie("keyCliente");
    if(cliente){
        axios({
            url:`../../Proyecto/backend/api/usuarioEmpresa.php?idEmpresa=${idEmpresa}`,
            method:"get",
            }).then(res=>{
                //console.log(res.data.imgPerfil);
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
                        <a id="${idEmpresa}" onclick="getEmpresa('${idEmpresa}')" style="padding:5px!important;cursor:pointer;" role="button">
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
            }).catch(err=>{
                console.error(err);
        })
    }else{
        $('#exampleModalCenter').modal('show');
    }
}
function getEmpresa(idE){
    //console.log(idE);
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
            empresaFav(datos,llave,idE);
        }).catch(err=>{
            console.error(err);
    })
}

function empresaFav(datos,idC,idE){
    //console.log(datos);
    axios({
        url:`../../Proyecto/backend/api/usuarioCliente.php?idCliente=${idC}`,
        method:"get",
        }).then(res=>{
            let cliente = res.data;
            if(cliente.empresasFavs){
                for(let key in cliente.empresasFavs){
                    if(cliente.empresasFavs[key].idProducto == datos.idEmpresa){
                        console.log("El producto ya esta en favoritos");
                        return;
                    }
                }
                guardarEmpresa(datos,idC,idE);
            }else{
                guardarEmpresa(datos,idC,idE);
            }
            
        }).catch(err=>{
            console.error(err);
    })
}

function guardarEmpresa(datos,idC,idE){
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
            //console.log(res.data);
        }).catch(err=>{
            console.error(err);
    })
}

function agregarCarrito(id1,id2){
    let cliente = getCookie("keyCliente");
    if(cliente){
        axios({
            url:`../../Proyecto/backend/api/categorias.php?idCategoria=${id2}&idProducto=${id1}`,
            method:"get",
            }).then(res=>{
                let prod = res.data
                guardarEnCarrito(prod,id1);
            }).catch(err=>{
                console.error(err);
        })
    }else{
        $('#exampleModalCenter').modal('show');
    }
}

function guardarEnCarrito(datos,id1){
    let llave = getCookie("keyCliente");
    let parametros = getDatos(datos,id1);
    
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
                guardarDBCarro(parametros,llave);
            }else{
                guardarDBCarro(parametros,llave);
            }
            
        }).catch(err=>{
            console.error(err);
    })
}
function guardarDBCarro(parametros,llave){
    axios({
        url:`../../Proyecto/backend/api/carroCompras.php?idCliente=${llave}`,
        method:"post",
        responseType:"json",
        data: parametros
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

function getDatos(datos){
    result = {
        nombreProducto : datos.nombreProducto  ,
        imgProducto : datos.imgProducto  ,
        descripcion : datos.descripcion  ,
        precioNormal : datos.precioNormal  ,
        precioPromocion : datos.precioPromocion  ,
        porcentajeDescuento : datos.porcentajeDescuento ,                     
        idEmpresa : datos.idEmpresa,
        idProducto : idProd
    }
    return result;
}

function estrellasPintadas(indice){
    console.log(producto);
    let llave = getCookie("keyCliente");
    let idP = getCookie("idProducto");
    if(llave){
        axios({
            url:`../../Proyecto/backend/api/estrellas.php?idProd=${idP}&idCat=${producto.idCategoria}&idEmpresa=${producto.idEmpresa}`,
            method:"post",
            responseType:"json",
            data: {
                cantidad: indice,
                numUsuarios: llave
            }
            }).then(res=>{
                axios({
                    url:`../../Proyecto/backend/api/categorias.php?idProducto=${idP}`,
                    method:"get",
                    }).then(res=>{
                        let datosP = res.data;
                        if(datosP.cantidadEstrellas){
                            let suma = 0;
                            let count = 0;
                            for(let key in datosP.cantidadEstrellas){
                                suma = suma + parseInt(datosP.cantidadEstrellas[key]);
                                count = count + 1;
                            }
                            let total = suma/count;
                            document.getElementById('porcentajeEstrellas').innerHTML = `
                            <span>${parseFloat(total.toFixed(2))} <label id="chk" for="radio1" style="font-size: 16px;color: orange;">★</label></span>
                            `;
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

function buscar(){
    window.location.href = "busquedas.html?"+document.getElementById('search-input1').value;
}
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
    let parametros = $("#form-login").serialize();
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

/*function HTMLtoPDF(){
    var pdf = new jsPDF('p', 'pt', 'letter');
    source = $('#informacionProd')[0];
    console.log(source);
    
    specialElementHandlers = {
        '#bypassme': function(element, renderer){
            return true
        }
    }
    margins = {
        top: 30,
        left: 30,
        width: 100
    };
    pdf.fromHTML(
        source
        , margins.left
        , margins.top
        , {
            'width': margins.width
            , 'elementHandlers': specialElementHandlers
        },
        function (dispose) {
            pdf.save('productoLuxuary.pdf');
        }
    )		
}*/
/*function codigoQr(){

    axios({
        url:`../../Proyecto/backend/api/codigoQR.php`,
        method:"post",
        responseType:"json",
        data: `formData=http://localhost/POO/Proyecto/frontend/producto.html?idProducto=-M8lR7wOFs0p2_LAvRMT`
        }).then(res=>{
            console.log(res.data);
            
        }).catch(err=>{
            console.error(err);
    })
}
codigoQr();*/