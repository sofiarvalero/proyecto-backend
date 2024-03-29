const mongoose = require("mongoose"); //requerimos libreria de mongo

const usuariosSchema = new mongoose.Schema(
    {
        id: mongoose.Schema.ObjectId,
        usuario: {
            type: String,
            required: true,
        },
        correo: {
            type: String,
            required: true,
        },
        rol: {
            type: String,
            required: true,
        },
        contraseña: {
            type: String,
            required: true,
        },
    },
    {
        versionKey: false, //para evitar el __v al agregar datos
    }
);

module.exports = mongoose.model("usuarios", usuariosSchema, "usuarios"); //primer argumento: nombre del modelo; segundo argumento: esquema; tercer argumento: nombre de la collection
