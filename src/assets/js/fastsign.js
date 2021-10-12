function firmarDocumento(callback) {
    var tipoFirma     = "";
    var rutaEntrada   = "";
    var rutaSalida    = "";
    var nombreArchivo = "";
    var sistema       = "";
    var servidorFirma = "";
    var correoElectronicoResponsable = "null";
    var correoElectronicoAsunto = "null";
    var correoElectronicoMensaje = "null";
    
    var firmaHolografica = "";
    var obtenerImagenHolograficaDesdeServidor = "N";
    var rutaImagenHolograficaServidor = "";
    var motivo = "";
    var pagina = "";
    var posicionX = "";
    var posicionY = "";
    
//		var rolUsuario = "";
    
    var adicionarQr = "";

    
    tipoFirma     = document.getElementById("tipoFirma").value;
    rutaEntrada   = document.getElementById("rutaEntrada").value;
    rutaSalida    = document.getElementById("rutaSalida").value;
    sistema       = document.getElementById("sistema").value;
    servidorFirma = document.getElementById("servidorFirma").value;		
    firmaHolografica = document.getElementById("firmaHolografica").value;
    
    if(document.getElementById("obtenerImagenHolograficaDesdeServidor") && document.getElementById("obtenerImagenHolograficaDesdeServidor").value){
        
        obtenerImagenHolograficaDesdeServidor = document.getElementById("obtenerImagenHolograficaDesdeServidor").value;
        
        if(obtenerImagenHolograficaDesdeServidor == 'S'){
            if(document.getElementById("rutaImagenHolograficaServidor") && document.getElementById("rutaImagenHolograficaServidor").value){
                rutaImagenHolograficaServidor = document.getElementById("rutaImagenHolograficaServidor").value;
            }
        }
        
    }
    motivo = document.getElementById("motivo").value;
    pagina = document.getElementById("pagina").value;
    posicionX = document.getElementById("posicionX").value;
    posicionY = document.getElementById("posicionY").value;
    
//		rolUsuario = document.getElementById("rolUsuario").value;

    adicionarQr = document.getElementById("adicionarQr").value;

    
    if(tipoFirma == 'I'){
        nombreArchivo = document.getElementById("nombreArchivo").value;
    }else{
        nombreArchivo = "";
    }
    
    if(document.getElementById("correoElectronicoResponsable") && document.getElementById("correoElectronicoResponsable").value){
        correoElectronicoResponsable = document.getElementById("correoElectronicoResponsable").value;
    }
    
    if(document.getElementById("correoElectronicoAsunto") && document.getElementById("correoElectronicoAsunto").value){
        correoElectronicoAsunto = document.getElementById("correoElectronicoAsunto").value;
    }
    
    if(document.getElementById("correoElectronicoMensaje") && document.getElementById("correoElectronicoMensaje").value){
        correoElectronicoMensaje = document.getElementById("correoElectronicoMensaje").value;
    }
    
    var urlServicio = servidorFirma + '/SignFastService/services/rest/GestionarProcesamientoFirmas/registrar/' + sistema + "/" + encodeURIComponent(reemplazarSeparadorUrl(rutaEntrada)) + "/" + encodeURIComponent(reemplazarSeparadorUrl(rutaSalida)) + "/" + encodeURIComponent(correoElectronicoResponsable);
    obtenerNumeroOperacion(urlServicio, tipoFirma, rutaEntrada, rutaSalida, nombreArchivo, servidorFirma, firmaHolografica, obtenerImagenHolograficaDesdeServidor, rutaImagenHolograficaServidor, motivo, pagina, posicionX, posicionY, sistema, correoElectronicoAsunto, correoElectronicoMensaje, adicionarQr, callback);
    
}
function enviarMensaje(){
    console.log('=====respuesta de recibirRespuestaFirma=====')
    console.log(document.getElementById("respuesta").value)
    console.log('=====fin respuesta de recibirRespuestaFirma=====')
}
function recibirRespuestaFirma(url, numeroProcesamiento) {
    
    var respuesta = "";
    var ajax = crearAjax();
    ajax.open('GET', url, true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            console.log('pintando ajax.status de recubirRespuestaFirma')
            console.log(ajax.status)
            if (ajax.status == 200) {
                respuesta = ajax.responseText;
                document.getElementById("respuesta").value = respuesta;
                enviarMensaje();
            } else if (ajax.status == 404) {
                document.getElementById("respuesta").value = '0';
                enviarMensaje();
            }
        }
    };
    
    ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    ajax.send();
}

function obtenerNumeroOperacion(urlServicio, tipoFirma, rutaEntrada, rutaSalida, nombreArchivo, servidorFirma, firmaHolografica, obtenerImagenHolograficaDesdeServidor, rutaImagenHolograficaServidor, motivo, pagina, posicionX, posicionY, sistema, correoElectronicoAsunto, correoElectronicoMensaje, adicionarQr, callback){
    var numeroProcesamiento = "";
    var metodo = "";
    var ajax = crearAjax();
    console.log('===============pintando ajax===========')
    console.log(ajax)
    console.log(ajax.readyState)
    console.log('==============fin pintando ajax===========')
    ajax.open('GET', urlServicio, false);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200) {
                numeroProcesamiento = ajax.responseText;
                var rutaSignFastClient = "SignFastClient://sign/$"                              + 
                                         tipoFirma                                              + "&" + 
                                         reemplazarSeparadorUrl(rutaEntrada)                    + "&" + 
                                         reemplazarSeparadorUrl(rutaSalida)                     + "&" + 
                                         nombreArchivo                                          + "&" + 
                                         numeroProcesamiento                                    + "&" + 
                                         servidorFirma                                          + "&" + 
                                         //"http://10.0.1.5:8443"                                 + "&" + 
                                         firmaHolografica                                       + "&" +
                                         obtenerImagenHolograficaDesdeServidor                  + "&" +
                                         reemplazarSeparadorUrl(rutaImagenHolograficaServidor)  + "&" +
                                         motivo                                                 + "&" +
                                         pagina                                                 + "&" +
                                         posicionX                                              + "&" +
                                         posicionY                                              + "&" +
                                         sistema                                                + "&" +
                                         correoElectronicoAsunto                                + "&" +
                                         correoElectronicoMensaje								+ "&" +
                                         adicionarQr;		
                
                location.href = rutaSignFastClient;
                
            } else if (ajax.status == 404) {
                numeroProcesamiento = "0";
            }
        }
    };
    
    ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    ajax.send();
    
    setTimeout(function(){
        var urlServer = servidorFirma + '/SignFastService/services/rest/GestionarProcesamientoFirmas/consultar/' + numeroProcesamiento;
        //callback(urlServer, numeroProcesamiento);
        recibirRespuestaFirma(urlServer, numeroProcesamiento);
    }, 2000);
    
    return numeroProcesamiento;
}

function crearAjax() {
    var xmlhttp = false;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        console.log('obtuvo Msxml2.XMLHTTP')
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            console.log('entró a catch obtuvo Microsoft.XMLHTTP')
            console.log(e)
        } catch (E) {
            if (!xmlhttp && typeof XMLHttpRequest != 'undefined'){
                xmlhttp = new XMLHttpRequest();
                console.log('entró a catch final, obtuvl xMLHttpRequest')
                console.log(E)
            }
        }
    }
    return xmlhttp;
}

function obtenerRespuestaFirma(respuestaFirma){
    return respuestaFirma.split("|");
}

function reemplazarSeparadorUrl(ruta) {
     
     var posicion = 0, length = ruta.length;
     
     for (posicion; posicion < length; posicion++) {
     
         ruta = ruta.replace("/", "Â»");
     
     }
     
     return ruta;
     
}

export default firmarDocumento;