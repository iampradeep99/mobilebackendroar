var express = require('express');
var router = express.Router();
const {addUser,listAssociates} = require('../controllers/userController')

/* GET users listing. */
router.post('/', addUser);
router.post('/listAssociates', listAssociates )

module.exports = router;
