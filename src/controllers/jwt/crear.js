const jwt = require('jsonwebtoken');

function crearToken(datos) {
    const expiracionTiempo = new Date(Date.now() + (10 * 60 * 6000)); // La duracion es de 1 hora en milisegundos
    const accesoToken = jwt.sign({
        exp: Math.floor(expiracionTiempo / 1000), // Aqui los milisegundos se transforman a 1 hora al dividirlos entre 1000
        data: datos
    }, process.env.SECRET);
    return accesoToken;
}

module.exports = crearToken;