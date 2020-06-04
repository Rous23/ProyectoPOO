var inputs =[
    {input:'email',valido:false},
    {input:'password',valido:false}
];

/**/

function login(){
    console.log('hola');
    
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
    axios({
        url:'http://localhost/POO/Proyecto/backend/api/login.php',
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
        }else if(res.data.codigoResultado == "admin"){
            window.location.href = "admin.php";
        }else{
            document.getElementById('mensajeInvalido').innerHTML = `<span style="background-color:#ff0000;">${res.data.mensaje}</span>`;
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
console.log('asdfgbnm');

/*
expresion regular tarjeta de credito o debito: regex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9][0-9])[0-9]{12})$/;


*/ 

