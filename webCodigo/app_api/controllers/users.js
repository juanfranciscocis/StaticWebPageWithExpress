//controllers
const { request } = require('express');
const mongoose = require('mongoose'); //incorporar mongoose a la REST API
const users = mongoose.model('user'); //el modelo me permite interactuar con la coleccion users

 // crear usuario
const userCreate = (req, res) => {
users
    .create({ // req.body.xxxx hace referencia al contenido que viene desde un formulario
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        identificacion: req.body.identificacion,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        edad: req.body.edad,
        materias: {
            tipo: req.body.tipo,
            nombres: req.body.nombres // ya que viene en formato arreglo desde la vista (formulario)
        },
         carrera: req.body.carrera
    })
    .then((objetoUsuario) => {
        res
            .status(201)
            .json(objetoUsuario);
    })
    .catch((err) => {
         res
            .status(400)
            .json(err);
     });
};

const userList = (req, res) => {
    users
        /*
        .find({
           'apellido': 'Parker'
        }) //obtiene todos los documentos de la colección users que cumplen con el criterio del filtro
        */
        .find() //obtiene todos los documentos de la colección users
        //.select('nombre apellido') //muestra solo los paths (campos) especificados
        .exec()
        .then((objetoUsuario) => {
             if (!objetoUsuario) { // valido la existencia de documentos en la colección
               console.log(`No existen documentos en la colección ${users}`);
               return res // no existen documentos en la colección users
                   .status(404)
                   .json({
                       "Mensaje": "Usuarios no encontrados"
                   });
           } else 
            res //Responde enviando el/los documento(s) encontrado(s) en formato JSON y con status HTTP 200
                .status(200)
                .json(objetoUsuario);
        })
        .catch((err) => { //find encontró un error
            res
                .status(404)
                .json({ "status": "error list" });
            console.log(`Se encontró un error en la colección ${users}`);
        })

};

// leer usuario
const userRead = (req, res) => {
    users
        .findById(req.params.userid) //obtiene userid de los parámetros de la URL
        .exec()
        .then((objetoUsuario)=>{
            res //Responde enviando el documento encontrado en formato JSON y con status HTTP 200
                .status(200)
                .json(objetoUsuario);
        })
        .catch((err) => { //findById encontró un error
            res
                .status(404)
                .json(err);
            console.log(`Error al buscar el usuario con userid: ${req.params.userid}`);
        })
};

//Update users
const userUpdate = (req, res) => {
    res 
        .status(200)
        .json({"status": "success update"});
};

//delete users
const userDelete = (req, res) => {
    res 
        .status(204)
        .json({"status": "success delete"});
};

module.exports = {
    userCreate, //crear usuario
    userDelete, //borrar usuario
    userList, //listar usuarios
    userUpdate, //actualizar usuaruis
    userRead //Leer usuario
}