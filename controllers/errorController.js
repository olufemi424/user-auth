/* eslint-disable no-param-reassign */
// const AppError = require('../utils/appError');

// send error when in  development
const sendErrorForDev = (err, req, res) => {
  //Api error
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  }
  //error for render website
  console.log('something went wrong< no rought was matched');
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong,  no rought was matched.',
    msg: err.message
  });
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorForDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    console.log('handle prod error', err);
    //   let error = { ...err };
    //   error.message = err.message;

    //   if (error.name === 'CastError') {
    //     error = handleCastErrorDB(error);
    //   }

    //   if (error.code === 11000) {
    //     error = handleDubplicateDB(error);
    //   }

    //   if (error.name === 'ValidationError') {
    //     error = handleValidationErrorDB(error);
    //   }

    //   if (error.name === 'JsonWebTokenError') {
    //     error = handleJWTError(error);
    //   }

    //   if (error.name === 'TokenExpiredError') {
    //     error = handleJWTExpiredError(error);
    //   }

    //   sendErrorForProd(error, req, res);
  }
};
