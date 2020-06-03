var inputs =[
    {input:'nombreCompleto',valido:false},
    {input:'email',valido:false},
    {input:'password',valido:false},
    {input:'direccion',valido:false},
    {input:'pais',valido:false},
    {input:'numTarjeta',valido:false},
    {input:'vencimientoTarjeta',valido:false},
    {input:'cvv',valido:false}
];

function registrarCliente(){
    let genero = document.querySelector('input[type="radio"][name="genero"]:checked');
    for(let i = 0 ; i < inputs.length ; i++)
        inputs[i].valido = validarCampoVacio(inputs[i].input);
    
    if(document.getElementById('email') != ''){
        let respuesta = validarEmail(document.getElementById('email').value);
        //console.log(respuesta);
        inputs[3].valido = respuesta;
        colorearInput('email', respuesta);
    }
    if(document.getElementById('numTarjeta') != ''){
        let valorTarjetaInput = document.getElementById('numTarjeta').value;
        let respuesta = validarTarjeta(valorTarjetaInput);
        inputs[7].valido = respuesta;
        colorearInput('numTarjeta', respuesta);
    }

    if(document.getElementById('cvv') != ''){
        let valorCvv = document.getElementById('cvv').value;
        let respuesta = validarCvv(valorCvv);
        inputs[7].valido = respuesta;
        colorearInput('cvv', respuesta);
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

    //if(listo){
        //window.location.href = "categorias.html";
    //}
    var parametros = $('#formRegistro').serialize();
    if(listo){
        axios({
            url:`../../Proyecto/backend/api/usuarioCliente.php`,
            method:"post",
            reponseType:"json",
            data: parametros
            }).then(res=>{
                if(res.data.codigo == 0){
                    document.getElementById('email').classList.remove('is-valid');
                    document.getElementById('email').classList.add('is-invalid');
                    document.getElementById('mensajeCorreo').innerHTML = `${res.data.mensaje}`;
                }else{
                    window.location.href = "principal.html";
                }
                if(document.getElementById('password') != '' && document.getElementById('password2') != ''){
                    let p1 =document.getElementById('password').value;
                    let p2 = document.getElementById('password2').value;
                    if(p1 != p2) {
                        document.getElementById('mensajePassword').innerHTML = "Las contraseñas no coinciden";
                        document.getElementById('mensajePassword2').innerHTML = "Las contraseñas no coinciden";
                        let respuesta = false;
                        colorearInput('password', respuesta);
                        return;
                    }else{
                        let respuesta = true;
                        colorearInput('password', respuesta);
                    }
                }
            }).catch(err=>{
                console.error(err);
        })
    }

}

/*axios({
        url:`../../Proyecto/backend/api/categorias.php?idCategoria=${idCategoria}`,
        method:"get",
        }).then(res=>{
            categorias = res.data;
            
        }).catch(err=>{
            console.error(err);
        })*/
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
function validarTarjeta(numeroTarjeta){
    let re = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9][0-9])[0-9]{12})$/;
    return re.test(numeroTarjeta);
}
function validarCvv(cvv){
    let re = /^[0-9]{3,4}$/;
    return re.test(cvv)
}

