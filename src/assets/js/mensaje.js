function CleanNumber(dtValue) {
    var dtRegex = new RegExp(/[^0-9.]+/g);
    return dtValue.replace(dtRegex, '');
}

function hola(numerador,denominador){
    var division=numerador/denominador
    console.log("entro a mensaje.js:" + division)
    return division;
    
}



export default hola
