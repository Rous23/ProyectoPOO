var idEmpresa = obtenerKey();
console.log(ide)
(()=>{
    axios({
    url:'../../Proyecto/backend/api/usuarioEmpresa.php',
    method:"get",
    }).then(res=>{
        console.log(res.data);
    }).catch(err=>{
        console.error(err);
    })
})();

/*ObtenerKeyEmpresa*/
function obtenerKey(){
    let cookie = document.cookie.split(';');
    for(let i=0 ; i<cookie.length ; i++){
        cookie[i].split('=');
        let nombre = cookie[i].split('=')
        //console.log(key);
        if(nombre[0] == "nombreEmpresa"){
            nombre = nombre[1].split('+');
            return nombre[0];
        }
    }
}