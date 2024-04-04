const express = require('express');
const router = express.Router();
const eventosControllers = require('../controllers/eventos.c')

// Listar eventos
router.get('/', function(req, res, next) {
    eventosControllers.listar()
    .then((resultado) => {
        res.render('eventos', {eventosMaterias: resultado.eventosMaterias, eventosSecciones: resultado.eventosSecciones, eventosGlobales: resultado.eventosGlobales})
        //res.status(200).json({"eventos": resultado, "mensaje": "Listado con éxito los eventos"})
    })
    .catch((error) => {
        res.status(400).json({"error": error})
    })
});

// Listar Un eventos
router.get("/:id", function (req, res, next) {
    eventosControllers.listarUna(req.params.id)
    .then((resultado) => {
        res.status(200).json({"eventos": resultado, "mensaje": "Listado con éxito el evento"})
    })
    .catch((error) => {
        res.status(400).json({"error": error})
    })
});

// Listar Un eventos
router.get("listadoEventos/:id", function (req, res, next) {
    eventosControllers.listarUna(req.params.id)
    .then((resultado) => {
        res.status(200).json({"eventos": resultado, "mensaje": "Listado con éxito el evento"})
    })
    .catch((error) => {
        res.status(400).json({"error": error})
    })
});

// Agregar eventos seccion
router.post("/seccion", function (req, res, next) {
    eventosControllers.agregarEventoSeccion(req.body)
    .then((resultado) => {
        res.render('paginaCorrecto', {mensaje: "Agregado con éxito el Evento"})
        // res.status(201).json({"evento_agregado": resultado, "mensaje": "Agregado con éxito el evento"})
    })
    .catch((error) => {
        res.render('paginaError', {mensaje: error})
    })
});

// Agregar eventos
router.post("/materia", function (req, res, next) {
    eventosControllers.agregarEventoMateria(req.body)
    .then((resultado) => {
        res.render('paginaCorrecto', {mensaje: "Agregado con éxito el Evento"})
        // res.status(201).json({"evento_agregado": resultado, "mensaje": "Agregado con éxito el evento"})
    })
    .catch((error) => {
        res.render('paginaError', {mensaje: error})
    })
});

// Agregar eventos globales
router.post("/globales", function (req, res, next) {
    eventosControllers.agregarEventoGlobal(req.body)
    .then((resultado) => {
        res.render('paginaCorrecto', {mensaje: "Agregado con éxito el Evento"})
        // res.status(201).json({"evento_agregado": resultado, "mensaje": "Agregado con éxito el evento"})
    })
    .catch((error) => {
        res.render('paginaError', {mensaje: error})
    })
});

// Actualizar eventos
router.put("/:id", function (req, res, next) {
    eventosControllers.actualizar(req.params.id ,req.body)
    .then((resultado) => {
        res.status(201).json({"evento_editada": resultado, "mensaje": "Editado con éxito el evento"})
    })
    .catch((error) => {
        res.status(400).json({"error": error})
    })
});

// Eliminar eventos
router.delete("/:id", function (req, res, next) {
    eventosControllers.eliminar(req.params.id, req.body)
    .then((resultado) => {
        res.status(200).json({"evento_eliminado": resultado, "mensaje": "Eliminado con éxito el evento"})
    })
    .catch((error) => {
        res.status(400).json({"error": error})
    })
});

// Eliminar eventos
router.post("/eliminar/:id", function (req, res, next) {
    eventosControllers.eliminar(req.params.id, req.body)
    .then((resultado) => {
        res.render('paginaCorrecto', {mensaje: "Eliminado con éxito el Evento"})
        // res.status(200).json({"evento_eliminado": resultado, "mensaje": "Eliminado con éxito el evento"})
    })
    .catch((error) => {
        res.render('paginaError', {mensaje: error})
    })
});

// Actualizar eventos
router.post("/editar/:id", function (req, res, next) {
    eventosControllers.actualizar(req.params.id ,req.body)
    .then((resultado) => {
        res.render('paginaCorrecto', {mensaje: "Editado con éxito el Evento"})
        // res.status(201).json({"evento_editada": resultado, "mensaje": "Editado con éxito el evento"})
    })
    .catch((error) => {
        res.render('paginaError', {mensaje: error})
    })
});


module.exports = router;
