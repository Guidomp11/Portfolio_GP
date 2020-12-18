const { validationResult } = require('express-validator');
const Task = require('../models/Task');
const Proyect = require('../models/Proyect');
const { translateAliases } = require('../models/Proyect');

module.exports = {
    createTask: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        

        try{
            const {proyecto} = req.body;
            const validProyect = await Proyect.findById(proyecto);
            if(!validProyect){
                return res.status(404).json({msg: 'Proyecto no encontrado'})
            }

            if(validProyect.owner.toString() !== req.user.id){
                return res.status(401).json({msg: 'No autorizado'});
            }   

            const task = new Task(req.body);

            await task.save();
            res.json({task})

        }catch(error){
            console.log(error);
            res.status(500).send('hubo un error!')
        }
    },
    getTasks: async (req,res) => {
        try{
            const {proyecto} = req.query;
            const validProyect = await Proyect.findById(proyecto);
            if(!validProyect){
                return res.status(404).json({msg: 'Proyecto no encontrado'})
            }

            if(validProyect.owner.toString() !== req.user.id){
                return res.status(401).json({msg: 'No autorizado'});
            }

            const tasks = await Task.find({ proyecto }).sort({created_at: -1});
            res.json(tasks);

        }catch(error){
            console.log(error);
            res.status(500).send('hubo un error!')
        }
    },
    updateTask: async (req, res) => {
        try{
            const {proyecto, nombre, estado} = req.body;

            let task = await Task.findById(req.params.id);
            if(!task){
                return res.status(404).json({msg: 'No existe la tarea'})
            }

            const validProyect = await Proyect.findById(proyecto);
            if(validProyect.owner.toString() !== req.user.id){
                return res.status(401).json({msg: 'No autorizado'});
            }

            const newTask = {};

            newTask.nombre = nombre;
            newTask.estado = estado;

            task = await Task.findOneAndUpdate({_id: req.params.id}, newTask, {new: true});
            return res.json({task})

        }catch(error){
            console.log(error);
            res.status(500).send('hubo un error!')
        }
    },
    deleteTask: async (req, res) => {
        try{
            const {proyecto} = req.query;

            let task = await Task.findById(req.params.id);
            if(!task){
                return res.status(404).json({msg: 'No existe la tarea'})
            }

            const validProyect = await Proyect.findById(proyecto);
            if(validProyect.owner.toString() !== req.user.id){
                return res.status(401).json({msg: 'No autorizado'});
            }

            await Task.findOneAndRemove({_id: req.params.id});
            res.json({msg: 'Tarea eliminada'})

        }catch(error){
            console.log(error);
            res.status(500).send('hubo un error!')
        }
    }
}