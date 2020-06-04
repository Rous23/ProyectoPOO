var URLsearch = window.location.search;
if(URLsearch.substr(0,1) == '?'){
    var datoBus1 = URLsearch.substr(1);
    dato = [];
    for(let i=0 ; i<datoBus1.length ; i++){
        if(datoBus1.split('%20')){
            dato.push(datoBus1.split('%20'));
            
        }
    }
    var nuevo = dato[0]
    var datoBus2 = nuevo.join(' ');
    if(datoBus1 && !datoBus1.split('%20')){
        var datoBusqueda = datoBus1;
    }else{
        var datoBusqueda = datoBus2
    }
    
}
console.log(datoBusqueda);
(()=>{
    axios({
    url:`../../Proyecto/backend/api/categorias.php`,
    method:"get",
    }).then(res=>{
        categorias = res.data;
        imprimirDatosBusqueda(categorias);
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
                        <hr style="margin-top: .3rem;">
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

function imprimirDatosBusqueda(categorias){
    for(let key in categorias){
        for(let indice in categorias[key].productos){
            nombre = categorias[key].productos[indice].nombreProducto
            if(nombre.toLowerCase() == datoBusqueda){
                document.getElementById('resultadosBusqueda').innerHTML += `
                <div class="col-lg-3 col-md-4 col-6 pb-1 px-1">
                    <div onclick="detallesProducto('${indice}','${key}')" class="card" style="cursor:pointer;">
                        <img src="img/${categorias[key].productos[indice].imgProducto}" class="card-img-top" style="padding: 8px;">
                        <div class="card-body text-center" style="padding:5px!important;">
                            <div><span>${categorias[key].productos[indice].nombreProducto}</span></div>
                            <div class="precios px-3" style="color: red;">
                            <span id="precioActual">L ${categorias[key].productos[indice].precioNormal}</span>
                            <span class="text-muted"id="precioAntes" style="text-decoration: line-through;"> L ${categorias[key].productos[indice].precioPromocion}</span>
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
    //console.log(resultado);
    
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
        }else{
            console.log(res.data);
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