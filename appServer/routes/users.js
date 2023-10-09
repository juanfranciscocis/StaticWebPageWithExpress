const express = require('express');
const router = express.Router();
const {users} = require("../controllers/userController");

/* GET users listing. */
router.get('/', users);

module.exports = router;
