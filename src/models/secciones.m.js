const mongoose = require("mongoose"); //requerimos libreria de mongo

const seccionesSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.ObjectId,
    nombre: {
      type: String,
      required: true,
    },
    alumnos: {
      type: Number,
      required: true,
    },
    materiaId: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false, //para evitar el __v al agregar datos
  }
);

module.exports = mongoose.model("secciones", seccionesSchema, "secciones"); //primer argumento: nombre del modelo; segundo argumento: esquema; tercer argumento: nombre de la collection
