const usuariosModel = require("../models/usuarios.m.js");
const bcrypt = require('bcrypt');
const crearToken = require("./jwt/crear.js");

class usuariosControllers {
    async registrar(usuario) {
        return new Promise(async (resolve, reject) => {
            try {
                const verificacionExiste = await usuariosModel.find({ usuario: usuario.usuario }); // Validamos que no se repitan los usuarios
                if (verificacionExiste.length > 0) {
                    return reject("Ya esta registrado ese usuario");
                }
                if (usuario.contraseña != usuario.contraseñaConfirmacion) {
                    return reject("Las contraseñas no coinciden");
                }
                if (usuario.rol != "director" && usuario.rol != "profesor") {
                    return reject("Roles permitidos: director o profesor");
                }
                const constraseñaCifrada = await bcrypt.hash(usuario.contraseña, 10); // Encriptamos la contraseña para guardarla en la db
                const data = {
                    usuario: usuario.usuario,
                    correo: usuario.correo,
                    contraseña: constraseñaCifrada,
                    rol: usuario.rol,
                }
                const datos = await usuariosModel.create(data); // Creamos el usuario
                if (datos) {
                    return resolve(datos)
                }
                return reject("No se pudo registrar el usuario")
            } catch (error) {
                return reject(error);
            }
        });
    }

    async acceder(usuario) {
        return new Promise(async (resolve, reject) => {
            try {
                const usuarioAcceder = await usuariosModel.findOne({ usuario: usuario.usuario, }); // Verificamos si existe el usuario
                if (!usuarioAcceder) {
                    return reject("El usuario no existe");
                }
                const contraseñaValida = await bcrypt.compare(
                    usuario.contraseña,
                    usuarioAcceder.contraseña
                ); // Comparamos las contraseñas si son iguales
                if (!contraseñaValida) {
                    return reject("La contraseña es incorrecta");
                };
                let token = crearToken({
                    id: usuarioAcceder._id,
                    usuario: usuarioAcceder.usuario,
                    rol: usuarioAcceder.rol,
                });
                resolve({
                    token: token,
                    usuario: usuarioAcceder.usuario
                })
            } catch (error) {
                return reject(error);
            }
        });
    }
}

module.exports = new usuariosControllers();
