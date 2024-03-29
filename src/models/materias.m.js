const mongoose = require("mongoose"); //requerimos libreria de mongo

const materiasSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.ObjectId,
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    profesorId: {
      type: String,
      required: true,
    },
    creditos: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false, //para evitar el __v al agregar datos
  }
);

module.exports = mongoose.model("materias", materiasSchema, "materias"); //primer argumento: nombre del modelo; segundo argumento: esquema; tercer argumento: nombre de la collection
