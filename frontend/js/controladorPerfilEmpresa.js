var idEmpresa = getCookie("keyEmpresa");
var datosEmpresa;
(()=>{
    axios({
    url:`../../Proyecto/backend/api/usuarioEmpresa.php?idEmpresa=${idEmpresa}`,
    method:"get",
    }).then(res=>{
        //console.log(res.data);
        datosEmpresa = res.data;
        document.getElementById('nombreBarraE').innerHTML = `${res.data.nombreEmpresa}`;
        document.getElementById('nombreDropdownE').innerHTML = `${res.data.nombreEmpresa}`;
        document.getElementById('imgBarraE').innerHTML = `
        <img src="Proyecto/${res.data.imgPerfil}" class="img-profile rounded-circle" style="width: 2rem; height: 2rem;">
        `;
        imprimirEmpresa(res.data);
        imprimirProductosPromociones(res.data.productos,res.data.promociones);
        //mostrarFavoritos();
        
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

/**/
function imprimirEmpresa(empresa){
    document.getElementById('imagenBanner').style.backgroundImage = `url(img/${empresa.imgBanner})`;
    document.getElementById('imagenBanner').innerHTML = `
    <div style="display:flex;float: right;">
        <span id="boton" class="pt-2 px-2">
        <button onclick="actualizarFotoBanner('${empresa.imgBanner}')" type="button" class="btn btn-sm btn-actualizar" data-toggle="modal" data-target="#actualizarFotos"><i class="fas fa-camera-retro" style="font-size: 1.5rem;"></i> Actualizar Banner</button>
        </span>
    </div>
    `;
    document.getElementById('imagenPerfil').style.backgroundImage = `url(Proyecto/${empresa.imgPerfil})`;
    document.getElementById('imagenPerfil').innerHTML = `
    <div style="display:flex;position:absolute;left:0px;right:0px;bottom:0px;" class="mt-auto"><span id="boton" class="pt-2 px-2 mx-auto">
    <button onclick="actualizarFotoPerfil('${empresa.imgPerfil}')" type="button" class="btn btn-sm btn-actualizar" data-toggle="modal" data-target="#actualizarFotos"><i class="fas fa-camera-retro" style="font-size: 1.5rem;"></i> Actualizar</button></span></div>
    `;
    document.getElementById('informacionEmpresarial').innerHTML = `
    <span class="px-3" style="font-size: 1.3rem;">${empresa.nombreEmpresa}</span>
    <hr style="margin-top: .5rem!important;">
    <div class="row">
        <div class="col-md-6 col-12">
            <div id="descripcion-empresa" class="px-3">
                <div>Correo: ${empresa.email}</div>
                <div>Descripcion: ${empresa.descripcion}</div>
            </div>
        </div>
        <div class="col-md-6 col-12">
            <div id="ubicacion" class="px-3">
                <div>Pais: ${empresa.pais}</div>
                <div>Direccion: ${empresa.direccion}</div>
            </div>
        </div>
    </div>
    `;

    imprimirUbicacion(empresa);
}

function imprimirUbicacion(empresa){
    let map = L.map('map1').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    L.marker([empresa.latitud,empresa.longitud]).addTo(map)
        .bindPopup(empresa.nombreEmpresa)
        .openPopup();

    if(empresa.sucursales){
        //console.log(empresa.sucursales)
        document.getElementById('sucursalesEmpresa').innerHTML = '';
        let lista = '';
        for (let key in empresa.sucursales){
            lista += `
                <li class="nav-item">
                    <a onclick="mostrarSucursal('${key}')" class="nav-link" style="cursor:pointer">
                        <span>${empresa.sucursales[key].nombreSucursal}</span>
                    </a>
                </li>            
            `;
            L.marker([empresa.sucursales[key].latitudSucursal,empresa.sucursales[key].longitudSucursal]).addTo(map)
                .bindPopup(empresa.sucursales[key].nombreSucursal)
                .openPopup();
        }
        document.getElementById('sucursalesEmpresa').innerHTML = `
        <span>Sucursales</span>
        <div>
            <ul class="list-unstyled">${lista}</ul>
        </div>
        
        `;
    }
    document.getElementById('redesEmpresa').innerHTML = '';
    document.getElementById('redesEmpresa').innerHTML = `
    <span>Redes Sociales</span>
        <div>
            <ul class="list-unstyled">
                <li class="nav-item">
                    <a href="#" class="nav-link">
                        <span>${empresa.redes.facebook}</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link">
                        <span>${empresa.redes.instagram}</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link">
                        <span>${empresa.redes.twitter}</span>
                    </a>
                </li>
            </ul>
        </div>
    `;
}

function actualizarFotoBanner(urlfotoBanner){
    document.getElementById('modal-empresa').innerHTML = '';
    document.getElementById('modal-empresa').innerHTML = `
    <h5>Actualizar Banner</h5>
    <div class="container-fluid py-3" style="border: .5px solid rgb(232,232,232);padding: 5px!important;">
        <img src="Proyecto/${urlfotoBanner}" style="width: 100%; height: 150px;" alt="">
    </div>
    <div class="form-group my-2">
        <form id="imagenB" name="imagenB" method="post" enctype="multipart/form-data">
            <label for="exampleFormControlFile1">Añadir o cambiar imagen.</label>
            <input type="file" class="form-control-file" name="controlFileE" id="controlFileBanner" accept="image/x-png,image/gif,image/jpeg,image/png">
        </form>
    </div>
    `;
    document.getElementById('footer-modal').innerHTML = ''
    document.getElementById('footer-modal').innerHTML = `<button onclick="guardarImagen('imagenB')" type="button" class="btn btn-grad" data-dismiss="modal">Guardar</button>`;
}

function actualizarFotoPerfil(urlfotoPerfil){
    document.getElementById('modal-empresa').innerHTML = ''
    document.getElementById('modal-empresa').innerHTML =`
    <h5>Actualizar Foto Perfil</h5>
    <div class="my-3">
        <img src="Proyecto/${urlfotoPerfil}" class="rounded-circle img-thumbnail" style="width: 30%; height: 30%;" alt="">
    </div>
    <div class="form-group py-2">
        <form id="imagenP" name="imagenP" method="post" enctype="multipart/form-data">
            <label for="exampleFormControlFile1">Añadir o cambiar imagen de perfil.</label>
            <input type="file" class="form-control-file" name="controlFileE" id="controlFilePerfil">
        </form>
    </div>
    `;
    document.getElementById('footer-modal').innerHTML = ''
    document.getElementById('footer-modal').innerHTML = `<button onclick="guardarImagen('imagenP')" type="button" class="btn btn-grad" data-dismiss="modal">Guardar</button>`;
    
}

function guardarImagen(id){
    var frm = $('#'+id);
    var formData = new FormData(frm[0]);
    axios({
        url:`../../Proyecto/backend/api/subirImagenEmpresa.php`,
        method:"post",
        data:formData
        }).then(res=>{
            if(id == "imagenB"){
                var actualizarEmpresa = 
                `nombreEmpresa=${datosEmpresa.nombreEmpresa}&imgBanner=${res.data}&imgPerfil=${datosEmpresa.imgPerfil}&email=${datosEmpresa.email}&password=${datosEmpresa.password}&descripcion=${datosEmpresa.descripcion}&direccion=${datosEmpresa.direccion}&genero=${datosEmpresa.genero}&facebook=${datosEmpresa.redes.facebook}&instagram=${datosEmpresa.redes.instagram}&twitter=${datosEmpresa.redes.twitter}&latitud=${datosEmpresa.latitud}&longitud=${datosEmpresa.longitud}&pais=${datosEmpresa.pais}&numTarjeta=${datosEmpresa.tarjeta.numTarjeta}&vencimientoTarjeta=${datosEmpresa.tarjeta.vencimientoTarjeta}&cvv=${datosEmpresa.tarjeta.cvv}&plan=${datosEmpresa.plan}`;
            }else{
                var actualizarEmpresa = 
                `nombreEmpresa=${datosEmpresa.nombreEmpresa}&imgBanner=${datosEmpresa.imgBanner}&imgPerfil=${res.data}&email=${datosEmpresa.email}&password=${datosEmpresa.password}&descripcion=${datosEmpresa.descripcion}&direccion=${datosEmpresa.direccion}&genero=${datosEmpresa.genero}&facebook=${datosEmpresa.redes.facebook}&instagram=${datosEmpresa.redes.instagram}&twitter=${datosEmpresa.redes.twitter}&latitud=${datosEmpresa.latitud}&longitud=${datosEmpresa.longitud}&pais=${datosEmpresa.pais}&numTarjeta=${datosEmpresa.tarjeta.numTarjeta}&vencimientoTarjeta=${datosEmpresa.tarjeta.vencimientoTarjeta}&cvv=${datosEmpresa.tarjeta.cvv}&plan=${datosEmpresa.plan}`;
            }
            axios({
                url:`../../Proyecto/backend/api/usuarioEmpresa.php?idEmpresa=${idEmpresa}`,
                method:"put",
                responseType: 'json',
                data:actualizarEmpresa
                }).then(res=>{
                    datosEmpresa = res.data;
                    document.getElementById('imgBarraE').innerHTML = `
                    <img src="Proyecto/${datosEmpresa.imgPerfil}" class="img-profile rounded-circle" style="width: 2rem; height: 2rem;">
                    `;
                    imprimirEmpresa(res.data);
                }).catch(err=>{
                    console.error(err);
            })
        }).catch(err=>{
            console.error(err);
    })
}
function imprimirProductosPromociones(productos,promociones){
    productosEmpresa(productos);
    promocionesEmpresa(promociones);
}

function productosEmpresa(productos){
    document.getElementById('productosEmpresa').innerHTML = '';
    if(productos){
        let tablaProductos = '';
        for(let key in productos){
            tablaProductos += `
            <div id="${key}" class="row no-gutters px-2"  onclick="mostrarProducto('${key}')">
                <div class="col-4">
                <img src="img/${productos[key].imgProducto}" class="card-img img-thumbnail" style="width: 100%; height: 100%">
                </div>
                <div class="col-8">
                    <div class="descripcion-producto pl-3">
                        <span>${productos[key].nombreProducto}</span><br>
                        <small>${productos[key].descripcion}</small>
                    </div>
                    <div class="precios px-3">
                        <span id="precioAntes"> L ${productos[key].precioNormal}</span>
                    </div>
                </div>
            </div>
            <hr>
            `;
        }
        document.getElementById('productosEmpresa').innerHTML = `
        <div><h5 class="text-center pt-3">Productos</h5></div><hr>
        ${tablaProductos}`;
    }else{
        document.getElementById('productosEmpresa').innerHTML = `
        <div><h5 class="text-center pt-3">Productos</h5></div><hr>
        <div class="container-fluid">
            <div class="text-center py-5">
                <div class="text-muted">
                    <i class="fas fa-tags" style="font-size: 100px;color:rgba(103, 57, 127, .7);padding-bottom: 0px;"></i>
                    <p class="py-3">Aun no tienes productos.</p>
                </div>
            </div>
        </div>
        <hr>`;
    }
}

function promocionesEmpresa(promociones){
    document.getElementById('promocionesEmpresa').innerHTML = '';
    if(promociones){
        let tablaPromociones = '';
        for(let key in promociones){
            tablaPromociones += `
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
                        <div>${promociones[key].porcentajeDescuento}</div>
                    </div>
                </div>
            </div>
            <hr>
            `;
        }
        document.getElementById('promocionesEmpresa').innerHTML = `
        <div class=" text-center"><h5 class="text-center pt-3">Promociones</h5></div>
        <hr>
        ${tablaPromociones}`;
    }else{
        document.getElementById('promocionesEmpresa').innerHTML = `
        <div class=" text-center"><h5 class="text-center pt-3">Promociones</h5></div>
        <hr>
        <div class="container-fluid">
            <div class="text-center py-5">
                <div class="text-muted">
                    <i class="fas fa-percent" style="font-size: 100px;color: rgba(103, 57, 127, .7);padding-bottom: 0px;"></i>
                    <p class="py-3">Aun no tienes promociones.</p>
                </div>
            </div>
        </div>
        <hr>`;
    }
}

function mostrarSucursal(idS){
    axios({
        url:`../../Proyecto/backend/api/sucursal.php?idEmpresa=${idEmpresa}&idSucursal=${idS}`,
        method:"get",
        }).then(res=>{
            console.log(res.data);
            document.getElementById('informacion').innerHTML ='';
            document.getElementById('informacion').innerHTML = `
            <span class="px-3" style="font-size: 1.3rem;">${res.data.nombreSucursal}</span>
            <hr style="margin-top: .5rem!important;">
            <div>Correo: ${res.data.emailSucursal}</div>
            <hr style="margin-top: .5rem!important;">
            <div>Telefono: ${res.data.telefonoSucursal}</div>
            <hr style="margin-top: .5rem!important;">
            <div>Direccion: ${res.data.direccionSucursal}</div>
            <hr style="margin-top: .5rem!important;">
            <div>Ubicacion en el mapa</div>
            <div id="map${idS}" style="width:100%;height:350px;"></div>
            `;
            document.getElementById(`map${idS}`).innerHTML ='';
            let map = L.map(`map${idS}`).setView([51.505, -0.09], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            L.marker([res.data.latitudSucursal,res.data.longitudSucursal]).addTo(map)
                .bindPopup(res.data.nombreSucursal)
                .openPopup();

            $('#mostrarSucursal').modal('show');

        }).catch(err=>{
            console.error(err);
    })
}