const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword); // TODO protect route from unauthenticated users
router.patch('/resetPassword/:token', authController.resetPassword); // TODO protect route from unauthenticated users

//protect other routes from un-authenticated user
router.use(authController.protect);
router.patch('/updateMyPassword', authController.updatePassword); //todo, why doees it need to be protected. "You do not have permission to perfome this action"

router.get(
  '/me',
  authController.protect,
  userController.getMe,
  userController.getUser
);

/**
 * Restrict these routes from rehular users,
 * just like the name implies, admin are only allowed
 * use these routes, and these routes includes, get all user, createuser
 * get a single user by id, updateuser, and delete user
 */
router.use(authController.restrictTo('admin'));
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser);

module.exports = router;
