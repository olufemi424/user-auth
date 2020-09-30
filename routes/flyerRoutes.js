const express = require('express');
const authController = require('../controllers/authController');
const flyersController = require('../controllers/flyersController');

const router = express.Router();

//view routes
router.use(authController.protect);

router.get('/', flyersController.getAllFlyers);

module.exports = router;
