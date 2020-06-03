var idCliente = getCookie("keyCliente");
var datosCliente;
(()=>{
    axios({
    url:`../../Proyecto/backend/api/usuarioCliente.php?idCliente=${idCliente}`,
    method:"get",
    }).then(res=>{
        //console.log(res.data);
        document.getElementById('nombreBarra').innerHTML = `${obtenerNombreCookie()}`;
        document.getElementById('nombreDropdown').innerHTML = `${res.data.nombreCompleto}`;
        document.getElementById('imgBarra').innerHTML = `
        <img src="Proyecto/${res.data.imgPerfil}" class="img-profile rounded-circle" style="width: 2rem; height: 2rem;">
        `;
        datosCliente = res.data
        mostrarInformacion(res.data);
        mostrarFavoritos(res.data);
            
    }).catch(err=>{
        console.error(err);
    })
})();

/*ObtenerKeyUsuario*/
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
/*ObtenerNombreUsuario*/
function obtenerNombreCookie(){
    let cookie = document.cookie.split(';');
    for(let i=0 ; i<cookie.length ; i++){
        cookie[i].split('=');
        let nombre = cookie[i].split('=')
        //console.log(key);
        if(nombre[0] == " nombreUsuario"){
            nombre = nombre[1].split('+');
            return nombre[0];
        }
    }
}

function mostrarInformacion(datos){
    document.getElementById('imagenBanner').style.backgroundImage = `url(Proyecto/${datos.imgBanner})`;
    document.getElementById('imagenBanner').innerHTML = `
    <div style="display:flex;float: right;">
        <span id="boton" class="pt-2 px-2">
        <button onclick="actualizarFotoBanner('${idCliente}','${datos.imgBanner}')" type="button" class="btn btn-sm btn-actualizar" data-toggle="modal" data-target="#myModal1"><i class="fas fa-camera-retro" style="font-size: 1.5rem;"></i> Actualizar Banner</button>
        </span>
    </div>
    `;
    document.getElementById('imagenPerfil').style.backgroundImage = `url(Proyecto/${datos.imgPerfil})`;
    document.getElementById('imagenPerfil').innerHTML = `
    <div style="display:flex;position:absolute;left:0px;right:0px;bottom:0px;" class="mt-auto"><span id="boton" class="pt-2 px-2 mx-auto">
    <button onclick="actualizarFotoPerfil('${idCliente}','${datos.imgPerfil}')" type="button" class="btn btn-sm btn-actualizar" data-toggle="modal" data-target="#myModal1"><i class="fas fa-camera-retro" style="font-size: 1.5rem;"></i> Actualizar</button></span></div>
    `;
    document.getElementById('informacion').innerHTML = '';
    document.getElementById('informacion').innerHTML = `
        <span style="font-size: 1.3rem;">${datos.nombreCompleto}</span>
        <hr style="margin-top: .5rem!important;">
        <div class="row">
            <div class="col-md-6 col-12">
                <div class="descripcion-cliente px-3">
                    <div>Correo: ${datos.email}</div>
                    <div>Genero: ${datos.genero}</div>
                </div>
            </div>
            <div class="col-md-6 col-12">
                <div class="ubicacion px-3">
                    <div>Pais: ${datos.pais}</div>
                    <div>Direccion: ${datos.direccion}</div>
                </div>
            </div>
        </div>
        <hr>
        <div class="text-center pb-3 px-2">
            <span>
            <button onclick="editarDatos('${idCliente}','${datos}')" type="button" class="btn px-3" data-toggle="modal" data-target="#myModal2" style="color: #66397E;border: 1px solid #66397E;border-radius: 0%!important;"><i class="fas fa-users-cog" style="font-size: 1.5rem;"></i> Configuración</button>
            </span>
        </div>
    `;
}

function actualizarFotoBanner(idCliente,urlfotoBanner){
    console.log(datosCliente);
    document.getElementById('fotos-modal').innerHTML = '';
    document.getElementById('fotos-modal').innerHTML = `
    <h5>Actualizar Banner</h5>
    <div class="container-fluid py-3" style="border: .5px solid rgb(232,232,232);padding: 5px!important;">
        <img src="Proyecto/${urlfotoBanner}" style="width: 100%; height: 150px;" alt="">
    </div>
    <div class="form-group my-2">
        <form id="imagenB" name="imagenB" method="post" enctype="multipart/form-data">
            <label for="exampleFormControlFile1">Añadir o cambiar imagen.</label>
            <input type="file" class="form-control-file" name="controlFile" id="controlFileBanner" accept="image/x-png,image/gif,image/jpeg,image/png">
        </form>
    </div>
    `;
    document.getElementById('modal-footer').innerHTML = ''
    document.getElementById('modal-footer').innerHTML = `<button onclick="guardarImagen('imagenB')" type="button" class="btn btn-grad" data-dismiss="modal">Guardar</button>`;
}

function actualizarFotoPerfil(idCliente,urlfotoPerfil){
    document.getElementById('fotos-modal').innerHTML = ''
    document.getElementById('fotos-modal').innerHTML =`
    <h5>Actualizar Foto Perfil</h5>
    <div class="my-3">
        <img src="Proyecto/${urlfotoPerfil}" class="rounded-circle img-thumbnail" style="width: 30%; height: 30%;" alt="">
    </div>
    <div class="form-group py-2">
        <form id="imagenP" name="imagenP" method="post" enctype="multipart/form-data">
            <label for="exampleFormControlFile1">Añadir o cambiar imagen de perfil.</label>
            <input type="file" class="form-control-file" name="controlFile" id="controlFilePerfil">
        </form>
    </div>
    `;
    document.getElementById('modal-footer').innerHTML = ''
    document.getElementById('modal-footer').innerHTML = `<button onclick="guardarImagen('imagenP')" type="button" class="btn btn-grad" data-dismiss="modal">Guardar</button>`;
    
}

function guardarImagen(id){
    var frm = $('#'+id);
    var formData = new FormData(frm[0]);
    axios({
        url:`../../Proyecto/backend/api/subirImagenCliente.php`,
        method:"post",
        data:formData
        }).then(res=>{
            if(id == "imagenB"){
                var actualizarUser = 
                `nombreCompleto=${datosCliente.nombreCompleto}&imgBanner=${res.data}&imgPerfil=${datosCliente.imgPerfil}&email=${datosCliente.email}&password=${datosCliente.password}&direccion=${datosCliente.direccion}&pais=${datosCliente.pais}&genero=${datosCliente.genero}&numTarjeta=${datosCliente.tarjeta.numTarjeta}&vencimientoTarjeta=${datosCliente.tarjeta.vencimientoTarjeta}&cvv=${datosCliente.tarjeta.cvv}`;
            }else{
                var actualizarUser = 
                `nombreCompleto=${datosCliente.nombreCompleto}&imgBanner=${datosCliente.imgBanner}&imgPerfil=${res.data}&email=${datosCliente.email}&password=${datosCliente.password}&direccion=${datosCliente.direccion}&pais=${datosCliente.pais}&genero=${datosCliente.genero}&numTarjeta=${datosCliente.tarjeta.numTarjeta}&vencimientoTarjeta=${datosCliente.tarjeta.vencimientoTarjeta}&cvv=${datosCliente.tarjeta.cvv}`;
            }
            
            axios({
                url:`../../Proyecto/backend/api/usuarioCliente.php?idCliente=${idCliente}`,
                method:"put",
                responseType: 'json',
                data:actualizarUser
                }).then(res=>{
                    datosCliente = res.data;
                    document.getElementById('imgBarra').innerHTML ='';
                    document.getElementById('imgBarra').innerHTML = `
                    <img src="Proyecto/${res.data.imgPerfil}" class="img-profile rounded-circle" style="width: 2rem; height: 2rem;">
                    `;
                    mostrarInformacion(res.data);
                }).catch(err=>{
                    console.error(err);
            })

        }).catch(err=>{
            console.error(err);
    })
}

function mostrarFavoritos(datos){
    promFavoritos = datos.productosFavs;
    empresasFavoritas = datos.empresasFavs;
    document.getElementById('prod-favoritos').innerHTML = "";
    document.getElementById('prod-favoritos').innerHTML = `
    <div><h5 class="text-center pt-3">Productos Favoritos</h5></div><hr>
    `;
    if(promFavoritos){
        for (let key in promFavoritos) {
            document.getElementById('prod-favoritos').innerHTML += `
            <div class="px-2 py-2">    
                <div class="card px-1">
                    <div class="row no-gutters py-3">
                        <div class="col-4">
                        <img src="img/${promFavoritos[key].imgProducto}" class="card-img img-thumbnail" style="width: 100%; height: 100px;">
                        </div>
                        <div class="col-8">
                            <div class="descripcion-producto pl-3">
                                <span>${promFavoritos[key].nombreProducto}</span><br>
                                <small>${promFavoritos[key].descripcion}</small>
                            </div>
                            <div class="precios px-3" style="color: red;">
                                <span id="precioActual"> L ${promFavoritos[key].precioNormal}</span>
                                <span class="text-muted"id="precioAntes" style="text-decoration: line-through;"> L ${promFavoritos[key].precioPromocion}</span>
                            </div>
                            <div class="px-3">
                                <span>${promFavoritos[key].porcentajeDescuento}</span>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            `;
        }
    }else{
        document.getElementById('prod-favoritos').innerHTML += `
        <div class="container-fluid">
            <div class="text-center py-5">
                <div class="text-muted">
                    <i class="fas fa-hand-holding-heart" style="font-size: 100px;color: rgba(255, 0, 0, 0.3);padding-bottom: 0px;"></i>
                    <p class="py-3">Aun no tienes productos Favoritos.</p>
                </div>
            </div>
        </div>
        `;
    }
    mostrarEmpresasFavoritas(empresasFavoritas)
}

function mostrarEmpresasFavoritas(empresas){
    document.getElementById('empresas-favoritas').innerHTML = "";
    document.getElementById('empresas-favoritas').innerHTML = `
    <div><h5 class="text-center pt-3">Tiendas Favoritas</h5></div><hr>
    `;
    if(empresas){
        console.log(empresas);
        
        let datosEmpresas;
        for (let key in empresas){
            datosEmpresas = `
            <div class="col-lg-4 col-6 pb-2" style="padding-left: 10px!important;padding-right: 10px!important;">
                <div class="card-tienda pt-2">
                    <img src="img/${empresas[key].imgPerfil}" class="rounded-circle img-thumbnail" style="max-width: 60px"> 
                    <h6 style="display:block">${empresas[key].nombreEmpresa}</h6>
                    <hr>
                    <div id="descripcion-tienda" class="px-1">${empresas[key].descripcion}</div>
                    <button onclick="imprimirPerfilEmpresa('${empresas[key].idEmpresa}')" class="btn btn-grad my-3">Ir a la tienda</button>
                </div>
            </div>
            `;
        }
        document.getElementById('empresas-favoritas').innerHTML += `<div class="row px-3">${datosEmpresas}</div>`;
    }else{
        document.getElementById('empresas-favoritas').innerHTML += `
        <div class="row px-3">
            <div class="col-12 text-center">
                <div class="text-center py-5">
                    <div class="text-muted">
                        <i class="fas fa-heart" style="font-size: 100px;color: rgba(255, 0, 0, 0.575);padding-bottom: 0px;"></i>
                        <i class="far fa-heart" style="font-size: 100px;color: rgba(255, 0, 0, 0.3);padding-bottom: 0px;"></i>
                        <p class="py-3">Aun no tienes Tiendas Favoritas.</p>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}

function editarDatos(idCliente){
    axios({
        url:`../../Proyecto/backend/api/usuarioCliente.php?idCliente=${idCliente}`,
        method:"get",
        }).then(res=>{
            cliente = res.data;
            console.log(cliente);
            password = cliente.password;
            console.log(password);
            document.getElementById('nombreCompleto').value = cliente.nombreCompleto;
            document.getElementById('email').value = cliente.email;
            document.getElementById('password').value = cliente.password;
            document.getElementById('direccion').value = cliente.direccion;
            document.getElementById('pais').value = cliente.pais;
            document.getElementById('numTarjeta').value = cliente.tarjeta.numTarjeta;
            document.getElementById('vencimientoTarjeta').value = cliente.tarjeta.vencimientoTarjeta;
            document.getElementById('cvv').value = cliente.tarjeta.cvv;
            document.getElementById('form-imagenBanner').value = cliente.imgBanner,
            document.getElementById('form-imagenPerfil').value = cliente.imgPerfil,
            document.getElementById('genero').value = cliente.genero
        }).catch(err=>{
            console.error(err);
        })
}
var inputs =[
    {input:'nombreCompleto'},
    {input:'email'},
    {input:'direccion'},
    {input:'password'},
    {input:'pais'},
    {input:'numTarjeta'},
    {input:'vencimientoTarjeta'},
    {input:'cvv'}
];

function actualizarCliente(){
    if(document.getElementById('password').value != ""){
        if(document.getElementById('password').value == document.getElementById('password2').value){
            var contraseña = document.getElementById('password').value;
        }else{
            var contraseña = datosCliente.password;
        }
    }else{
        var contraseña = datosCliente.password;
    }
    let parametros = $('#forms').serialize();
    console.log(parametros);
    
    axios({
        url:`../../Proyecto/backend/api/usuarioCliente.php?idCliente=${idCliente}`,
        method:"put",
        responseType:'json',
        data: parametros
        }).then(res=>{
            datosCliente = res.data;
            mostrarInformacion(datosCliente);
        }).catch(err=>{
            console.error(err);
    })
}
function imprimirPerfilEmpresa(idEmpresa){
    axios({
        url:`../../Proyecto/backend/api/usuarioEmpresa.php?idEmpresa=${idEmpresa}`,
        method:"get",
        }).then(res=>{
            //console.log(res.data);
            let promociones = res.data.promociones;
            document.getElementById('contenedorImagenesModalE').innerHTML = `
            <div class="contenedor-perfil-cliente">
                <div id="imagenBannerEmpresa" style="background-color: rgba(0,0,0,.2);">
                    <img class="contenedor-banner" src="Proyecto/${res.data.imgBanner}" style="width: 100%; height: 300px;">
                </div>
                <div id="imagenPerfilEmpresa" class="img-perfil">
                    <img class="rounded-circle img-thumbnail" src="Proyecto/${res.data.imgPerfil}" style="width: 100%;">
                </div>
                <span id="botonLike" class="mt-auto mx-3 mb-2" style="float: rigth;">
                    <a id="${idEmpresa}" onclick="empresaFav('${idEmpresa}')" style="padding:5px!important;cursor:pointer;" role="button">
                        <i class="far fa-heart" style="color: red;font-size:1.5rem;"></i>
                    </a>
                </spa>
            </div>
            `;
            document.getElementById('informacionModalE').innerHTML = `
            <span class="px-3" style="font-size: 1.3rem;">${res.data.nombreEmpresa}</span>
            <hr style="margin-top: .5rem!important;">
            <div>Correo: ${res.data.email}</div>
            <div>Descripcion: ${res.data.descripcion}</div>
            <div>Pais: ${res.data.pais}</div>
            <div>Direccion: ${res.data.direccion}</div>
            `;

            if(promociones){
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
                }else{
                    document.getElementById('promo').innerHTML = `
                    <div class=" text-center"><h5 class="text-center pt-3">Promociones</h5></div>
                    <hr>
                    <div class="container-fluid">
                        <div class="text-center py-5">
                            <div class="text-muted">
                                <i class="fas fa-percent" style="font-size: 100px;color: rgba(103, 57, 127, .7);padding-bottom: 0px;"></i>
                                <p class="py-3">Aun no hay promociones.</p>
                            </div>
                        </div>
                    </div>
                    <hr>`;
                }
                $('#mostrarTienda').modal('show');
                axios({
                    url:`../../Proyecto/backend/api/usuarioCliente.php?idCliente=${idCliente}`,
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
}