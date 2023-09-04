const express = require('express');
const router = express.Router();
const {userHomePage} = require("../controllers/userController");

/* GET users listing. */
router.get('/', userHomePage);

module.exports = router;
