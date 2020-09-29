const express = require('express');
const authController = require('../controllers/authController');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

//view routes
router.use(authController.isLoggedIn);
router.get('/', viewsController.getHomePage);

module.exports = router;
