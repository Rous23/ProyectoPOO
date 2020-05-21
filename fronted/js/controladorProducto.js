var idProducto = obtenerIdProducto();
console.log(idProducto); 

function obtenerIdProducto(){
    let cookie = document.cookie.split(';');
    for(let i=0 ; i<cookie.length ; i++){
        cookie[i].split('=');
        let cookieProducto = cookie[i].split('=')
        //console.log(cookieProducto);
        if(cookieProducto[0] == "idProducto"){
            producto = cookieProducto[1].split('+');
            return producto[0];
        }
        //console.log(cookie[i].split('='));
    }
    //console.log(cookie);
}

