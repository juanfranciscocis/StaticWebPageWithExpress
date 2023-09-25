const express = require('express');
const router = express.Router();
const ctrlUsers = require('../controllers/userController');

//DEFINIR LAS RUTAS PARA LAS ACCIONES CRUD, SOBRE LA COLLECCION USERS
router.route('/users')
    .post()
    .get();



router.route('/users/:userid')
    .get()
    .put()
    .delete();





module.exports = router;