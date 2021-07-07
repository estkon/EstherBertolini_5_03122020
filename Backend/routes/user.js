const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

const signupValidity = require('../middleware/signupValidity');

router.post('/signup', signupValidity , userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;