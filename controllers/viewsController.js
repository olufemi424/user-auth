// const User = require('../models/userModel');
// const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getHomePage = catchAsync(async (req, res, next) => {
  res.status(200).render('home', { title: 'Home' });
});

exports.getSignUpForm = catchAsync(async (req, res, next) => {
  res.status(200).render('signup', { title: 'Create An Account' });
});

exports.getLoginForm = catchAsync(async (req, res, next) => {
  res.status(200).render('login', { title: 'Login To Your Accout' });
});

exports.getForgetPasswordForm = catchAsync(async (req, res, next) => {
  res.status(200).render('forget-password', {
    title: 'Forget Password'
  });
});

exports.getUpadatePasswordForm = catchAsync(async (req, res, next) => {
  res.status(200).render('update-password', { title: 'Upadate Password' });
});

exports.getResetPasswordForm = catchAsync(async (req, res, next) => {
  res.status(200).render('reset-password', { title: 'Upadate Password' });
});

exports.getUserAccoutPage = catchAsync(async (req, res, next) => {
  res.status(200).render('user-profile', { title: 'Profile' });
});
