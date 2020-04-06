var inputs =[
    {input:'nombre',valido:false},
    {input:'apellido',valido:false},
    {input:'usuario',valido:false},
    {input:'email',valido:false},
    {input:'contraseña',valido:false},
    {input:'direccion',valido:false},
    {input:'pais',valido:false},
    {input:'numeroTarjeta',valido:false},
    {input:'vencimiento',valido:false},
    {input:'cvv',valido:false}
];

function registrarCliente(){
    
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

    if(listo){
        window.location.href = "categorias.html";
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

