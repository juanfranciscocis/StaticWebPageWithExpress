const express = require('express');
const router = express.Router();

// controllers
const ctrlUsers = require('../controllers/users');


/* GET home page. */
router.get('/', ctrlUsers.users);


module.exports = router;
