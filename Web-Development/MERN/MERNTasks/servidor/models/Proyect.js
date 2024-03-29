const mongoose = require('mongoose');

const ProyectSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Proyect', ProyectSchema)