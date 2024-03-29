const express = require("express");
const router = express.Router();
const materiasControllers = require("../controllers/materias.c");

// Listar Materias
router.get("/", function (req, res, next) {
    materiasControllers.listar()
    .then((resultado) => {
        res.render('materias', {materias: resultado})
        //res.status(200).json({"materias": resultado, "mensaje": "Listado con éxito las materias"})
    })
    .catch((error) => {
        res.status(400).json({"error": error})
    })
});

// Listar Una Materia
router.get("/:id", function (req, res, next) {
    materiasControllers.listarUna(req.params.id)
    .then((resultado) => {
        res.status(200).json({"materias": resultado, "mensaje": "Listado con éxito la materia"})
    })
    .catch((error) => {
        res.status(400).json({"error": error})
    })
});

// Agregar Materias
router.post("/", function (req, res, next) {
    materiasControllers.agregar(req.body)
    .then((resultado) => {
        res.render('', {mensaje: "Agregada con éxito la materia"})
        // res.status(201).json({"materia_agregada": resultado, "mensaje": "Agregada con éxito la materia"})
    })
    .catch((error) => {
        res.status(400).json({"error": error})
    })
});

// Actualizar Materias
router.put("/:id", function (req, res, next) {
    materiasControllers.actualizar(req.params.id ,req.body)
    .then((resultado) => {
        res.status(201).json({"materia_editada": resultado, "mensaje": "Editada con éxito la materia"})
    })
    .catch((error) => {
        res.status(400).json({"error": error})
    })
});

// Eliminar Materias
router.delete("/:id", function (req, res, next) {
    materiasControllers.eliminar(req.params.id, req.body)
    .then((resultado) => {
        res.status(200).json({"materia_eliminada": resultado, "mensaje": "Eliminada con éxito la materia"})
    })
    .catch((error) => {
        res.status(400).json({"error": error})
    })
});

// Eliminar Materias
router.post("/eliminar/:id", function (req, res, next) {
    materiasControllers.eliminar(req.params.id, req.body)
    .then((resultado) => {
        res.render('', {mensaje: "Eliminada con éxito la materia"})
        // res.status(200).json({"materia_eliminada": resultado, "mensaje": "Eliminada con éxito la materia"})
    })
    .catch((error) => {
        res.status(400).json({"error": error})
    })
});

// Actualizar Materias
router.post("/editar/:id", function (req, res, next) {
    materiasControllers.actualizar(req.params.id ,req.body)
    .then((resultado) => {
        res.render('', {mensaje: "Editado con éxito la materia"})
        // res.status(201).json({"materia_editada": resultado, "mensaje": "Editada con éxito la materia"})
    })
    .catch((error) => {
        res.status(400).json({"error": error})
    })
});

module.exports = router;
