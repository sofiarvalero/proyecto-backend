const materiasModel = require("../models/materias.m.js");
const profesoresModel = require("../models/profesores.m.js");
const { autenticacion } = require("./jwt/autenticacion.js");

class profesoresControllers {
  async listar() {
    return new Promise(async (resolve, reject) => {
      try {
        const datos = await profesoresModel.find();
        if (!datos) {
          return reject("No hay Profesores Registrados");
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
        const dato = await profesoresModel.findById(id);
        if (dato) {
          return resolve(dato);
        }
        reject("No existe el profesor que estas buscando"); //enviamos respuesta de la promesa
      } catch (error) {
        return reject(error);
      }
    });
  }

  async agregar(profesor) {
    return new Promise(async (resolve, reject) => {
      try {
        const acceso = await autenticacion(profesor.token, ['director'])
        if (acceso != 'acceso permitido') {
          return reject(acceso)
        }
        const verificacionExiste = await profesoresModel.find({ nombre: profesor.nombre, cedula: profesor.cedula }); // Validamos que no se repitan los profesores
        if (verificacionExiste.length > 0) {
          return reject("Ya esta registrado el profesor");
        }
        const data = {
          nombre: profesor.nombre,
          telefono: Number(profesor.telefono),
          cedula: Number(profesor.cedula),
        } // Creamos el documento con los tipos de datos correctos
        const datos = await profesoresModel.create(data);
        if (datos) {
          return resolve(datos)
        }
        return reject("No se pudo agregar el profesor")
      } catch (error) {
        return reject(error);
      }
    });
  }

  async actualizar(id, profesor) {
    return new Promise(async (resolve, reject) => {
      try {
        const acceso = await autenticacion(profesor.token, ['director'])
        if (acceso != 'acceso permitido') {
          return reject(acceso)
        }
        const verificacionExisteId = await profesoresModel.findById(id); // Validamos que exista el profesor
        if (!verificacionExisteId) {
          return reject("No existe el profesor")
        }
        const verificacionExiste = await profesoresModel.find({ nombre: profesor.nombre, cedula: Number(profesor.cedula) }); // Validamos que no se repitan
        console.log(verificacionExiste)
        if (verificacionExiste.length > 0) {
          return reject("Ya existe este profesor");
        }
        const data = {
          nombre: profesor.nombre,
          cedula: Number(profesor.cedula),
          telefono: Number(profesor.telefono)
        } // Creamos el documento con los tipos de datos correctos
        const datos = await profesoresModel.findByIdAndUpdate(id, data);
        if (datos) {
          return resolve({
            _id: datos._id,
            nombre: profesor.nombre,
            cedula: Number(profesor.cedula),
            telefono: Number(profesor.telefono)
          })
        }
        return reject("No se pudo editar el profesor")
      } catch (error) {
        return reject(error);
      }
    });
  }

  async eliminar(id, profesor) {
    return new Promise(async (resolve, reject) => {
      try {
        const acceso = await autenticacion(profesor.token, ['director'])
        if (acceso != 'acceso permitido') {
          return reject(acceso)
        }
        const verificacionExisteId = await profesoresModel.findById(id); // Validamos que exista el profesor
        if (!verificacionExisteId) {
          return reject("No existe el profesor")
        }
        await materiasModel.updateMany({ profesorId: id }, { profesorId: "Sin profesor" })
        const datos = await profesoresModel.findByIdAndDelete(id); // Eliminamos la materia
        if (datos) {
          return resolve(datos)
        }
        return reject("No se pudo eliminar la materia")
      } catch (error) {
        return reject(error);
      }
    });
  }
}

module.exports = new profesoresControllers();
