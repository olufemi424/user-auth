// const User = require('../models/userModel');
// const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getSignUpForm = catchAsync(async (req, res, next) => {
  res.status(200).render('signup', { title: 'Create An Account' });
});

exports.getLoginForm = catchAsync(async (req, res, next) => {
  res.status(200).render('login', { title: 'Login To Your Accout' });
});
