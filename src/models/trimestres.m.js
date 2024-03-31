const mongoose = require("mongoose"); //requerimos libreria de mongo

const trimestresSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.ObjectId,
    nombre: {
      type: String,
      required: true,
    },
    duracion: {
      type: String,
      default: '14 Semanas'
    }
  },
  {
    versionKey: false, //para evitar el __v al agregar datos
  }
);

module.exports = mongoose.model("trimestres", trimestresSchema, "trimestres"); //primer argumento: nombre del modelo; segundo argumento: esquema; tercer argumento: nombre de la collection
