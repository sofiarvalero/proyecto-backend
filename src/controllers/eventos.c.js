const eventosModel = require('../models/eventos.m.js');
const materiasModel = require("../models/materias.m.js");
const { autenticacion } = require('./jwt/autenticacion.js');

class eventosControllers {
  async listar() {
    return new Promise(async (resolve, reject) => {
      try {
        const datos = await eventosModel.find();
        if (!datos) {
          return reject("No hay Eventos Registrados");
        }
        resolve(datos); //enviamos respuesta de la promesa
      } catch (error) {
        return reject(error);
      }
    });
  }

  async listarUna(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const dato = await eventosModel.findById(id);
        if (dato) {
          return resolve(dato);
        }
        reject("No existe el evento que estas buscando"); //enviamos respuesta de la promesa
      } catch (error) {
        return reject(error);
      }
    });
  }

  async agregar(evento) {
    return new Promise(async (resolve, reject) => {
      try {
        const acceso = await autenticacion(evento.token, ['profesor', 'director'])
        if (acceso != 'acceso permitido') {
          return reject(acceso)
        }
        const verificiacionMateria = await materiasModel.findById(evento.materiaId); // Validamos que exista la materia
        if (!verificiacionMateria) {
          return reject("No existe la Materia que deseas agregar el evento")
        }
        const data = {
          tipo: evento.tipo,
          descripcion: evento.descripcion,
          fecha: evento.fecha.toLocaleString("es-ES"), // El formato de entrada debe ser YYYY-MM-DD
          materiaId: evento.materiaId
        } // Creamos el documento con los tipos de datos correctos
        const datos = await eventosModel.create(data);
        if (datos) {
          return resolve(datos)
        }
        return reject("No se pudo agregar el evento")
      } catch (error) {
        return reject(error);
      }
    });
  }

  async actualizar(id, evento) {
    return new Promise(async (resolve, reject) => {
      try {
        const acceso = await autenticacion(evento.token, ['profesor', 'director'])
        if (acceso != 'acceso permitido') {
          return reject(acceso)
        }
        const verificacionExisteId = await eventosModel.findById(id); // Validamos que exista el evento a editar
        if (!verificacionExisteId) {
          return reject("No existe el evento")
        }
        const verificiacionMateria = await materiasModel.findById(evento.materiaId); // Validamos que exista la materia
        if (!verificiacionMateria) {
          return reject("No existe la materia para editar el evento")
        }
        const data = {
          tipo: evento.tipo,
          descripcion: evento.descripcion,
          fecha: evento.fecha.toLocaleString("es-ES"), // El formato de entrada debe ser YYYY-MM-DD
          materiaId: evento.materiaId
        } // Creamos el documento con los tipos de datos correctos
        const datos = await eventosModel.findByIdAndUpdate(id, data);
        if (datos) {
          return resolve({
            _id: datos._id,
            tipo: evento.tipo,
            descripcion: evento.descripcion,
            fecha: evento.fecha.toLocaleString("es-ES"), // El formato de entrada debe ser YYYY-MM-DD
            materiaId: evento.materiaId
          })
        }
        return reject("No se pudo editar el evento")
      } catch (error) {
        return reject(error);
      }
    });
  }

  async eliminar(id, evento) {
    return new Promise(async (resolve, reject) => {
      try {
        const acceso = await autenticacion(evento.token, ['profesor', 'director'])
        if (acceso != 'acceso permitido') {
          return reject(acceso)
        }
        const verificacionExisteId = await eventosModel.findById(id); // Validamos que exista el evento a eliminar
        if (!verificacionExisteId) {
          return reject("No existe el evento")
        }
        const datos = await eventosModel.findByIdAndDelete(id); // Eliminamos el evento
        if (datos) {
          return resolve(datos)
        }
        return reject("No se pudo eliminar el evento")
      } catch (error) {
        return reject(error);
      }
    });
  }
}

module.exports = new eventosControllers();