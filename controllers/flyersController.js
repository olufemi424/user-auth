const Flyer = require('./../models/flyerModel');
const factory = require('./handlerFactory');

exports.getAllFlyers = factory.getAll(Flyer);
