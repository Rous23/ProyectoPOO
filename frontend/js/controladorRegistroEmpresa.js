var inputs =[
    {input:'nombreEmpresa',valido:false},
    {input:'email',valido:false},
    {input:'contraseña',valido:false},
    {input:'descripcion',valido:false},
    {input:'facebook',valido:false},
    {input:'instagram',valido:false},
    {input:'twitter',valido:false},
    {input:'direccion',valido:false},
    {input:'pais',valido:false},
    {input:'numeroTarjeta',valido:false},
    {input:'vencimiento',valido:false},
    {input:'cvv',valido:false},
    {input:'latitud',valido:false},
    {input:'longitud',valido:false},
    {input:'plan',valido:false}
];
var lat;
var lon;
if(!lat && !lon){
    var map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}

function registrarEmpresa(){
    for(let i = 0 ; i < inputs.length ; i++)
        inputs[i].valido = validarCampoVacio(inputs[i].input);
    
    if(document.getElementById('email') != ''){
        let respuesta = validarEmail(document.getElementById('email').value);
        console.log(respuesta);
        inputs[3].valido = respuesta;
        colorearInput('email', respuesta);
    }

    if(document.getElementById('numeroTarjeta') != ''){
        let valorTarjetaInput = document.getElementById('numeroTarjeta').value;
        let respuesta = validarTarjeta(valorTarjetaInput);
        inputs[7].valido = respuesta;
        colorearInput('numeroTarjeta', respuesta);
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
    /*if(listo){
        window.location.href = "dashboard.html";
    }*/
    var parametros = $('#form-registroEmpresa').serialize()+"&"+$('#form-registroEmpresa2').serialize();
    console.log(parametros);
    if(listo){
        axios({
            url:`../../Proyecto/backend/api/usuarioEmpresa.php`,
            method:"post",
            reponseType:"json",
            data: parametros
            }).then(res=>{
                if(res.data.codigo == 0){
                    document.getElementById('email').classList.remove('is-valid');
                    document.getElementById('email').classList.add('is-invalid');
                    document.getElementById('mensajeCorreo').innerHTML = `${res.data.mensaje}`;
                }else{
                    document.getElementById('mensajeCorreo').innerHTML = '';
                    if(document.getElementById('contraseña') != '' && document.getElementById('contraseña2') != ''){
                        let p1 =document.getElementById('contraseña').value;
                        let p2 = document.getElementById('contraseña2').value;
                        if(p1 != p2) {
                            document.getElementById('mensajePassword').innerHTML = "Las contraseñas no coinciden";
                            document.getElementById('mensajePassword2').innerHTML = "Las contraseñas no coinciden";
                            let respuesta = false;
                            colorearInput('contraseña', respuesta);
                            return;
                        }else{
                            let respuesta = true;
                            colorearInput('contraseña', respuesta);
                        }
                    }
                    window.location.href = "dashboard.php";
                }
                if(document.getElementById('contraseña') != '' && document.getElementById('contraseña2') != ''){
                    let p1 =document.getElementById('contraseña').value;
                    let p2 = document.getElementById('contraseña2').value;
                    if(p1 != p2) {
                        document.getElementById('mensajePassword').innerHTML = "Las contraseñas no coinciden";
                        document.getElementById('mensajePassword2').innerHTML = "Las contraseñas no coinciden";
                        let respuesta = false;
                        colorearInput('contraseña', respuesta);
                        return;
                    }else{
                        let respuesta = true;
                        colorearInput('contraseña', respuesta);
                    }
                }
            }).catch(err=>{
                console.error(err);
        })
    }
}
$(document).ready(function(){
    $("#latitud, #longitud").change(function(){
        lat = $('input[id=latitud]').val();
        lon = $('input[id=longitud]').val();
        //console.log(lat+" "+lon);
        L.marker([lat,lon]).addTo(map)
        .bindPopup("Tienda Principal")
        .openPopup();
        console.log(lat+" "+lon);
        
    });
});

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