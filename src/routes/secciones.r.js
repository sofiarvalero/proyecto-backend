const express = require('express');
const router = express.Router();
const seccionesControllers = require('../controllers/secciones.c')

// Listar secciones
router.get('/', function(req, res, next) {
    seccionesControllers.listar()
    .then((resultado) => {
        res.render('secciones', {secciones: resultado})
        //res.status(200).json({"secciones": resultado, "mensaje": "Listado con éxito las secciones"})
    })
    .catch((error) => {
        res.status(400).json({"error": error})
    })
});

// Listar Una secciones
router.get("/:id", function (req, res, next) {
    seccionesControllers.listarUna(req.params.id)
    .then((resultado) => {
        res.status(200).json({"secciones": resultado, "mensaje": "Listado con éxito la seccion"})
    })
    .catch((error) => {
        res.status(400).json({"error": error})
    })
});

// Listar los eventos de una seccion
router.get("/eventos/:id", function (req, res, next) {
    seccionesControllers.listarEventosSeccion(req.params.id)
    .then((resultado) => {
        res.render('seccionEventos', {secciones: resultado})
        // res.status(200).json({"listado": resultado, "mensaje": "Listado con éxito los eventos de la seccion"})
    })
    .catch((error) => {
        res.status(400).json({"error": error})
    })
});

// Agregar asociasion de profesor a una seccion no tiene vista todavia
router.post("/asignar/:id", function (req, res, next) {
    seccionesControllers.asignarProfesorSeccion(req.body, req.params.id)
    .then((resultado) => {
        res.render('paginaCorrecto', {mensaje: "Agregada con éxito la sección"})
        // res.status(201).json({"asignacion": resultado, "mensaje": "Asignacion realizada con exito"})
    })
    .catch((error) => {
        res.render('paginaError', {mensaje: error})
    })
});

// Agregar secciones
router.post("/", function (req, res, next) {
    seccionesControllers.agregar(req.body)
    .then((resultado) => {
        res.render('paginaCorrecto', {mensaje: "Agregada con éxito la sección"})
        // res.status(201).json({"seccion_agregada": resultado, "mensaje": "Agregada con éxito la seccion"})
    })
    .catch((error) => {
        res.status(400).json({"error": error})
    })
});

// Actualizar secciones
router.put("/:id", function (req, res, next) {
    seccionesControllers.actualizar(req.params.id ,req.body)
    .then((resultado) => {
        res.status(201).json({"seccion_editada": resultado, "mensaje": "Editada con éxito la sección"})
    })
    .catch((error) => {
        res.status(400).json({"error": error})
    })
});

// Eliminar secciones
router.delete("/:id", function (req, res, next) {
    seccionesControllers.eliminar(req.params.id, req.body)
    .then((resultado) => {
        res.status(200).json({"seccion_eliminada": resultado, "mensaje": "Eliminada con éxito la sección"})
    })
    .catch((error) => {
        res.status(400).json({"error": error})
    })
});

// Eliminar secciones
router.post("/eliminar/:id", function (req, res, next) {
    seccionesControllers.eliminar(req.params.id, req.body)
    .then((resultado) => {
        res.render('paginaCorrecto', {mensaje: "Eliminada con éxito la sección"})
        // res.status(200).json({"seccion_eliminada": resultado, "mensaje": "Eliminada con éxito la sección"})
    })
    .catch((error) => {
        res.render('paginaError', {mensaje: error})
    })
});

// Actualizar secciones
router.post("/editar/:id", function (req, res, next) {
    seccionesControllers.actualizar(req.params.id ,req.body)
    .then((resultado) => {
        res.render('paginaCorrecto', {mensaje: "Editado con éxito la sección"})
        // res.status(201).json({"seccion_editada": resultado, "mensaje": "Editada con éxito la sección"})
    })
    .catch((error) => {
        res.render('paginaError', {mensaje: error})
    })
});

module.exports = router;
