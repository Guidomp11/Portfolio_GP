const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const proyectController = require('../controllers/proyectController');

const auth = require('../middleware/auth');

//creo proyectos
router.post('/', auth, [
    check('nombre', 'El nombre del proyecto es obligatorios').not().isEmpty()
], proyectController.createProyect);

//getteo proyectos
router.get('/', auth, proyectController.getProyects);

//actualizo proyecto
router.put('/:id', auth, [
    check('nombre', 'El nombre del proyecto es obligatorios').not().isEmpty()
], proyectController.updateProyect);

router.delete('/:id', auth, proyectController.deleteProyect)

module.exports = router;