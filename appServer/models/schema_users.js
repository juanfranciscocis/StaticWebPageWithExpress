//REQUIERE MONGOOSE
const mongoose = require('mongoose');
//ESQUEMA DE LA COLECCION USERS
const usuariosSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    identification: {
        type: Number,
        required: true,
    },
    direction: {
        type: String,
    },
    age: {
        type: Number,
        'default': 1,
        range: [1, 100],
    },
    phone: {
        type: Number,
        'default': 999999999,
    },
    subjects: {
        class: {
            type: String,
            required: true,
            enum: [
                'Presencial',
                'Virtual',
            ]
        },
        names: {
            type: [String],
        },
    },
    major: {
        type: String,
    },
    date: {
        type: Date,
        'default': Date.now,
    },
});

//COMPILAR EL MODELO
const Usuario = new mongoose.model('user', usuariosSchema);
const user = new Usuario({
    name: 'Juan',
    lastname: 'Cisneros Guzman',
    identification: 1725412309,
    direction: 'Quito',
    age: 21,
    phone: 939683251,
    subjects: {
        class: 'Presencial',
        names: [
            'Matematicas',
            'Fisica',
            'Quimica',
        ],
    },
    major: 'Software Engineering',
    });

//GUARDAR EL MODELO
//wait for connection then save
mongoose.connection.on('connected', () => {
    user.save();
    console.log('User saved');
});




