//conection to mongodb
const mongoose = require('mongoose');
require('./schema_users');

//STRING DE CONEXION -> db uri
const dbURI = 'mongodb+srv://juanfrancistm2011:06012002jF_@cluster0.mnx7a3v.mongodb.net/?retryWrites=true&w=majority';
const dbURILog = 'mongodb+srv://juanfrancistm2011:06012002jF_@logs.zurbstw.mongodb.net/';

//READLINE (listen for windows events)
const readLine = require('readline');

//ESCUCHAR EL EVENTO DE WINDOWS SIGINT
if (process.platform === 'win32'){
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on('SIGINT', () => {
        process.emit("SIGINT");
    }); //EMITIR EVENTO SIGINT CUANDO SE PRESIONE CTRL+C
}

//CERRRAR LA CONEXION
const processShutdown = (msg, callback) => {
    mongoose.connection.close();
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
}

//SEÑALES DE TERMINACION
//WINDOWS: SIGINT
process.on('SIGINT', () => {
    processShutdown('APP TERMINATION WINDOWS', () => {
        process.exit(0);
    });
});
//NODEMON: SIGUSR2
process.once('SIGUSR2', () => {
    processShutdown('NODEMON RESTART', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});
//HEROKU: SIGTERM
process.on('SIGTERM', () => {
    processShutdown('HEROKU APP SHUTDOWN', () => {
        process.exit(0);
    });
});

//1. CONEXION - DW3
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
    console.log(`Mongoose connection error: ${err} , ${dbURI}`);
});

//DESCONEXION
mongoose.connection.on('disconnected', () => {
    console.log(`Mongoose disconnected ${dbURI}`);
});




//CONEXION NOMBRADA (CONECTARME A UNA BASE DE DATOS NUEVA)
//2. CONEXION - DW3 LOG
const logDb = mongoose.createConnection(dbURILog, {
    family:4, //PRUEBO IPV6, SI NO IPV4
    serverSelectionTimeoutMS: 5000, //TIEMPO DE ESPERA
});

//EVENTOS DE CONEXION
//CONEXION EXITOSA
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURILog}`);
});

//CONEXION FALLIDA
mongoose.connection.on('error', err => {
    console.log(`Mongoose connection error: ${err} , ${dbURILog}`);
});

//DESCONEXION
mongoose.connection.on('disconnected', () => {
    console.log(`Mongoose disconnected ${dbURILog}`);
});









