const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

//protect other routes from un-authenticated user
router.use(authController.protect);

router.get(
  '/me',
  authController.protect,
  userController.getMe,
  userController.getUser
);
router.route('/').get(userController.getAllUsers);

module.exports = router;
