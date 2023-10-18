const express = require('express');
const router = express.Router();

// controllers
const ctrlUsers = require('../controllers/users');

/* GET users listing. */
router.get('/', ctrlUsers.users);

//CREACION DE USUARIOS -> FORMULARIO
router.route('/add')
    .get(ctrlUsers.renderUsersCreate)  //MOSTRAR FORMULARIO
    .post(ctrlUsers.doUsersCreate); //CREAR USUARIOS


router.route("/delete/:userid")
    .get(ctrlUsers.deleteUsers)
    .post(ctrlUsers.doUsersDelete);

module.exports = router;
