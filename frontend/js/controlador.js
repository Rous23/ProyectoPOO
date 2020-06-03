var miCodigoQR = new QRCode("codigoQR");
/*$(document).ready(function(){
  $("#generarCodigo").on("click",function(){
    var cadena = $("#item_txt").val();
    if (cadena == "") {
        alert("Ingresa un texto");
        $("#item_txt").focus();
    }else{
      $("#descargarCodigo").css("display","inline-block");
      miCodigoQR.makeCode(cadena);
    }
  });
  $("#descargarCodigo").on("click",function(){
    var base64 = $("#codigoQR img").attr('src');
    $("#descargarCodigo").attr('href', base64);
    $("#descargarCodigo").attr('download', "codigoQR");
    $("#descargarCodigo").trigger("click");
  });
});*/

generarQR();
function generarQR(){
    var cadena = 'http://localhost/POO/Proyecto/frontend/categorias.html';
      $("#descargarCodigo").css("display","inline-block");
      miCodigoQR.makeCode(cadena);
}
