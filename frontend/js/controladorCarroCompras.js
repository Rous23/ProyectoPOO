var keyCliente = getCookie("keyCliente");
var empresasVentas=[];
carroCompra();
function carroCompra(){
    axios({
    url:`../../Proyecto/backend/api/carroCompras.php?idCliente=${keyCliente}`,
    method:"get",
    }).then(res=>{
        if(res.data){
            console.log(res.data);
            let listaProductos='';
            let suma = 0;
            for(let key in res.data){
                listaProductos += `
                <div id="${key}" class="container-fluid card my-2" style="background-color: rgb(242,242,242);">
                    <div class="row no-gutters py-2">
                        <div class="col-md-4 col-3 mt-auto mb-auto ml-auto mr-auto">
                        <img src="img/${res.data[key].imgProducto}" class="card-img img-thumbnail" style="max-width: 200px;">
                        </div>
                        <div class="col-md-6 col-8">
                            <div class="descripcion-producto pl-3">
                                <span>${res.data[key].nombreProducto}</span><br>
                                <small>${res.data[key].descripcion}</small>
                            </div>
                            <div class="precios px-3" style="color: red;">
                                <span id="precioActual"> L ${res.data[key].precioPromocion}</span>
                                <span class="text-muted"id="precioAntes" style="text-decoration: line-through;"> L ${res.data[key].precioNormal}</span>
                            </div>
                            <div class="px-3">
                                <span>${res.data[key].porcentajeDescuento}</span>
                            </div>
                        </div>
                        <div class="col-md-2 col-1">
                            <p onclick="eliminarProductoCarrito('${key}')" style="float: right;cursor:pointer">
                                <i class="fas fa-trash-alt"></i>
                            </p>
                        </div>
                    </div>
                </div>
                `;
                empresasVentas.push(`${res.data[key].idEmpresa}`);
                suma = suma + parseInt(res.data[key].precioPromocion);
            }
            document.getElementById('carrito').innerHTML = `
            <div class="card py-2 px-2" style="font-size: 25px;font: bold;">
                <strong>Total de productos a comprar</strong></div>
            ${listaProductos}
            `;
            document.getElementById('totalPrecio').innerHTML = `
            <div class="card pt-2">
                <div class="text-center">
                    <h4>Total de la Compra</h4>
                </div>
                <hr style="margin: 0%!important;">
                <div class="card-body px-5">
                    <div  style="display: inline-block;"><span>Total</span></div>
                    <div style="float: right;"><span>L ${suma}</span></div>
                </div>
                <hr style="margin: 0%!important;">
                <div class="ml-auto mr-auto py-3">
                    <button onclick="simulacionCompra('${keyCliente}','${empresasVentas}')" type="button" class="btn btn-grad">Realizar Compra</button>
                </div>
            </div>
            `;
            
        }else{
            document.getElementById('carroVacio').innerHTML = `
            <div class="ml-auto mr-auto">
                <div class="ml-auto mr-auto" style="align-content: center;">
                    <img src="img/shopping_cart.png" style="max-width: 190px;display: block;margin: auto;">
                </div>
                <div class="ml-auto mr-auto pt-3" style="text-align: center;">
                    <h4>Aun no has agregado productos al carrito.</h4>
                </div>
            </div>
            `;
        }
        
    }).catch(err=>{
        console.error(err);
    })
}
principalUsuarioLogin()
function principalUsuarioLogin(){
    let idC = getCookie("keyCliente");
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
                    <hr style="margin-top: .3rem;margin-bottom: .3rem;!important">
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
}
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
function simulacionCompra(keyC,arrayEmpresas){}

function eliminarProductoCarrito(idP){
    axios({
        url:`../../Proyecto/backend/api/carroCompras.php?idCliente=${keyCliente}&idProductoCarro=${idP}`,
        method:"delete",
        }).then(res=>{
            console.log(res);
            $('#'+idP).remove();
        }).catch(err=>{
            console.error(err);
    })
}