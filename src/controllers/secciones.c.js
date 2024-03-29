const materiasModel = require("../models/materias.m.js");
const seccionesModel = require("../models/secciones.m.js");
const { autenticacion } = require("./jwt/autenticacion.js");

class seccionesControllers {
  async listar() {
    return new Promise(async (resolve, reject) => {
      try {
        const datos = await seccionesModel.find();
        if (!datos) {
          return reject("No hay Secciones Registradas");
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
        const dato = await seccionesModel.findById(id);
        if (dato) {
          return resolve(dato);
        }
        reject("No existe la seccion que estas buscando"); //enviamos respuesta de la promesa
      } catch (error) {
        return reject(error);
      }
    });
  }

  async agregar(seccion) {
    return new Promise(async (resolve, reject) => {
      try {
        const acceso = await autenticacion(seccion.token, ['director'])
        if (acceso != 'acceso permitido') {
          return reject(acceso)
        }
        const verificacionExiste = await seccionesModel.find({nombre: seccion.nombre}); // Validamos que no se repitan las secciones
        if (verificacionExiste.length > 0) {
            return reject("Ya existe una materia con ese nombre");
        }
        const verificiacionMateria= await materiasModel.findById(seccion.materiaId); // Validamos que exista la materia
        if (!verificiacionMateria) {
            return reject("No existe la Materia que deseas agregar la seccón")
        }
        const data = {
            nombre: seccion.nombre,
            alumnos: Number(seccion.alumnos),
            materiaId: seccion.materiaId
        } // Creamos el documento con los tipos de datos correctos
        const datos = await seccionesModel.create(data);
        if (datos) {
            return resolve(datos)
        }
        return reject("No se pudo agregar la sección")
      } catch (error) {
        return reject(error);
      }
    });
  }

  async actualizar(id, seccion) {
    return new Promise(async (resolve, reject) => {
      try {
        const acceso = await autenticacion(seccion.token, ['director'])
        if (acceso != 'acceso permitido') {
          return reject(acceso)
        }
        const verificacionExisteId = await seccionesModel.findById(id); // Validamos que exista la seccion a editar
        if (!verificacionExisteId) {
            return reject("No existe la sección")
        }
        const verificacionExiste = await seccionesModel.find({nombre: seccion.nombre}); // Validamos que no se repitan las secciones
        if (verificacionExiste.length >= 1) {
            return reject("Ya existe una seccion con ese nombre");
        }
        const verificiacionMateria= await materiasModel.findById(seccion.materiaId); // Validamos que exista la materia
        if (!verificiacionMateria) {
            return reject("No existe la materia que pertenece la sección")
        }
        const data = {
            nombre: seccion.nombre,
            alumnos: Number(seccion.alumnos),
            materiaId: seccion.materiaId
        } // Creamos el documento con los tipos de datos correctos
        const datos = await seccionesModel.findByIdAndUpdate(id, data);
        if (datos) {
            return resolve({
                _id: datos._id,
                nombre: seccion.nombre,
                alumnos: Number(seccion.alumnos),
                materiaId: seccion.materiaId
            })
        }
        return reject("No se pudo editar la sección")
      } catch (error) {
        return reject(error);
      }
    });
  }

  async eliminar(id, seccion) {
    return new Promise(async (resolve, reject) => {
      try {
        const acceso = await autenticacion(seccion.token, ['director'])
        if (acceso != 'acceso permitido') {
          return reject(acceso)
        }
        const verificacionExisteId = await seccionesModel.findById(id); // Validamos que exista la seccion a eliminar
        if (!verificacionExisteId) {
            return reject("No existe la seccion")
        }
        const datos = await seccionesModel.findByIdAndDelete(id); // Eliminamos la materia
        if (datos) {
            return resolve(datos)
        }
        return reject("No se pudo eliminar la seccion")
      } catch (error) {
        return reject(error);
      }
    });
  }
}

module.exports = new seccionesControllers();
