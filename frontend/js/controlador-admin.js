(()=>{
    axios({
    url:'../../Proyecto/backend/api/admin.php',
    method:"get",
    }).then(res=>{
        admi = res.data;
        console.log(admi);
        llenarTabla(admi.empresas);
        $("#loading-tabla").hide();
    }).catch(err=>{
        console.error(err);
    })
})();

function llenarTabla(usuarios){
    $('#tabla-registros').empty();
    for (let indice in usuarios) {
        document.getElementById('tabla-registros').innerHTML +=`
        <tr id="${indice}">
            <td>${usuarios[indice].nombreEmpresa}</td>
            <td>${indice}</td>
            <td>${usuarios[indice].email}</td>
            <td>${usuarios[indice].plan}</td>
        </tr>
        `;
    }
}