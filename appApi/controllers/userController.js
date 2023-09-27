//controllers
const mongoose = require('mongoose'); //REQUERIR MONGOOSE PARA EL REST API
const users = mongoose.model('user'); //MODELO QUE ME PERMITE INTERACTUAR CON LA COLECCION USERS


// OJO: UNA BUENA API SIEMPRE DEBE TENER UNA RESPUESTA!
// CREATE - USER
const userCreate = (req, res) => {
    res
        .status(201) //ESTADO DE LA RESPUESTA = 201 = CREATED
        .json({
            "status": "success create",
        });
}


// READ - USER
const userRead = (req, res) => {
    users.find().exec().then((user) => {
        res
            .status(200) //ESTADO DE LA RESPUESTA = 200 = OK
            .json(user);
    }).catch((err) => {
        res
            .status(404) //ESTADO DE LA RESPUESTA = 404 = NOT FOUND
            .json({
                "status": "error read",
            });
    });
}


// UPDATE - USER
const userUpdate = (req, res) => {
    res
        .status(200) //ESTADO DE LA RESPUESTA = 200 = OK
        .json({
            "status": "success update",
        });
}

// DELETE - USER
const userDelete = (req, res) => {
    res
        .status(204) //ESTADO DE LA RESPUESTA = 204 = NO CONTENT (DELETE SUCCESS)
        .json({
            "status": "success delete",
        });
}

// READ - USER BY ID
const userReadById = (req, res) => {

    users.findById(req.params.userid).exec()
        .then((user) => {
        res
            .status(200) //ESTADO DE LA RESPUESTA = 200 = OK
            .json(user);
    }).catch((err) => {
        res
            .status(404) //ESTADO DE LA RESPUESTA = 404 = NOT FOUND
            .json({
                "status": "error read by id",
            });
    });
}

module.exports = {
    userCreate,
    userRead,
    userUpdate,
    userDelete,
    userReadById,
}
