const seccionesM = require("../models/secciones.m.js");
const trimestresModel = require("../models/trimestres.m.js");
const { autenticacion } = require("./jwt/autenticacion.js");

class trimestresControllers {
  async listar() {
    return new Promise(async (resolve, reject) => {
      try {
        const datos = await trimestresModel.find();
        if (!datos) {
          return reject("No hay Trimestres Registrados");
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
        const dato = await trimestresModel.findById(id);
        if (dato) {
          return resolve(dato);
        }
        reject("No existe el trimestre que estas buscando"); //enviamos respuesta de la promesa
      } catch (error) {
        return reject(error);
      }
    });
  }

  async agregar(trimestre) {
    return new Promise(async (resolve, reject) => {
      try {
        const acceso = await autenticacion(trimestre.token, ["director"]);
        if (acceso.mensaje != "acceso permitido") {
          return reject(acceso.mensaje);
        }
        const verificacionExiste = await trimestresModel.find({
          nombre: trimestre.nombre,
        }); // Validamos que no se repitan los trimestres
        if (verificacionExiste.length > 0) {
          return reject("Ya existe un trimestre con ese nombre");
        }

        // Calcular duracion del trimestre desde la fecha de inicio para que sean 14 semanas
        //la fecha
        var TuFecha = new Date(trimestre.inicio);

        //dias a sumar
        var dias = 98;

        //nueva fecha sumada
        TuFecha.setDate(TuFecha.getDate() + dias);
        //formato de salida para la fecha
        var fechafin = ""
        if ((TuFecha.getMonth() + 1) > 9 && (TuFecha.getDate()) > 9) {
          fechafin = TuFecha.getFullYear() + "-" + (TuFecha.getMonth() + 1) + "-" + TuFecha.getDate();
        }
        if ((TuFecha.getMonth() + 1) < 9 && (TuFecha.getDate()) > 9) {
          fechafin = TuFecha.getFullYear() + "-" + "0" + (TuFecha.getMonth() + 1) + "-" + TuFecha.getDate();
        }
        if ((TuFecha.getMonth() + 1) > 9 && (TuFecha.getDate()) < 9) {
          fechafin = TuFecha.getFullYear() + "-" + (TuFecha.getMonth() + 1) + "-0" + TuFecha.getDate();
        }
        if ((TuFecha.getMonth() + 1) < 9 && (TuFecha.getDate()) < 9) {
          fechafin = TuFecha.getFullYear() + "-" + "0" + (TuFecha.getMonth() + 1) + "-0" + TuFecha.getDate();
        }

        const data = {
          nombre: trimestre.nombre, inicio: trimestre.inicio, fin: fechafin
        }; // Creamos el documento con los tipos de datos correctos
        const datos = await trimestresModel.create(data);
        if (datos) {
          return resolve(datos);
        }
        return reject("No se pudo agregar el trimestre");
      } catch (error) {
        return reject(error);
      }
    });
  }

  async actualizar(id, trimestre) {
    return new Promise(async (resolve, reject) => {
      try {
        const acceso = await autenticacion(trimestre.token, ["director"]);
        if (acceso.mensaje != "acceso permitido") {
          return reject(acceso.mensaje);
        }
        const verificacionExisteId = await trimestresModel.findById(id); // Validamos que exista el trimestre a editar
        if (!verificacionExisteId) {
          return reject("No existe el trimestre");
        }
        const verificacionExiste = await trimestresModel.find({
          nombre: trimestre.nombre,
        }); // Validamos que no se repitan los trimestres
        if (verificacionExiste.length > 0) {
          return reject("Ya existe un trimestre con ese nombre");
        }
        const data = {
          nombre: trimestre.nombre,
        }; // Creamos el documento con los tipos de datos correctos
        const datos = await trimestresModel.findByIdAndUpdate(id, data);
        if (datos) {
          await seccionesM.updateMany(
            { trimestre: verificacionExisteId.nombre },
            { trimestre: trimestre.nombre }
          );
          return resolve({
            _id: datos._id,
            nombre: trimestre.nombre,
          });
        }
        return reject("No se pudo editar el trimestre");
      } catch (error) {
        return reject(error);
      }
    });
  }

  async eliminar(id, trimestre) {
    return new Promise(async (resolve, reject) => {
      try {
        const acceso = await autenticacion(trimestre.token, ["director"]);
        if (acceso.mensaje != "acceso permitido") {
          return reject(acceso.mensaje);
        }
        const verificacionExisteId = await trimestresModel.findById(id); // Validamos que exista el trimestre a eliminar
        if (!verificacionExisteId) {
          return reject("No existe el trimestre");
        }
        const datos = await trimestresModel.findByIdAndDelete(id); // Eliminamos el trimestre
        if (datos) {
          await seccionesM.deleteMany({
            trimestre: verificacionExisteId.nombre,
          });
          return resolve(datos);
        }
        return reject("No se pudo eliminar el trimestre");
      } catch (error) {
        return reject(error);
      }
    });
  }
}

module.exports = new trimestresControllers();
