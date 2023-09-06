//conection to mongodb
const mongoose = require('mongoose');

//STRING DE CONEXION -> db uri
const dbURI = 'mongodb+srv://juanfrancistm2011:06012002jF_@cluster0.mnx7a3v.mongodb.net/?retryWrites=true&w=majority';

//CONEXION
mongoose.connect(dbURI, {
    family:4, //PRUEBO IPV6, SI NO IPV4
    serverSelectionTimeoutMS: 5000, //TIEMPO DE ESPERA
}).catch(err => console.log('SE PRESENTO UN ERROR EN MONGODB', err.reason));

//CONEXION EXITOSA
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

//CONEXION FALLIDA
mongoose.connection.on('error', err => {
    console.log(`Mongoose connection error: ${err}`);
});

//DESCONEXION
mongoose.connection.on('disconnected', () => {
    console.log(`Mongoose disconnected ${dbURI}`);
});



