var express = require('express');
var router = express.Router();
const {login} = require('../controllers/authController')

/* GET users listing. */
router.post('/login', login);

module.exports = router;
