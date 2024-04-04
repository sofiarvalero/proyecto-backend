const eventosSeccionesM = require("../models/eventosSecciones.m.js");
const materiasModel = require("../models/materias.m.js");
const profesoresModel = require("../models/profesores.m.js");
const seccionesModel = require("../models/secciones.m.js");
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

  async listarConMateriasSecciones() {
    return new Promise(async (resolve, reject) => {
      try {
        let data = []
        const profesores = await profesoresModel.find();
        for (let i = 0; i < profesores.length; i++) {
          const materias = await materiasModel.find({ profesor: profesores[i].nombre });
          const secciones = await seccionesModel.find({ profesor: profesores[i].nombre })
          data.push({
            profesor: profesores[i],
            materias: materias,
            secciones: secciones
          })
        }
        resolve(data)
      } catch (error) {
        return reject(error);
      }
    });
  }

  async eventosProfesorSemanas() {
    return new Promise(async (resolve, reject) => {
      try {
        //Creamos la fecha de hoy
        var fecha = new Date();
        let fechaInicio = ''
        if ((fecha.getMonth() + 1) > 9 && (fecha.getDate()) > 9) {
          fechaInicio = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
        }
        if ((fecha.getMonth() + 1) < 9 && (fecha.getDate()) > 9) {
          fechaInicio = fecha.getFullYear() + "-" + "0" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
        }
        if ((fecha.getMonth() + 1) > 9 && (fecha.getDate()) < 9) {
          fechaInicio = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-0" + fecha.getDate();
        }
        if ((fecha.getMonth() + 1) < 9 && (fecha.getDate()) < 9) {
          fechaInicio = fecha.getFullYear() + "-" + "0" + (fecha.getMonth() + 1) + "-0" + fecha.getDate();
        }
        var fechaNueva = new Date(fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate());
        //dias a sumar
        var dias = 14;
        //nueva fecha 
        fechaNueva.setDate(fechaNueva.getDate() + dias);

        let fechaFin = ''
        if ((fechaNueva.getMonth() + 1) > 9 && (fechaNueva.getDate()) > 9) {
          fechaFin = fechaNueva.getFullYear() + "-" + (fechaNueva.getMonth() + 1) + "-" + fechaNueva.getDate();
        }
        if ((fechaNueva.getMonth() + 1) < 9 && (fechaNueva.getDate()) > 9) {
          fechaFin = fechaNueva.getFullYear() + "-" + "0" + (fechaNueva.getMonth() + 1) + "-" + fechaNueva.getDate();
        }
        if ((fechaNueva.getMonth() + 1) > 9 && (fechaNueva.getDate()) < 9) {
          fechaFin = fechaNueva.getFullYear() + "-" + (fechaNueva.getMonth() + 1) + "-0" + fechaNueva.getDate();
        }
        if ((fechaNueva.getMonth() + 1) < 9 && (fechaNueva.getDate()) < 9) {
          fechaFin = fechaNueva.getFullYear() + "-" + "0" + (fechaNueva.getMonth() + 1) + "-0" + fechaNueva.getDate();
        }
        const profesores = await profesoresModel.find();
        let data = []
        for (let i = 0; i < profesores.length; i++) {
          const secciones = await seccionesModel.find({ profesor: profesores[i].nombre })
          let dataEventos = []
          for (let a = 0; a < secciones.length; a++) {
            const eventos = await eventosSeccionesM.find({ seccion: secciones[a].nombre })
            for (let e = 0; e < eventos.length; e++) {

              if (eventos[e].fecha >= fechaInicio && eventos[e].fecha <= fechaInicio) {
                dataEventos.push(eventos[e])
              }

            }
          }

          data.push({
            profesor: profesores[i],
            eventos: dataEventos
          })

        }

        resolve(data)
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
        if (acceso.mensaje != "acceso permitido") {
          return reject(acceso.mensaje);
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
        if (acceso.mensaje != "acceso permitido") {
          return reject(acceso.mensaje);
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
        if (acceso.mensaje != "acceso permitido") {
          return reject(acceso.mensaje);
        }
        const verificacionExisteId = await profesoresModel.findById(id); // Validamos que exista el profesor
        if (!verificacionExisteId) {
          return reject("No existe el profesor")
        }
        await materiasModel.updateMany({ profesor: verificacionExisteId.nombre }, { profesor: "Sin profesor" })
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
