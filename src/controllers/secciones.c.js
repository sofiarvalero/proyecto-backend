const eventosM = require("../models/eventos.m.js");
const eventosSeccionesM = require("../models/eventosSecciones.m.js");
const materiasModel = require("../models/materias.m.js");
const profesoresM = require("../models/profesores.m.js");
const seccionesModel = require("../models/secciones.m.js");
const trimestresM = require("../models/trimestres.m.js");
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

  async listarEventosSeccion(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const seccion = await seccionesModel.findById(id);
        const eventos = await eventosSeccionesM.find({seccion: seccion.nombre})
        const materia = await materiasModel.findOne({nombre: seccion.materia})

        resolve({
          seccion: seccion,
          eventosSeccion: eventos,
          profesor: materia.profesor
        })
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

  async asignarProfesorSeccion(profesor, id) {
    return new Promise(async (resolve, reject) => {
      try {
        const existeProfesor = await profesoresM.findOne({nombre: profesor.nombre})
        if (!existeProfesor) {
          return reject("No existe el profesor que quieres asignar a la seccion")
        }
        const seccionAnterior = await seccionesModel.findById(id)
        const seccionEditada = await seccionesModel.findByIdAndUpdate(id, {
          nombre: seccionAnterior.nombre,
          alumnos: Number(seccionAnterior.alumnos),
          materia: seccionAnterior.materia,
          trimestre: seccionAnterior.trimestre,
          profesor: profesor.nombre
        })

        if (seccionEditada) {
          return resolve({
            nombre: seccionAnterior.nombre,
            alumnos: Number(seccionAnterior.alumnos),
            materia: seccionAnterior.materia,
            trimestre: seccionAnterior.trimestre,
            profesor: profesor.nombre
          })
        }
        reject("No se pudo editar la asociacion por algun error inesperado")
      } catch (error) {
        return reject(error);
      }
    });
  }

  async agregar(seccion) {
    return new Promise(async (resolve, reject) => {
      try {
        const acceso = await autenticacion(seccion.token, ["director"]);
        if (acceso.mensaje != "acceso permitido") {
          return reject(acceso.mensaje);
        }
        const verificacionExiste = await seccionesModel.find({
          nombre: seccion.nombre,
        }); // Validamos que no se repitan las secciones
        if (verificacionExiste.length > 0) {
          return reject("Ya existe una materia con ese nombre");
        }
        const verificiacionMateria = await materiasModel.find({
          nombre: seccion.materia,
        }); // Validamos que exista la materia
        if (verificiacionMateria.length === 0) {
          return reject("No existe la Materia que deseas agregar la seccón");
        }
        const verificiacionTrimestre = await trimestresM.find({
          nombre: seccion.trimestre,
        }); // Validamos que exista el trimestre
        if (verificiacionTrimestre.length === 0) {
          return reject("No existe el Trimestre que deseas agregar la seccón");
        }
        const data = {
          nombre: seccion.nombre,
          alumnos: Number(seccion.alumnos),
          materia: seccion.materia,
          trimestre: seccion.trimestre,
        }; // Creamos el documento con los tipos de datos correctos
        const datos = await seccionesModel.create(data);
        if (datos) {
          return resolve(datos);
        }
        return reject("No se pudo agregar la sección");
      } catch (error) {
        return reject(error);
      }
    });
  }

  async actualizar(id, seccion) {
    return new Promise(async (resolve, reject) => {
      try {
        const acceso = await autenticacion(seccion.token, ["director"]);
        if (acceso.mensaje != "acceso permitido") {
          return reject(acceso.mensaje);
        }
        const verificacionExisteId = await seccionesModel.findById(id); // Validamos que exista la seccion a editar
        if (!verificacionExisteId) {
          return reject("No existe la sección");
        }
        const verificacionExiste = await seccionesModel.find({
          nombre: seccion.nombre,
        }); // Validamos que no se repitan las secciones
        if (verificacionExiste.length >= 1) {
          return reject("Ya existe una seccion con ese nombre");
        }
        const data = {
          nombre: seccion.nombre,
          alumnos: Number(seccion.alumnos),
        }; // Creamos el documento con los tipos de datos correctos
        const datos = await seccionesModel.findByIdAndUpdate(id, data);
        if (datos) {
          await eventosM.updateMany(
            { seccion: verificacionExisteId.nombre },
            { seccion: seccion.nombre }
          );
          return resolve({
            _id: datos._id,
            nombre: seccion.nombre,
            alumnos: Number(seccion.alumnos),
          });
        }
        return reject("No se pudo editar la sección");
      } catch (error) {
        return reject(error);
      }
    });
  }

  async eliminar(id, seccion) {
    return new Promise(async (resolve, reject) => {
      try {
        const acceso = await autenticacion(seccion.token, ["director"]);
        if (acceso.mensaje != "acceso permitido") {
          return reject(acceso.mensaje);
        }
        const verificacionExisteId = await seccionesModel.findById(id); // Validamos que exista la seccion a eliminar
        if (!verificacionExisteId) {
          return reject("No existe la seccion");
        }
        const datos = await seccionesModel.findByIdAndDelete(id); // Eliminamos la materia
        if (datos) {
          await eventosSeccionesM.deleteMany({
            seccion: verificacionExisteId.nombre,
          });
          return resolve(datos);
        }
        return reject("No se pudo eliminar la seccion");
      } catch (error) {
        return reject(error);
      }
    });
  }
}

module.exports = new seccionesControllers();
