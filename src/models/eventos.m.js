const mongoose = require("mongoose"); //requerimos libreria de mongo

const eventosSchema = new mongoose.Schema(
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
      type: Date,
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

module.exports = mongoose.model("eventos", eventosSchema, "eventos"); //primer argumento: nombre del modelo; segundo argumento: esquema; tercer argumento: nombre de la collection
