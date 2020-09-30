/* eslint-disable node/no-unsupported-features/es-syntax */
const mongoose = require('mongoose');

const connectDB = async () => {
  const dbUrl =
    process.env.NODE_ENV !== `production`
      ? `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.iyvq7.mongodb.net/${process.env.MONGO_DB_DEV}?retryWrites=true&w=majority`
      : `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@af-proexprod.c0pmy.mongodb.net/${process.env.MONGO_DB_PROD}?retryWrites=true&w=majority`;

  console.log(dbUrl);
  try {
    const conn = await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    console.log(`DB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

module.exports = connectDB;
