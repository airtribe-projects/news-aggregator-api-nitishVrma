require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, { /* options */ })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error("not able to connect to mongodb", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', authRoutes);

app.listen(port, (err) => {
  if (err) {
    return console.log('Something bad happened', err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;