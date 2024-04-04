const express = require('express');
const router = express.Router();
const profesoresControllers = require('../controllers/profesores.c')

// Listar Profesores
router.get('/', function(req, res, next) {
    profesoresControllers.listar()
    .then((resultado) => {
        res.render('profesores', {profesores: resultado})
        // res.status(200).json({"profesores": resultado, "mensaje": "Listado con éxito los profesores"})
    })
    .catch((error) => {
        res.status(400).json({"error": error})
    })
});

// Listar Profesores con materias y secciones
router.get('/materias/secciones', function(req, res, next) {
    profesoresControllers.listarConMateriasSecciones()
    .then((resultado) => {
        res.render('profesoresDetallados', {profesores: resultado})
        //res.status(200).json({"profesoresConMaterias": resultado, "mensaje": "Listado con éxito los profesores"})
    })
    .catch((error) => {
        res.status(400).json({"error": error})
    })
});

// Listar Profesores los eventos de las siguientes 2 semanas
router.get('/porsemanas', function(req, res, next) {
    profesoresControllers.eventosProfesorSemanas()
    .then((resultado) => {
        res.render('profesoresEventos', {profesores: resultado})
        //res.status(200).json({"profesoresSemanas": resultado, "mensaje": "Listado con éxito los profesores y sus eventos"})
    })
    .catch((error) => {
        res.status(400).json({"error": error})
    })
});

// Listar Un Profesor
router.get("/:id", function (req, res, next) {
    profesoresControllers.listarUna(req.params.id)
    .then((resultado) => {
        res.status(200).json({"materias": resultado, "mensaje": "Listado con éxito el profesor"})
    })
    .catch((error) => {
        res.status(400).json({"error": error})
    })
});

// Agregar profesores
router.post("/", function (req, res, next) {
    profesoresControllers.agregar(req.body)
    .then((resultado) => {
        res.render('paginaCorrecto', {mensaje: "Agregado con éxito el profesor"})
        // res.status(201).json({"profesor_agregado": resultado, "mensaje": "Agregado con éxito el profesor"})
    })
    .catch((error) => {
        res.render('paginaError', {mensaje: error})
    })
});

// Actualizar profesores
router.put("/:id", function (req, res, next) {
    profesoresControllers.actualizar(req.params.id ,req.body)
    .then((resultado) => {
        res.status(201).json({"profesor_editado": resultado, "mensaje": "Editado con éxito el profesor"})
    })
    .catch((error) => {
        res.status(400).json({"error": error})
    })
});

// Eliminar profesores
router.delete("/:id", function (req, res, next) {
    profesoresControllers.eliminar(req.params.id, req.body)
    .then((resultado) => {
        res.status(200).json({"profesor_eliminar": resultado, "mensaje": "Eliminado con éxito el profesor"})
    })
    .catch((error) => {
        res.status(400).json({"error": error})
    })
});

// Eliminar profesores
router.post("/eliminar/:id", function (req, res, next) {
    console.log(req.body)
    profesoresControllers.eliminar(req.params.id, req.body)
    .then((resultado) => {
        res.render('paginaCorrecto', {mensaje: "Eliminado con éxito el profesor"})
        // res.status(200).json({"profesor_eliminar": resultado, "mensaje": "Eliminado con éxito el profesor"})
    })
    .catch((error) => {
        res.render('paginaError', {mensaje: error})
    })
});

// Actualizar profesores
router.post("/editar/:id", function (req, res, next) {
    profesoresControllers.actualizar(req.params.id ,req.body)
    .then((resultado) => {
        res.render('paginaCorrecto', {mensaje: "Editado con éxito el profesor"})
        // res.status(201).json({"profesor_editado": resultado, "mensaje": "Editado con éxito el profesor"})
    })
    .catch((error) => {
        res.render('paginaError', {mensaje: error})
    })
});

module.exports = router;
