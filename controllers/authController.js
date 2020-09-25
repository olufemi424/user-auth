const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModel');
const AppError = require('../utils/appError');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// create send token to user, and the user will use this token to perform actions, this token contains user details
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  //only want cookie in production
  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
  }

  /**
   * attach cooking to respose when user try to login or signup, this will be catched by the cookie parser
   * this will set cookie on the browser with the assigned name 'jtw' in this case
   */
  res.cookie('jwt', token, cookieOptions);

  /**
   * remove the password from the output
   * sanitize the outgoing data after the cookie has been sent
   * to the user
   */
  user.password = undefined; /*eslint no-param-reassign: "error"*/
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: user
    }
  });
};

/**
 * protect ensures an un-authenticated user is not given access to
 * routes that they are not authenticated to see, such as
 * update password, updateprofile, deletemy endpoints
 */

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  //1) Getting token and check if its there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please login to get access.', 401)
    );
  }
  //2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3)check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token no longer exist.', 401)
    );
  }

  //4) Check if user changed password after the token was issues
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please login again', 401)
    );
  }

  //grant access to protected route
  req.user = currentUser;
  res.locals.user = currentUser; //user info should be avaiable as an object
  next();
});

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser
    }
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //1) check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  //2) check if the user exist  and password is correct
  const user = await User.findOne({ email: email }).select('+password');
  //call User Model Instance method to reaturn a boolean
  /* compare password that was provided by the user, with the password 
  retrieved from the database with the users associated email
  */
  const isCorrect = user
    ? await user.correctPassword(password, user.password)
    : false;

  if (!user || !isCorrect) {
    return next(new AppError('Incorrect email or password'));
  }

  //3)
  /*  if everything is ok, send token to the client, 
  the token with which the user will make subsequent request, and this 
  token needs to be valid before the user can be given access to any auth required 
  routed
  */
  createSendToken(user, 201, res);
});
