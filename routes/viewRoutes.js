const express = require('express');
const viewsController = require('../controllers/viewsController');
// const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

//view routes
router.use('*', authController.isLoggedIn);
router.get('/', viewsController.getHomePage);
router.get('/signup', viewsController.getSignUpForm);
router.get('/login', viewsController.getLoginForm);
router.get('/reset', viewsController.getResetPasswordForm);
router.get('/account', viewsController.getUserAccoutPage);

// router.get('/me', userController.getMe);

module.exports = router;
