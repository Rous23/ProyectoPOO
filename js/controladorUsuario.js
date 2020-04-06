var clientes = [
    {
        nombre:'Rodolfa',
        apellido:'Cardozo',
        imgBanner:'img/cards1.jpg',
        imgPerfil:'img/perfil.jpg',
        nombreUsuario:'Rous',
        correo:'rosaavila23@gmail.es',
        contraseña:'asd.456',
        domicilio:'direccion',
        pais:'alaska',
        genero:'f',
        numTarjeta:'1223-4455-3321',
        vencimientoTarjeta:'22/20',
        cvv:'123',
        productosComprados:[],
        empresasFavoritas:[
            {
                nombreEmpresa:'asddf'
            
            }
        ],
        productosFavoritos:[
            {
                nombreProducto:'juguetes',
                imgProducto:'img/card1.jpg'
            }
        ]
    },
    {
        nombre:'Rodolfa',
        apellido:'Cardozo',
        imgBanner:'img/cards1.jpg',
        imgPerfil:'img/perfil.jpg',
        nombreUsuario:'Rous',
        correo:'rosaavila23@gmail.es',
        contraseña:'asd.456',
        domicilio:'direccion',
        pais:'alaska',
        genero:'f',
        numTarjeta:'1223-4455-3321',
        vencimientoTarjeta:'22/20',
        cvv:'123',
        productosComprados:[],
        empresasFavoritas:[
            {
                nombreEmpresa:'asddf'
            
            }
        ],
        productosFavoritos:[
            {
                nombreProducto:'juguetes',
                imgProducto:'img/card1.jpg'
            }
        ]
    },
    {
        nombre:'Rodolfa',
        apellido:'Cardozo',
        imgBanner:'img/cards1.jpg',
        imgPerfil:'img/perfil.jpg',
        nombreUsuario:'Rous',
        correo:'rosaavila23@gmail.es',
        contraseña:'asd.456',
        domicilio:'direccion',
        pais:'alaska',
        genero:'f',
        numTarjeta:'1223-4455-3321',
        vencimientoTarjeta:'22/20',
        cvv:'123',
        productosComprados:[],
        empresasFavoritas:[
            {
                nombreEmpresa:'asddf'
            
            }
        ],
        productosFavoritos:[
            {
                nombreProducto:'juguetes',
                imgProducto:'img/card1.jpg'
            }
        ]
    }
];

function mostrarOpcion(){
    document.getElementById('opciones-perfil').style.display = "block";
}
function mostarProdctosFavoritos(){
    document.getElementById('opciones-perfil').style.display = "none";
    document.getElementById('opciones-perfil1').style.display = "block";
}