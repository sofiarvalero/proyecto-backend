const mongoose = require("mongoose"); //requerimos libreria de mongo

const profesoresSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.ObjectId,
    nombre: {
      type: String,
      required: true,
    },
    telefono: {
      type: Number,
      required: true,
    },
    cedula: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false, //para evitar el __v al agregar datos
  }
);

module.exports = mongoose.model("profesores", profesoresSchema, "profesores"); //primer argumento: nombre del modelo; segundo argumento: esquema; tercer argumento: nombre de la collection
