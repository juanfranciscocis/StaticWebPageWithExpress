//controllers
const mongoose = require('mongoose'); //REQUERIR MONGOOSE PARA EL REST API
const users = mongoose.model('user'); //MODELO QUE ME PERMITE INTERACTUAR CON LA COLECCION USERS


// OJO: ¡UNA BUENA API SIEMPRE DEBE TENER UNA RESPUESTA!
// CREATE - USER
const userCreate = (req, res) => {
    users.create({
        name: req.body.name,
        lastname: req.body.lastname,
        identification: req.body.identification,
        direction: req.body.direction,
        age: req.body.age,
        phone: req.body.phone,
        subjects: {
            class: req.body.subjects.class,
            names: req.body.subjects.names,
        },
        major: req.body.major,
        date: req.body.date,

    }).then((user) => {
        res
            .status(201) //ESTADO DE LA RESPUESTA = 201 = CREATED
            .json({
                "status": "success create",

            });
    }).catch((err) => {
        res
            .status(400) //ESTADO DE LA RESPUESTA = 400 = BAD REQUEST
            .json({
                "status": "error create",
                "message": err
            });
    });
}


// READ - USER
const userRead = (req, res) => {
    //OTRAS FORMAS DE HACER UN READ
    //1.find({
    //   name: 'Juan',
    //   }).exec()...
    //2.find().select('name lastname').exec()...
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

    users.findById(req.params.userid).exec().then((user) => {
        user.name = req.body.name;
        user.lasName = req.body.lasName;
        user.identification = req.body.identification;
        user.direction = req.body.direction;
        user.age = req.body.age;
        user.phone = req.body.phone;
        user.subjects = {
            class: req.body.subjects.class,
            names: req.body.subjects.names,
        }
        user.major = req.body.major;
        user.save()
            .then((user) => {
                res
                    .status(200) //ESTADO DE LA RESPUESTA = 200 = OK
                    .json(user);
            });
        }).catch((err) => {
            res
                .status(404) //ESTADO DE LA RESPUESTA = 404 = NOT FOUND
                .json({
                    "status": "error update",
                });
    });
}

// DELETE - USER
const userDelete = (req, res) => {
    if (req.params.userid) {
        users.findByIdAndDelete(req.params.userid).exec()
            .then((user) => {
                res
                    .status(204) //ESTADO DE LA RESPUESTA = 204 = NO CONTENT (DELETE SUCCESS)
                    .json({
                        "status": "success delete",
                    });
            }).catch((err) => {
                res
                    .status(404) //ESTADO DE LA RESPUESTA = 404 = NOT FOUND
                    .json({
                        "status": "error delete",
                    });
            });
    }
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

//READ - USER BY NAME/LAS NAME/IDENTIFICATION
const userFindName = (req, res) => {
    const search = new RegExp(req.params.name);
    users.find({
        //name: search, //BUSCAR LA OCURRENCIA DE LA PALABRA EN CUALQUIER PARTE DEL NOMBRE
        //$or: [
        //    {name: search},
        //    {lasName: search},
        //    {identification: search},
        //]
    }).exec().then((user) => {
        if (user.length === 0 ){
            res
                .status(404) //ESTADO DE LA RESPUESTA = 404 = NOT FOUND
                .json({
                    "status": "not found name",
                });

        }

        res
            .status(200) //ESTADO DE LA RESPUESTA = 200 = OK
            .json(user);
    }).catch((err) => {
        res
            .status(404) //ESTADO DE LA RESPUESTA = 404 = NOT FOUND
            .json({
                "status": "error read by name",
            });
    });
}

module.exports = {
    userCreate,
    userRead,
    userUpdate,
    userDelete,
    userReadById,
    userFindName,
};
