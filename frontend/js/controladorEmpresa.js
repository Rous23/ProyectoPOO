var inputsProductos = [
    {input:'formNombre',valido:false},
    {input:'formDescripcion',valido:false},
    {input:'formPrecio',valido:false},
    {input:'selectCategoria',valido:false},
    {input:'file',valido:false}
];
var inputsPromociones = [
    {input:'selectProd',valido:false},
    {input:'precioPromocion',valido:false},
    {input:'descuento',valido:false},
    {input:'fechaInicio',valido:false},
    {input:'fechaFin',valido:false}//,
    //{input:'chk',valido:false}
];
var inputsSucursal = [
    {input:'nombreSucursal',valido:false},
    {input:'emailSucursal',valido:false},
    {input:'telefonoSucursal',valido:false},
    {input:'direccionSucursal',valido:false},
    {input:'latitudSucursal',valido:false},
    {input:'longitudSucursal',valido:false}
];
var inputs = [
    {input:'nombreEmpresa',valido:false},
    {input:'password',valido:false},
    {input:'direccion',valido:false},
    {input:'latitud',valido:false},
    {input:'longitud',valido:false},
    {input:'email',valido:false},
    {input:'descripcion',valido:false},
    {input:'vencimientoTarjeta',valido:false},
    {input:'cvv',valido:false},
    {input:'numTarjeta',valido:false},
    {input:'password2',valido:false},
    {input:'plan',valido:false},
    {input:'pais',valido:false}

];
var datosE;
/*ObtenerKeyEmpresa*/
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
function meses(){
    let meses = ['Enero', 'Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    let options='';
    for(let i=0; i<meses.length; i++)
        options += `<option value="${i}">${meses[i]}</option>`;
    let optionsMeses = `
    <option value="" selected="true" disabled>Mes</option>
    ${options}
    `;
    return optionsMeses;
}
function dias(){
    let options = '';
    for(let i=1; i<=31; i++)
        options += `<option value="${i}">${i}</option>`;
    let optionsDias = `
    <option value="" selected="true" disabled>Dia</option>${options}
    `;
    return optionsDias;
}

function registrarProducto(){
    axios({
        url:'../../Proyecto/backend/api/categorias.php',
        method: 'get',
    }).then(res=>{
        categorias = res.data;
        let selectCategorias = '';
        document.getElementById('options').innerHTML = '';
        for(let key in categorias){
            selectCategorias += `
            <option value="${key}">${categorias[key].nombreCategoria}</option>
            `;
        }
        document.getElementById('options').innerHTML = `
        <div class="form-group container" style="max-width: 500px; margin-top: 40px;">
            <h4 style="padding-bottom: 10px;">Registrar producto</h4>
            <form id="formulario">
                <input class="form-control mb-2" placeholder="Nombre" type="text" id="formNombre">
                <input class="form-control mb-2" placeholder="Descripcion" type="text" id="formDescripcion">
                <input class="form-control mb-2" placeholder="Precio" type="text" id="formPrecio">
                <select name="Categorias" id="selectCategoria" class="form-control mb-2 select2-drop-above">
                    <option value="" selected="true" disabled>Categoria</option>
                    ${selectCategorias}
                </select>
            </form>
            <form id="imagenPr" name="imagenPr" method="post" enctype="multipart/form-data">
                <input type="file" class="form-control-file" name="imagenPr" id="file" accept="image/x-png,image/gif,image/jpeg,image/png">
            </form>
            <button onclick="formularioProductos('imagenPr');" class="btn btn-grad my-2" type="button" >Guardar Producto</button>
            <div class="my-3" id="mensajeProducto"></div>
        </div>
        `;
    }).catch(error=>{
        console.error(error);
    })
}

function registrarPromocion(){
    let idE = getCookie("keyEmpresa");
    axios({
        url:`../../Proyecto/backend/api/sucursal.php?idEmpresa=${idE}`,
        method: 'get',
    }).then(res=>{
        sucursales = res.data;
        let opcionesSucursal = '';
        let productos = selectProductos();
        if(sucursales){
            for(let key in sucursales){
                opcionesSucursal += `<input id="chk" class="d-inline-block" type="checkbox" name="sucursal" value="${key}">${sucursales[key].nombreSucursal}<br>`;
            }
        }
        
        document.getElementById('options').innerHTML = '';
        document.getElementById('options').innerHTML = `
        <div id="forms" class="form-group container" style="max-width: 500px; margin-top: 40px;">
            <h4 style="padding-bottom: 10px;">Registrar promocion</h4>
            <form id="formulario">
                <select onchange="datosProducto()" id="selectProd" class="form-control mb-2">${productos}</select>
                <div id="informacionProd" style="width:100%"></div>
                <input class="form-control mb-2" type="text" id="precioPromocion" placeholder="Precio Promocion">
                <input class="form-control mb-2" type="text" id="descuento" placeholder="Descuento">
                <div class="col-12">Fecha de inicio</div>
                <input class="form-control mb-2" type="date" id="fechaInicio" placeholder="Fecha">
                <div class="col-12">Fecha de caducidad</div>
                <input class="form-control mb-2" type="date" id="fechaFin" placeholder="Fecha">
                <div id="chkSucursales"><span>Sucursales</span><br>${opcionesSucursal}</div> 
            </form>
            <button onclick="formularioPromociones();" class="btn btn-grad my-2 mx-auto" type="button"  style="position:center;">Guardar Promoción</button>
            <div class="my-3" id="mensajePromocion"></div>
        </div>
        `;
    }).catch(error=>{
        console.error(error);
    })
}
function selectProductos(){
    let idE = getCookie("keyEmpresa");
    axios({
        url:`../../Proyecto/backend/api/productos.php?idEmpresa=${idE}`,
        method: 'get',
    }).then(res=>{
        let productos = res.data;
        let select = '';
        for (let key in productos){
            select += `<option value="${key}">${productos[key].nombreProducto}</option>`;
        }
        document.getElementById('selectProd').innerHTML = `
        <option onclick="" value="" selected="true" disabled>Elija un producto</option>
        ${select}`;

    }).catch(error=>{
        console.error(error);
    })
}

function registrarSucursal(){
    document.getElementById('options').innerHTML = '';
    document.getElementById('options').innerHTML = `
    <div class="form-group container" style="max-width: 500px; margin-top: 40px;">
        <h4 style="padding-bottom: 10px;">Registrar Sucursal</h4>
        <form id="formulario">
            <input class="form-control mb-2" placeholder="Nombre Sucursal" type="text" id="nombreSucursal">
            <input class="form-control mb-2" placeholder="Email Sucursal" type="text" id="emailSucursal">
            <input class="form-control mb-2" placeholder="Telefono Sucursal" type="text" id="telefonoSucursal">
            <input class="form-control mb-2" placeholder="Direccion" type="text" id="direccionSucursal">
            <div>
                <h4 style="padding-top:10px;">Ubicacion en el mapa</h4>
                <input class="form-control mt-2 mb-2" placeholder="Latitud" type="text" id="latitudSucursal">
                <input class="form-control mb-2" placeholder="Longitud" type="text" id="longitudSucursal">
            </div>
            <button onclick="mostrarUbicacion('latitudSucursal','longitudSucursal','nombreSucursal');" class="btn btn-grad my-2" type="button">Mostrar Ubicacion Sucursal</button>
        </form>
        <div id="map" style="width:100%;height:300px;display:none"></div>
        <button onclick="formularioSucursal();" class="btn btn-grad my-2" type="button">Guardar Sucursal</button>
        <div class="my-3" id="mensajeSucursal"></div>
    </div>
    `;
}
function mostrarUbicacion(idLat, idLon, nombre){
    document.getElementById('map').style.display = 'block'; 
    let lat = parseFloat(document.getElementById(idLat).value);
    let lon = parseFloat(document.getElementById(idLon).value);
    
    var map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([lat, lon]).addTo(map)
        .bindPopup(document.getElementById(nombre).value)
        .openPopup();
}
function configuracionEmpresa(){
    axios({
        url:`../../Proyecto/backend/api/usuarioEmpresa.php?idEmpresa=${idEmpresa}`,
        method:"get",
        }).then(res=>{
            datosE = res.data;
            console.log(res.data.nombreEmpresa);
            document.getElementById('nombreEmpresa').value = res.data.nombreEmpresa;
            document.getElementById('direccion').value = res.data.direccion;
            document.getElementById('latitud').value = res.data.latitud;
            document.getElementById('longitud').value = res.data.longitud;
            document.getElementById('email').value = res.data.email;
            document.getElementById('descripcion').value = res.data.descripcion;
            document.getElementById('vencimientoTarjeta').value = res.data.tarjeta.vencimientoTarjeta;
            document.getElementById('cvv').value = res.data.tarjeta.cvv;
            document.getElementById('numTarjeta').value = res.data.tarjeta.numTarjeta;
            document.getElementById('pais').value = res.data.tarjeta.pais;
            document.getElementById('plan').value = res.data.tarjeta.plan;
            document.getElementById('password').value = res.data.tarjeta.password;
            
            var map = L.map('mapC').setView([51.505, -0.09], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            L.marker([res.data.latitud,res.data.longitud]).addTo(map)
            .bindPopup(res.data.nombreEmpresa)
            .openPopup();
            $('#configuracion').modal('show');
        }).catch(err=>{
            console.error(err);
    })
}
function formularioProductos(idP){
    let idE = getCookie("keyEmpresa");
    for(let i = 0 ; i < inputsProductos.length ; i++)
        inputsProductos[i].valido = validarCampoVacio(inputsProductos[i].input);
    for (let i=0;i<inputsProductos.length;i++){
        if (!inputsProductos[i].valido){
            document.getElementById('mensajeProducto').innerHTML = `
            <span style="border: .5px solid rgba(231, 76, 60);background:rgba(231, 76, 60,.5);padding:5px;">Necesita llenar los campos vacios para poder guardar el producto.</span>
            ` ;
            return;
        }
    }
    
    var frm = $('#'+idP);
    var formData = new FormData(frm[0]);
    axios({
        url:`../../Proyecto/backend/api/subirImagenProducto.php`,
        method:"post",
        data:formData
        }).then(res=>{
            axios({
                url:`../../Proyecto/backend/api/productos.php?idEmpresa=${idE}`,
                method:"post",
                responseType:"json",
                data:{
                    nombreProducto : document.getElementById('formNombre').value,
                    imgProducto : res.data,
                    descripcion : document.getElementById('formDescripcion').value,
                    precioNormal : document.getElementById('formPrecio').value,
                    idCategoria : document.getElementById('selectCategoria').value
                }
                }).then(res=>{
                    console.log(res);
                    if(res.data.codigo == 1){
                        document.getElementById('mensajeProducto').innerHTML = `
                        <span style="border: .5px solid rgba(201,245,177);background:rgba(201,245,177,.5);padding:5px;">${res.data.mensaje}</span>
                        ` ;
                    }else{
                        document.getElementById('mensajeProducto').innerHTML = `
                        <span style="border: .5px solid rgba(231, 76, 60);background:rgba(231, 76, 60,.5);padding:5px;">${res.data.mensaje}</span>
                        ` ;
                    } 
                }).catch(err=>{
                    console.error(err);
            })
        }).catch(err=>{
            console.error(err);
    })
        
    
}

function formularioPromociones(){
    let idE = getCookie("keyEmpresa");
    for(let i = 0 ; i < inputsPromociones.length ; i++)
        inputsPromociones[i].valido = validarCampoVacio(inputsPromociones[i].input);
    for (let i=0;i<inputsPromociones.length;i++){
        if (!inputsPromociones[i].valido){
            document.getElementById('mensajePromocion').innerHTML = `
            <span style="border: .5px solid rgba(231, 76, 60);background:rgba(231, 76, 60,.5);padding:5px;">Necesita llenar los campos vacios para poder guardar.</span>`;
            return;
        }
    }
    let valoresCheck = [];

    $("input[type=checkbox]:checked").each(function(){
        valoresCheck.push(this.value);
    });
    axios({
    url:`../../Proyecto/backend/api/promocion.php?idEmpresa=${idE}`,
    method:"post",
    responseType:"json",
    data:{
        nombreProducto : document.getElementById('formNombre').value,
        imgProducto : document.getElementById('file').value,
        descripcion : document.getElementById('formDescripcion').value,
        precioNormal : document.getElementById('formPrecio').value,
        idCategoria : document.getElementById('epcategoria').value,
        precioPromocion : document.getElementById('precioPromocion').value,
        porcentajeDescuento : document.getElementById('descuento').value,
        fechaInicio : document.getElementById('fechaInicio').value,
        fechaFin : document.getElementById('fechaFin').value,
        sucursales : valoresCheck
    }
    }).then(res=>{
        console.log(valoresCheck);
        
        console.log(res);
        if(res.data.codigo == 1){
            document.getElementById('mensajePromocion').innerHTML = `
            <span style="border: .5px solid rgba(201,245,177);background:rgba(201,245,177,.5);padding:5px;">${res.data.mensaje}</span>
            ` ;
        }else{
            document.getElementById('mensajePromocion').innerHTML = `
            <span style="border: .5px solid rgba(231, 76, 60);background:rgba(231, 76, 60,.5);padding:5px;">${res.data.mensaje}</span>
            ` ;
        }
        
    }).catch(err=>{
        console.error(err);
    })
}
function datosProducto(){
    let idE = getCookie("keyEmpresa");
    axios({
        url:`../../Proyecto/backend/api/productos.php?idEmpresa=${idE}&idProducto=${document.getElementById('selectProd').value}`,
        method:"get",
        }).then(res=>{
            let producto = res.data;
            console.log(producto);
            document.getElementById('informacionProd').innerHTML = `
            <label for="formNombre" class="w-100">Nombre Producto<input class="form-control mb-2 " placeholder="${producto.nombreProducto}" type="text" id="formNombre" value="${producto.nombreProducto}" disabled></label>
            <label for="formDescripcion" class="w-100">Descripcion<input class="form-control mb-2 " placeholder="${producto.descripcion}" type="text" id="formDescripcion" value="${producto.descripcion}" disabled></label>
            <label for="formPrecio" class="w-100">Precio Normal<input class="form-control mb-2 " placeholder="${producto.precioNormal}" type="text" id="formPrecio" value="${producto.precioNormal}" disabled></label>
            <input type="hidden" class="form-control" id="epcategoria" placeholder="${producto.idCategoria}" value="${producto.idCategoria}">
            <input type="hidden" class="form-control" id="file"  placeholder="${producto.imgProducto}" value="${producto.imgProducto}">
            `;
        }).catch(err=>{
            console.error(err);
    })
}

function formularioSucursal(){
    for(let i = 0 ; i < inputsSucursal.length ; i++)
        inputsSucursal[i].valido = validarCampoVacio(inputsSucursal[i].input);

    for (let i=0;i<inputsSucursal.length;i++){
        if (!inputsSucursal[i].valido){
            document.getElementById('mensajeSucursal').innerHTML = `
            <span style="border: .5px solid rgba(231, 76, 60);background:rgba(231, 76, 60,.5);padding:5px;">Necesita llenar los campos vacios para poder guardar.</span>`;
            return;
        }
    }
    let idE = getCookie("keyEmpresa");
    axios({
        url:`../../Proyecto/backend/api/sucursal.php?idEmpresa=${idE}`,
        method:"post",
        responseType:"json",
        data:{
            nombreSucursal : document.getElementById('nombreSucursal').value,
            emailSucursal : document.getElementById('emailSucursal').value,
            telefonoSucursal : document.getElementById('telefonoSucursal').value,
            direccionSucursal : document.getElementById('direccionSucursal').value,
            latitudSucursal : document.getElementById('latitudSucursal').value,
            longitudSucursal : document.getElementById('longitudSucursal').value
        }
        }).then(res=>{
            console.log(idE);
            
            console.log(res);
            if(res.data.codigo == 1){
                document.getElementById('mensajeSucursal').innerHTML += `
                <span style="border: .5px solid rgba(201,245,177);background:rgba(201,245,177,.5);padding:5px;">${res.data.mensaje}</span>
                ` ;
            }else{
                document.getElementById('mensajeSucursal').innerHTML += `
                <span style="border: .5px solid rgba(231, 76, 60);background:rgba(231, 76, 60,.5);padding:5px;">${res.data.mensaje}</span>
                ` ;
            }
            
        }).catch(err=>{
            console.error(err);
    })
}

function formulario(){
    for(let i = 0 ; i < inputs.length ; i++)
        inputs[i].valido = validarCampoVacio(inputs[i].input);

    let listo = false;
    for(let i = 0 ; i < inputs.length ; i++){
        if(inputs[i].valido){
            listo = true;
        }else{
            listo = false;
            break;
        }
    }
    let idEmpresa = getCookie("keyEmpresa");
    if(listo){
        let parametros = 
        `nombreEmpresa=${$('#nombreEmpresa').val()}&imgBanner=${datosE.imgBanner}&imgPerfil=${datosE.imgPerfil}&email=${datosE.email}&password=${$('#password2').val()}&descripcion=${datosE.descripcion}&direccion=${$('#direccion').val()}&genero=${datosE.genero}&facebook=${datosE.redes.facebook}&instagram=${datosE.redes.instagram}&twitter=${datosE.redes.twitter}&latitud=${$('#latitud').val()}&longitud=${$('#longitud').val()}&pais=${$('#pais').val()}&numTarjeta=${$('#numTarjeta').val()}&vencimientoTarjeta=${$('#vencimientoTarjeta').val()}&cvv=${$('#cvv').val()}&plan=${$('#plan').val()}
            `;
        console.log(parametros);
        
        axios({
        url:`../../Proyecto/backend/api/usuarioEmpresa.php?idEmpresa=${idEmpresa}`,
        method:"put",
        responseType:'json',
        data: parametros
        }).then(res=>{
            let datosEmpresa = res.data;
            console.log(datosEmpresa);
            if(res.data){
                window.location.href = 'perfil-empresa.php' 
            }
                
        }).catch(err=>{
            console.error(err);
        })
    }
}
    
    /*let lat;
    let lon;
    $('#configuracion').modal('show');
    if(!lat && !lon){
        var map = L.map('mapC').setView([51.505, -0.09], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    }
    $(document).ready(function(){
        $("#latitud, #longitud").change(function(){
            lat = $('input[id=latitud]').val();
            lon = $('input[id=longitud]').val();
            //console.log(lat+" "+lon);
            L.marker([lat,lon]).addTo(map)
            .bindPopup()
            .openPopup();
            console.log(lat+" "+lon);
            
        });
    });
}*/


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
function limpiarFormulario(){
    $('#formNombre').val(null);
    $('#file').val(null);
    $('#formDescripcion').val(null);
    $('#formPrecio').val(null);
    $('#selectCategoria').val(null);
}