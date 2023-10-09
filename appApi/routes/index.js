const express = require('express');
const router = express.Router();
const ctrlUsers = require('../controllers/userController');

//DEFINIR LAS RUTAS PARA LAS ACCIONES CRUD, SOBRE LA COLLECCION USERS
router.route('/users')
    .post(ctrlUsers.userCreate)
    .get(ctrlUsers.userRead);



router.route('/users/:userid')
    .get(ctrlUsers.userReadById)
    .put(ctrlUsers.userUpdate)
    .delete(ctrlUsers.userDelete);

router.route('/search/:name')
    .get(ctrlUsers.userFindName);





module.exports = router;