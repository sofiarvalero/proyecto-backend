const express = require('express');
const router = express.Router();
const trimestresControllers = require('../controllers/trimestres.c')

// Listar trimestres
router.get('/', function(req, res, next) {
    trimestresControllers.listar()
    .then((resultado) => {
        res.render('trimestres', {trimestres: resultado})
        //res.status(200).json({"trimestres": resultado, "mensaje": "Listado con éxito los trimestres"})
    })
    .catch((error) => {
        res.status(400).json({"error": error})
    })
});

// Listar Un trimestre
router.get("/:id", function (req, res, next) {
    trimestresControllers.listarUna(req.params.id)
    .then((resultado) => {
        res.status(200).json({"materias": resultado, "mensaje": "Listado con éxito el trimestre"})
    })
    .catch((error) => {
        res.status(400).json({"error": error})
    })
});

// Agregar trimestres
router.post("/", function (req, res, next) {
    trimestresControllers.agregar(req.body)
    .then((resultado) => {
        res.render('', {mensaje: "Agregado con éxito el Trimestre"})
        //res.status(201).json({"trimestre_agregado": resultado, "mensaje": "Agregado con éxito el trimestre"})
    })
    .catch((error) => {
        res.status(400).json({"error": error})
    })
});

// Actualizar trimestres
router.put("/:id", function (req, res, next) {
    trimestresControllers.actualizar(req.params.id ,req.body)
    .then((resultado) => {
        res.status(201).json({"trimestre_editado": resultado, "mensaje": "Editado con éxito el trimestre"})
    })
    .catch((error) => {
        res.status(400).json({"error": error})
    })
});

// Eliminar trimestres
router.delete("/:id", function (req, res, next) {
    trimestresControllers.eliminar(req.params.id, req.body)
    .then((resultado) => {
        res.status(200).json({"trimestre_eliminar": resultado, "mensaje": "Eliminado con éxito el trimestre"})
    })
    .catch((error) => {
        res.status(400).json({"error": error})
    })
});

// Eliminar trimestres
router.post("/eliminar/:id", function (req, res, next) {
    console.log(req.body)
    trimestresControllers.eliminar(req.params.id, req.body)
    .then((resultado) => {
        res.render('', {mensaje: "Eliminado con éxito el trimestre"})
        // res.status(200).json({"trimestre_eliminar": resultado, "mensaje": "Eliminado con éxito el trimestre"})
    })
    .catch((error) => {
        res.status(400).json({"error": error})
    })
});

// Actualizar trimestres
router.post("/editar/:id", function (req, res, next) {
    trimestresControllers.actualizar(req.params.id ,req.body)
    .then((resultado) => {
        res.render('', {mensaje: "Editado con éxito el trimestre"})
        // res.status(201).json({"trimestre_editado": resultado, "mensaje": "Editado con éxito el trimestre"})
    })
    .catch((error) => {
        res.status(400).json({"error": error})
    })
});

module.exports = router;
