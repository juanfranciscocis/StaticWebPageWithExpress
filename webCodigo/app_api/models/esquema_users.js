//esquema de la coleccion usuarios - dw3_users_log

const mongoose = require('mongoose');

const usuariosSchema = new mongoose.Schema({
    nombre:{
        type: String,
        require: true
    },
    apellido:{
        type: String,
        require: true
    },
    identificacion:{
        type: Number,
        require: true
    },
    direccion:{
        type: String,
    },
    edad:{
        type: Number,
        'default': 1,
        min: 1,
        max: 100,
    },
    telefono:{
        type: Number,
        'default': 9999999999
    },
    materias:{
        tipo:{
            type: String,
            enum: ['Presencial', 'Virtual']
        },
        nombres:[String]
    },
    carrera:{
        type: String,
    },
    fecha:{
        type: Date,
        'default': Date.now
    }
});

const Usuario = new mongoose.model('user', usuariosSchema);

const user = new Usuario({
    nombre:'Tomas',
    apellido:'Davila',
    identificacion: 1726979733,
    direccion: 'Tumbaco',
    telefono: 9824413170,
    edad: 22,
    materias: {
        tipo:'Presencial', 
        nombres:['dw1', 'dw2', 'dw3']
    },
    carrera:'Medios Interactivos'

});

user.save();