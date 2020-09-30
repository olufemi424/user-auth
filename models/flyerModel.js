const mongoose = require('mongoose');
// const slugify = require('slugify');

const flyerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A flyer must have a name'],
      unique: true,
      trim: true,
      maxlength: [
        40,
        'A flyer name musst have less or equal than 40 characters'
      ],
      minlength: [
        10,
        'A flyer name musst have less or equal than 10 characters'
      ]
    },
    slug: { type: String },
    duration: {
      type: Number,
      required: [true, 'A flyer must have a duration']
    },
    maxGroupSize: {
      type: Number,
      require: [true, 'A flyer must have a group size']
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: val => Math.round(val * 10) / 10 //4.6666 => 4.7
    },
    ratingQuantity: {
      type: Number,
      default: 0
    },
    flyerCover: {
      type: String,
      required: [true, 'A flyer must have a cover image']
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    startDates: [Date],
    secreteflyer: {
      type: Boolean,
      default: false
    },
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point']
      },
      coordinates: {
        type: [Number],
        default: [0, 0]
      },
      address: String,
      description: String
    },
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Flyer = mongoose.model('Flyer', flyerSchema);

module.exports = Flyer;
