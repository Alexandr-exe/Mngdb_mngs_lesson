const express = require('express');
const mongoose = require('mongoose');
const user = require('./routes/users');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/moestrodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use('/users', user);

app.listen(PORT);
