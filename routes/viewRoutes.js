const express = require('express');
const viewsController = require('../controllers/viewsController');
const userController = require('../controllers/userController');

const router = express.Router();

//view routes
router.get('/', (req, res) =>
  res.status(200).render('home', { title: 'Home' })
);

router.get('/me', userController.getMe);

router.get('/signup', viewsController.getSignUpForm);
router.get('/login', viewsController.getLoginForm);

// //protect routes from unauthorized user
// router.use(authController.restrictTo('admin'));
// router
//   .route('/')
//   .get(userController.getAllUsers)
//   .post(userController.createUser);

// router
//   .route('/:id')
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(
//     authController.restrictTo('admin', 'user'),
//     userController.deleteUser
//   );

module.exports = router;
