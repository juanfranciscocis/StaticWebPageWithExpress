const mongoose = require ('mongoose');
const dbURI = 'mongodb://localhost/dw3_users'; //string de conexion 
const readLine = require('readline');

if (process.env.NODE_ENV === 'production'){
   dbURI = process.env.MONGO_URI;
}

require('./esquema_users'); //definicion del esquema

//escuchar el evento de windows SIGINT
if (process.platform === 'win32') {
    const rl = readLine.createInterface({
        input: process.stdin, 
        output: process.stdout
    });
    rl.on ('SIGINT', ()=> {
        process.emit('SIGINT');
    })
}

//proceso para cerrar la conecion a MONGODB (mongoose)
const procShutdown = (msg, callback) => {
    mongoose.connection.close();
    console.log('Mongoose se descontecto por: ', {msg});
    callback();
};


//señales de terminacion de procesos:
//windows: SIGINT
//node: SIGUSR2
//heroku: SIGTERM

//evento node SIGUSR2
process.once('SIGUSR2', ()=> {
    procShutdown('nodemon restart', ()=>{
        process.kill(process.id, 'SIGUSR2')
    });
})

//evento windows SIGINT
process.on('SIGINT', ()=> {
    procShutdown('ended by windows', ()=>{
        process.exit(0);
    });
})

//evento heroku SIGTERM
process.on('SIGTERM', ()=> {
    procShutdown('heroku app shutdown', ()=>{
        process.exit(0);
    });
})

mongoose.connect(dbURI, {
    family: 4, //probara IPv6, si no funciona usara IPv4
    serverSelectionTimeoutMS: 5000
}).catch(err => console.log('Se presento un error de conexion en mongoDB: ', err.reason));

//mensajes de eventos de conexion 

//conexion exitosa
mongoose.connection.on('connected', ()=>{
    console.log('Mongoose se conecto a: ', dbURI)
});

//conexion con error
mongoose.connection.on('err', ()=>{
    console.log('Error de conexion a: ', dbURI)
});

//desconexion 
mongoose.connection.on('disconnected', ()=>{
    console.log('Mongoose se desonceto a: ', dbURI)
});

//conexion a mongo db - dw3_users_log
const dbURIlog = 'mongodb://localhost/dw3_users_log';
const logDB = mongoose.createConnection(dbURIlog, {
    family: 4, //probara IPv6, si no funciona usara IPv4
    serverSelectionTimeoutMS: 5000
});

mongoose.connection.on('connected', ()=>{
    console.log('Mongoose se conecto a: ', dbURIlog)
});

//conexion con error
mongoose.connection.on('err', ()=>{
    console.log('Error de conexion a: ', dbURIlog)
});

//desconexion 
mongoose.connection.on('disconnected', ()=>{
    console.log('Mongoose se desonceto a: ', dbURIlog)
});

