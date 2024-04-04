const eventosModel = require("../models/eventos.m.js");
const eventosGloblalesM = require("../models/eventosGloblales.m.js");
const eventosSeccionesM = require("../models/eventosSecciones.m.js");
const materiasM = require("../models/materias.m.js");
const seccionesM = require("../models/secciones.m.js");
const { autenticacion } = require("./jwt/autenticacion.js");

class eventosControllers {
  async listar() {
    return new Promise(async (resolve, reject) => {
      try {
        const datos = await eventosSeccionesM.find();
        const datos2 = await eventosGloblalesM.find();
        const datos3 = await eventosModel.find();
        if (!datos) {
          return reject("No hay Eventos Registrados");
        }
        resolve({eventosSecciones: datos, eventosGlobales: datos2, eventosMaterias: datos3}); //enviamos respuesta de la promesa
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

  // Agregar Evento Global
  async agregarEventoGlobal(evento) {
    return new Promise(async (resolve, reject) => {
      try {
        const acceso = await autenticacion(evento.token, ["director"]);
        if (acceso.mensaje != "acceso permitido") {
          return reject(acceso.mensaje);
        }
        let data = {};
        data = {
          tipo: evento.tipo,
          descripcion: evento.descripcion,
          fecha: evento.fecha,
        }; // Creamos el documento con los tipos de datos correctos

        const datos = await eventosGloblalesM.create(data);
        if (datos) {
          return resolve(datos);
        }
        return reject("No se pudo agregar el evento");
      } catch (error) {
        console.log(error);
        return reject(error);
      }
    });
  }

  // Agregar Evento a una seccion
  async agregarEventoSeccion(evento) {
    return new Promise(async (resolve, reject) => {
      try {
        const acceso = await autenticacion(evento.token, [
          "profesor",
          "director",
        ]);
        if (acceso.mensaje != "acceso permitido") {
          return reject(acceso.mensaje);
        }
        let data = {};

        const verificiacionSeccion = await seccionesM.find({
          nombre: evento.seccion,
        }); // Validamos que exista la Seccion
        if (verificiacionSeccion.length === 0) {
          return reject("No existe la Seccion que deseas agregar el evento");
        }
        data = {
          tipo: evento.tipo,
          descripcion: evento.descripcion,
          fecha: evento.fecha,
          seccion: evento.seccion,
        }; // Creamos el documento con los tipos de datos correctos

        const datos = await eventosSeccionesM.create(data);
        if (datos) {
          return resolve(datos);
        }
        return reject("No se pudo agregar el evento");
      } catch (error) {
        console.log(error);
        return reject(error);
      }
    });
  }

  // Crea evento para Materia
  async agregarEventoMateria(evento) {
    return new Promise(async (resolve, reject) => {
      try {
        const acceso = await autenticacion(evento.token, [
          "profesor",
          "director",
        ]);
        if (acceso.mensaje != "acceso permitido") {
          return reject(acceso.mensaje);
        }
        let data = {};
        const verificiacionMateria = await materiasM.find({
          nombre: evento.materia,
        }); // Validamos que exista la Seccion
        if (verificiacionMateria.length === 0) {
          return reject("No existe la Materia que deseas agregar el evento");
        }
        data = {
          tipo: evento.tipo,
          descripcion: evento.descripcion,
          materia: evento.materia,
        }; // Creamos el documento con los tipos de datos correctos

        const datos = await eventosModel.create(data);
        if (datos) {
          return resolve(datos);
        }
        return reject("No se pudo agregar el evento");
      } catch (error) {
        console.log(error);
        return reject(error);
      }
    });
  }

  async actualizar(id, evento) {
    return new Promise(async (resolve, reject) => {
      try {
        const acceso = await autenticacion(evento.token, [
          "profesor",
          "director",
        ]);
        if (acceso.mensaje != "acceso permitido") {
          return reject(acceso.mensaje);
        }
        const verificacionExisteId = await eventosModel.findById(id); // Validamos que exista el evento a editar
        if (!verificacionExisteId) {
          return reject("No existe el evento");
        }
        const data = {
          tipo: evento.tipo,
          descripcion: evento.descripcion,
          fecha: evento.fecha,
        }; // Creamos el documento con los tipos de datos correctos
        const datos = await eventosModel.findByIdAndUpdate(id, data);
        if (datos) {
          return resolve({
            _id: datos._id,
            tipo: evento.tipo,
            descripcion: evento.descripcion,
            fecha: evento.fecha,
          });
        }
        return reject("No se pudo editar el evento");
      } catch (error) {
        return reject(error);
      }
    });
  }

  async eliminar(id, evento) {
    return new Promise(async (resolve, reject) => {
      try {
        const acceso = await autenticacion(evento.token, [
          "profesor",
          "director",
        ]);
        if (acceso.mensaje != "acceso permitido") {
          return reject(acceso.mensaje);
        }
        const verificacionExisteId = await eventosModel.findById(id); // Validamos que exista el evento a eliminar
        if (!verificacionExisteId) {
          return reject("No existe el evento");
        }
        const datos = await eventosModel.findByIdAndDelete(id); // Eliminamos el evento
        if (datos) {
          return resolve(datos);
        }
        return reject("No se pudo eliminar el evento");
      } catch (error) {
        return reject(error);
      }
    });
  }
}

module.exports = new eventosControllers();
