const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signUpUser);
router.post('/login', authController.loginUser);
router.post('/token', authController.getNewAccessToken);

module.exports = router;