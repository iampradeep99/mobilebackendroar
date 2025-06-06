var express = require('express');
var router = express.Router();
const {addUser} = require('../controllers/userController')

/* GET users listing. */
router.post('/', addUser);

module.exports = router;
