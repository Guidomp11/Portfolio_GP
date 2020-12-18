const express = require('express');
const { check } = require('express-validator');
const taskController = require('../controllers/taskController');
const router = express.Router();
const tasksController = require('../controllers/taskController');

const auth = require('../middleware/auth');

router.post('/', auth, [
    check('nombre', 'El nombre es obligatorios').not().isEmpty(),
    check('proyecto', 'El proyecto es obligatorios').not().isEmpty()
], tasksController.createTask);

router.get('/', auth, tasksController.getTasks);

router.put('/:id', auth, taskController.updateTask);

router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;