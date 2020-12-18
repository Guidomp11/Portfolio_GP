const { validationResult } = require('express-validator');
const Proyect = require('../models/Proyect');

module.exports = {
    createProyect: async (req, res) => {
        
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        try{
            const proyect = Proyect(req.body);

            //asigno un creador
            proyect.owner = req.user.id;

            proyect.save();
            res.json(proyect);
        }catch(error){
            console.log(error);
            res.status(500).send('hubo un error')
        }
    },
    getProyects: async (req, res) => {
        try{
            const proyects = await Proyect.find({owner: req.user.id});

            res.json(proyects);
        }catch(error){
            console.log(error);
            res.status(500).send('Hubo un error')
        }
    },
    updateProyect: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        //extraigo info del proyecto
        const {nombre} = req.body;
        const newProyect = {};

        if(nombre){
            newProyect.nombre = nombre;
        }

        try{
            let proyect = await Proyect.findById(req.params.id);

            if(!proyect){
                return res.status(404).json({msg: 'Proyecto no encontrado'});
            }

            if(proyect.owner.toString() !== req.user.id){
                return res.status(401).json({msg: 'No autorizado'});
            }

            proyect = await Proyect.findByIdAndUpdate({_id: req.params.id}, {$set: newProyect}, {new: true});

            res.json(proyect);

        }catch(error){
            console.log(error);
            res.status(500).send('Error en el servidor');
        }
    },
    deleteProyect: async (req, res) => {
        try{
            let proyect = await Proyect.findById(req.params.id);

            if(!proyect){
                return res.status(404).json({msg: 'Proyecto no encontrado'});
            }

            if(proyect.owner.toString() !== req.user.id){
                return res.status(401).json({msg: 'No autorizado'});
            }

            await Proyect.findOneAndRemove({_id: req.params.id})
            res.json({msg: 'Proyecto eliminado'})

        }catch(error){
            console.log(error);
            res.status(500).send('Error en el servidor');
        }
    }
}