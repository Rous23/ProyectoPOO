var idCliente = obtenerKey();
(()=>{
    axios({
    url:'../../Proyecto/backend/api/usuarioCliente.php',
    method:"get",
    }).then(res=>{
        console.log(res.data);
        
        console.log(idCliente);
        for (let key in res.data) {
            if (key == idCliente) {
                //console.log("correcto "+key+" "+idCliente);
                console.log(res.data[key]);
                mostrarInformacion(res.data[key]);
                mostrarFavoritos(res.data[key]);
            }
        }
    }).catch(err=>{
        console.error(err);
    })
})();

/*ObtenerKeyUsuario*/
function obtenerKey(){
    let cookie = document.cookie.split(';');
    for(let i=0 ; i<cookie.length ; i++){
        cookie[i].split('=');
        let key = cookie[i].split('=')
        //console.log(key);
        if(key[0] == "key"){
            miKey = key[1].split('+');
            return miKey[0];
        }
    }
}

function mostrarInformacion(datos){
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
            <button onclick="editarDatos('${idCliente}')" type="button" class="btn px-3" data-toggle="modal" data-target="#myModal2" style="color: #66397E;border: 1px solid #66397E;border-radius: 0%!important;"><i class="fas fa-users-cog" style="font-size: 1.5rem;"></i> Configuración</button>
            </span>
        </div>
    `;
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
            <div class="container-fluid">
                <div class="row no-gutters">
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
            <hr>
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
            document.getElementById('nombreCompleto').value = cliente.nombreCompleto;
            document.getElementById('email').value = cliente.email;
            document.getElementById('contraseña').value = cliente.password;
            document.getElementById('direccion').value = cliente.direccion;
            document.getElementById('pais').value = cliente.pais;
            document.getElementById('numeroTarjeta').value = cliente.tarjeta.numTarjeta;
            document.getElementById('vencimiento').value = cliente.tarjeta.vencimientoTarjeta;
            document.getElementById('cvv').value = cliente.tarjeta.cvv;
        }).catch(err=>{
            console.error(err);
        })
}
