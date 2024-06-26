const mongoose = require("mongoose"); //requerimos libreria de mongo

const eventosGloblalesSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.ObjectId,
    tipo: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    fecha: {
        type: String,
        required: true
    }
  },
  {
    versionKey: false, //para evitar el __v al agregar datos
  }
);

module.exports = mongoose.model("eventosGloblales", eventosGloblalesSchema, "eventosGloblales"); //primer argumento: nombre del modelo; segundo argumento: esquema; tercer argumento: nombre de la collection
