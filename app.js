// app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const preferenceRoutes = require('./routes/preferenceRoutes');
const newsRoutes = require('./routes/newsRoutes');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error("Not able to connect to MongoDB", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', authRoutes);         
app.use('/', preferenceRoutes);
app.use('/', newsRoutes);

app.listen(port, (err) => {
  if (err) {
    return console.log('Something bad happened', err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;