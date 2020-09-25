const catchAsync = require('../utils/catchAsync');
// const User = require('./../models/userModel');

exports.signup = catchAsync(async (req, res, next) => {
  // const newUser = await User.create({
  //   email: req.body.email,
  //   password: req.body.password
  // });

  console.log({ email: req.body.email, password: req.body.password });

  // res.status(201).json({
  //   status: 'success',
  //   data: {
  //     user: ''
  //   }
  // });
});
