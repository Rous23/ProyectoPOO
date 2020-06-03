var idEmpresa = getCookie("keyEmpresa");
(()=>{
    axios({
    url:`../../Proyecto/backend/api/usuarioEmpresa.php?idEmpresa=${idEmpresa}`,
    method:"get",
    }).then(res=>{
        //console.log(res.data);
        document.getElementById('nombreBarraE').innerHTML = `${res.data.nombreEmpresa}`;
        document.getElementById('nombreDropdownE').innerHTML = `${res.data.nombreEmpresa}`;
        document.getElementById('imgBarraE').innerHTML = `
        <img src="Proyecto/${res.data.imgPerfil}" class="img-profile rounded-circle" style="width: 2rem; height: 2rem;">
        `;
        imprimirEstadisticas(res.data);
        if(res.data.promociones){
            imprimirComentarios(res.data.promociones)
        }else{
            document.getElementById('comentariosEmpresa').innerHTML = `
            <div><h5 class="text-center py-3 card-header mb-3" style="border: .5px solid rgb(232,232,232);">Comentarios Recientes</h5></div>
            <hr>
            <div class="container-fluid">
                <div class="text-center py-5">
                    <div class="text-muted">
                        <i class="fas fa-comments" style="font-size: 100px;color:rgba(103, 57, 127, .7);padding-bottom: 0px;"></i>
                        <p class="py-3">Aun no tienes comentarios.</p>
                    </div>
                </div>
            </div>
            `;
        }
        ;

        
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

function imprimirComentarios(promociones){
    let card = '';
    let mostrarComentario = '';
    for(let key in promociones){
        if(promociones[key].comentarios){
            for(let indice in promociones[key].comentarios){
                mostrarComentario += `<div>
                <b><span>${promociones[key].comentarios[indice].nombreCliente}</span></b>
                <span>${promociones[key].comentarios[indice].contenidoComentario}</span>
                </div>`;
            }
            card += `
            <div class="col-lg-4 col-12 pt-2">
                <div class="card shadow-sm" style="border-radius: 0%!important;">
                    <div class="card-body px-0 py-0">
                        <div>
                            <img src="img/${promociones[key].imgProducto}" class="card-img-top" alt="">
                        </div>
                        <div class="px-3 py-3 post">
                            <span>${promociones[key].nombreProducto}</span><br>
                            <span id="porcentajeEstrellas"></span>
                            <hr>
                            <b>Comentarios</b><br>
                            <div>${mostrarComentario}</div>
                        </div>
                    </div>
                </div>
            </div>`;
        }
        if(promociones.cantidadEstrellas){
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
    }
    document.getElementById('comentariosEmpresa').innerHTML = `
    <div class="row">
        <div class="col-12"><h5 class="text-center py-3 card-header mb-3" style="border: .5px solid rgb(232,232,232);">Comentarios Recientes</h5></div>
        ${card}
    </div>
    `;
}

function imprimirEstadisticas(empresa){
    datosEstadisticasVentas(empresa.vendidos);
    datosEstadisticasSeguidores(empresa.seguidores);
}

function datosEstadisticasVentas(ventas){
    if(ventas){
        let suma = 0;
        let count = 0;
        for(let key in ventas){
            suma = suma + parseInt(ventas[key].monto);
            count++;
        }
        document.getElementById('datoVentas').innerHTML = `
        <div class="text-center">
            <strong><span>Articulos Vendidos: ${count}</span></strong>
        </div>
        <div class="text-center">
            <strong><span>Ventas: L ${count}</span></strong>
        </div>
        `;
        var ctx = document.getElementById('myChart1').getContext('2d');
        var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'],
            datasets: [{
                label: 'Ventas',
                backgroundColor: '#67397f',
                borderColor: 'gray',
                data: [250,100,150,100,250,100,150]
            }		
            ]},
        options: {responsive: true}
        });
    }else{
        var ctx = document.getElementById('myChart1').getContext('2d');
        var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'],
            datasets: [{
                label: 'Ventas',
                backgroundColor: '#67397f',
                borderColor: 'gray',
                data: [0,0,0,0,0,0,0]
            }		
            ]},
        options: {responsive: true}
        });
    }
}
function datosEstadisticasSeguidores(seguidores){
    if(seguidores){
        let count = 0;
        for(let key in seguidores){
            count++;
        }
        document.getElementById('datoSeguidores').innerHTML = `
        <div class="text-center">
            <strong><span>Seguidores: ${  count}</span></span>
        </div>
        `;
        
        var ctx1 = document.getElementById('myChart2').getContext('2d');
        var chart = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            datasets: [{
                label: 'Seguidores por mes',
                backgroundColor: '#67397f',
                borderColor: 'gray',
                data: [7, 8, 5, 2, 8, 10, 7, 20]
            }		
            ]},
        options: {responsive: true}
        });
    }else{
        var ctx1 = document.getElementById('myChart2').getContext('2d');
        var chart = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            datasets: [{
                label: 'Seguidores por mes',
                backgroundColor: '#67397f',
                borderColor: 'gray',
                data: [0, 0, 0, 0, 0, 0, 0, 0]
            }		
            ]},
        options: {responsive: true}
        });
    }
}

