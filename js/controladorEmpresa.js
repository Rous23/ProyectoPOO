var inputsProductos = [
    {input:'formNombre',valido:false},
    {input:'formDescripcion',valido:false},
    {input:'formPrecio',valido:false}
];
var inputsSucursal = [
    {input:'nombreSucursal',valido:false},
    {input:'telefonoSucursal',valido:false},
    {input:'direccionSucursal',valido:false},
    {input:'latitud',valido:false},
    {input:'longitud',valido:false}
];
var inputs = [
    {input:'nombreEmpresa',valido:false},
    {input:'contraseña',valido:false},
    {input:'direccionSucursal',valido:false},
    {input:'latitud',valido:false},
    {input:'longitud',valido:false}
];

function verEstadisticas(){
    document.getElementById('options').style.display = "block";
}

function verPerfil(){
  document.getElementById('options').innerHTML = "";
  document.getElementById('options').innerHTML = `
  <section>
      <div id="banner-empresa" style="padding-top:100px; margin-bottom: 20px;">
          <div class="rounded-circle img-thumbnail" style="background-image:url(img/cards2.jpg);margin: auto; width: 200px; height: 200px;">
          </div>
          <div class="text-center py-2" style="color:white;background-color:rgb(77, 170, 135)">
              Nombre Empresa
          </div>
      </div>
  </section>
  <div class="card my-5">
      <div class="card-header text-center">
          <div class="row">
              <div class="col-4" >
                  <a class="nav-link" href="#">Productos</a>
              </div>
              <div class="col-4" style="border-left: rgb(189, 189, 189) 2px solid;">
                  <a class="nav-link" href="#" role="button">Sucursales</a>
              </div>
              <div class="col-4" style="border-left: rgb(189, 189, 189) 2px solid;">
                      <a class="nav-link" href="#" >Promociones</a>
              </div>
          </div>
      </div>
  </div>`;
}

function registrarProducto(){
  document.getElementById('options').innerHTML = '';
  document.getElementById('options').innerHTML = `
  <div class="form-group container" style="max-width: 500px; margin-top: 40px;">
    <h4 style="padding-bottom: 10px;">Registrar producto</h4>
    <form id="formulario">
        <input class="form-control mb-2" placeholder="Nombre" type="text" id="formNombre">
        <input class="form-control mb-2" placeholder="Descripcion" type="text" id="formDescripcion">
        <input class="form-control mb-2" placeholder="Precio" type="text" id="formPrecio">
        <select name="Categorias" id="selectCategoria" class="form-control mb-2">
            <option value="" selected="true" disabled>Categoria</option>
            <option value="">Moda Hombre</option>
            <option value="">Niños</option>
            <option value="">Hogar</option>
            <option value="">Tecnologia</option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
        </select>
        <input type="file" class="form-control-file" id="exampleFormControlFile1">
    </form>
    <button onclick="formularioProductos();" class="btn btn-grad my-2" type="button">Guardar Producto</button>
</div>
  `;
}
function registrarSucursal(){
    document.getElementById('options').innerHTML = '';
    document.getElementById('options').innerHTML = `
    <div class="form-group container" style="max-width: 500px; margin-top: 40px;">
        <h4 style="padding-bottom: 10px;">Registrar Sucursal</h4>
        <form id="formulario">
            <input class="form-control mb-2" placeholder="Nombre Sucursal" type="text" id="nombreSucursal">
            <input class="form-control mb-2" placeholder="Telefono Sucursal" type="text" id="telefonoSucursal">
            <input class="form-control mb-2" placeholder="Direccion" type="text" id="direccionSucursal">
            <div>
                <h4 style="padding-top:10px;">Ubicacion en el mapa</h4>
                <img src="img/prueba-map.png" style="width: 100%; height:auto;padding-botton:10px;">
                <input class="form-control mt-2 mb-2" placeholder="Latitud" type="text" id="latitud">
                <input class="form-control mb-2" placeholder="Longitud" type="text" id="longitud">
            </div>  
        </form>
        <button onclick="formularioSucursal();" class="btn btn-grad my-2" type="button">Guardar Sucursal</button>
    </div>
    `;
}
function configuracionEmpresa(){
    document.getElementById('options').innerHTML = '';
    document.getElementById('options').innerHTML = `
    <div class="form-group container" style="max-width: 500px; margin-top: 40px;">
        <h4 style="padding-bottom: 10px;">Configuración de la Cuenta</h4>
        <form id="formulario">
            <input class="form-control mb-2" placeholder="Nombre Empresa" type="text" id="nombreEmpresa">
            <input class="form-control mb-2" placeholder="Contraseña" type="password" id="contraseña">
            <input class="form-control mb-2" placeholder="Contraseña" type="password" id="contraseña2">
            <input class="form-control mb-2" placeholder="Ubicación" type="text" id="direccionSucursal">
            <div>
                <h4 style="padding-top:10px;">Ubicacion en el mapa</h4>
                <img src="img/prueba-map.png" style="width: 100%; height:auto;padding-botton:10px;">
                <input class="form-control mt-2 mb-2" placeholder="Latitud" type="text" id="latitud">
                <input class="form-control mb-2" placeholder="Longitud" type="text" id="longitud">
            </div>  
        </form>
        <button onclick="formulario();" class="btn btn-grad my-2" type="button">Guardar</button>
    </div>
    `;
}

function formularioProductos(){
    for(let i = 0 ; i < inputsProductos.length ; i++)
        inputsProductos[i].valido = validarCampoVacio(inputsProductos[i].input);
}

function formularioSucursal(){
    for(let i = 0 ; i < inputsSucursal.length ; i++)
        inputsSucursal[i].valido = validarCampoVacio(inputsSucursal[i].input);
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

    if(listo){
        window.location.href = "dashboard.html";
    }
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