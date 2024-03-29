const mongoose = require('mongoose');
require('dotenv').config();
const db_URL = process.env.DATABASE

// const db_URL = `mongodb://127.0.0.1:27017/hazbinhotel`

module.exports = () => {
    const conexion = () => {
        mongoose.connect(db_URL)
        .then(() => console.log('Conectado a MongoDB'))
        .catch(err => console.error('Error de Conexión: ' + err.stack));
    }
    conexion();
};