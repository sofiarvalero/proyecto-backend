const materiasModel = require("../models/materias.m.js");
const profesoresModel = require("../models/profesores.m.js");
const seccionesModel = require("../models/secciones.m.js");
const eventosModel = require("../models/eventos.m.js");
const { autenticacion } = require("./jwt/autenticacion.js");

class materiasControllers {
  async listar() {
    return new Promise(async (resolve, reject) => {
      try {
        const datos = await materiasModel.find();
        if (!datos) {
          return reject("No hay Materias Registradas");
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
        const dato = await materiasModel.findById(id);
        if (dato) {
          return resolve(dato);
        }
        reject("No existe la materia que estas buscando"); //enviamos respuesta de la promesa
      } catch (error) {
        return reject(error);
      }
    });
  }

  async agregar(materia) {
    return new Promise(async (resolve, reject) => {
      try {
        const acceso = await autenticacion(materia.token, ['director'])
        if (acceso != 'acceso permitido') {
          return reject(acceso)
        }
        const verificacionExiste = await materiasModel.find({ nombre: materia.nombre }); // Validamos que no se repitan las materias
        if (verificacionExiste.length > 0) {
          return reject("Ya existe una materia con ese nombre");
        }
        const verificiacionProfesor = await profesoresModel.findById(materia.profesorId); // Validamos que exista el profesor
        if (!verificiacionProfesor) {
          return reject("No existe el profesor que dará esta materia")
        }
        const data = {
          nombre: materia.nombre,
          descripcion: materia.descripcion,
          profesorId: materia.profesorId,
          creditos: Number(materia.creditos)
        } // Creamos el documento con los tipos de datos correctos
        const datos = await materiasModel.create(data);
        if (datos) {
          return resolve(datos)
        }
        return reject("No se pudo agregar la materia")
      } catch (error) {
        return reject(error);
      }
    });
  }

  async actualizar(id, materia) {
    return new Promise(async (resolve, reject) => {
      try {
        const acceso = await autenticacion(materia.token, ['director'])
        if (acceso != 'acceso permitido') {
          return reject(acceso)
        }
        const verificacionExisteId = await materiasModel.findById(id); // Validamos que exista la materia a editar
        if (!verificacionExisteId) {
          return reject("No existe la materia")
        }
        const verificacionExiste = await materiasModel.find({ nombre: materia.nombre }); // Validamos que no se repitan las materias
        if (verificacionExiste.length > 1) {
          return reject("Ya existe una materia con ese nombre");
        }
        const verificiacionProfesor = await profesoresModel.findById(materia.profesorId); // Validamos que exista el profesor
        if (!verificiacionProfesor) {
          return reject("No existe el profesor que dará esta materia")
        }
        const data = {
          nombre: materia.nombre,
          descripcion: materia.descripcion,
          profesorId: materia.profesorId,
          creditos: Number(materia.creditos)
        } // Creamos el documento con los tipos de datos correctos
        const datos = await materiasModel.findByIdAndUpdate(id, data);
        if (datos) {
          return resolve({
            _id: datos._id,
            nombre: materia.nombre,
            descripcion: materia.descripcion,
            profesorId: materia.profesorId,
            creditos: Number(materia.creditos)
          })
        }
        return reject("No se pudo editar la materia")
      } catch (error) {
        return reject(error);
      }
    });
  }

  async eliminar(id, materia) {
    return new Promise(async (resolve, reject) => {
      try {
        const acceso = await autenticacion(materia.token, ['director'])
        if (acceso != 'acceso permitido') {
          return reject(acceso)
        }
        const verificacionExisteId = await materiasModel.findById(id); // Validamos que exista la materia a eliminar
        if (!verificacionExisteId) {
          return reject("No existe la materia")
        }
        const datos = await materiasModel.findByIdAndDelete(id); // Eliminamos la materia
        if (datos) {
          await seccionesModel.deleteMany({materiaId: id})
          await eventosModel.deleteMany({materiaId: id})
          return resolve(datos)
        }
        return reject("No se pudo eliminar la materia")
      } catch (error) {
        return reject(error);
      }
    });
  }
}

module.exports = new materiasControllers();
