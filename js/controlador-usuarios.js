var usuarios=[
    {
        empresa: [
            /*{
                nombre:'',
                username:'',
                perfil: '',
                portada: '',
                email: '',
                contrasenia: '',
                pais:'',
                direccion:'',
                tarjeta:[
                    {
                        numeroTarjeta:'',
                        vencimiento:'',
                        cvv:''
                    }
                ],
                numeroTarjeta:'',
                vencimiento:'',
                cvv:'',
                redes:[],
                latitud:'',
                longitud:''
            }*/
        ],
        cliente:[
            /*{
                nombre:'',
                username:'',
                perfil: '',
                portada: '',
                email: '',
                contrasenia: '',
                pais:'',
                direccion:'',
                tarjeta:[
                    {
                        numeroTarjeta:'',
                        vencimiento:'',
                        cvv:''
                    }
                ],
                redes:[],
                genero:'',
                latitud:'',
                longitud:''
            }*/
        ],
        superAdministrador:[
            {
                nombre:'admin',
                contrasenia:'asd.456'

        }]
    }
];


function mostrarFormulario(valor){
    console.log(valor);
    document.querySelector('#formulario').style.display = 'block';
    document.querySelector('#seleccionado').style.display = 'none';
}

function login(){
    validarCampoVacio('nombre');
    validarCampoVacio('apellido');
    validarCampoVacio('usuario');
    validarCampoVacio('email');
    validarCampoVacio('contraseña');
    validarCampoVacio('contraseña2');
    validarCampoVacio('numeroTarjeta');
    validarCampoVacio('vencimiento');
    validarCampoVacio('cvv');
    validarCampoVacio('latitud');
    validarCampoVacio('longitud');
    validarCampoVacio('direccion');
        
}
function validarCampoVacio(id){
    if (document.getElementById(id).value == ''){
        document.getElementById(id).classList.remove('input-success');
        document.getElementById(id).classList.add('input-error');
        
    }else{ 
        document.getElementById(id).classList.remove('input-error');
        document.getElementById(id).classList.add('input-success');
    }
}
/*
expresion regular tarjeta de credito o debito: regex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9][0-9])[0-9]{12})$/;


*/ 

