const express = require('express');
const viewsController = require('../controllers/viewsController');
// const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

//view routes
router.use(authController.isLoggedIn);
router.get('/', viewsController.getHomePage);
router.get('/signup', viewsController.getSignUpForm);
router.get('/login', viewsController.getLoginForm);
router.get('/forget-password', viewsController.getForgetPasswordForm);
router.get('/reset-password/:token', viewsController.getResetPasswordForm);

router.get(
  '/account',
  authController.protect,
  viewsController.getUserAccoutPage
);

router.get(
  '/account/reset',
  authController.protect,
  viewsController.getUpadatePasswordForm
);

router.get('/flyers', authController.protect, viewsController.getFlyersPage);

// router.get('/me', userController.getMe);

module.exports = router;
