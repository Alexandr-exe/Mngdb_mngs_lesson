const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const users = require('./routes/users');
const cards = require('./routes/cards');

const app = express();

app.use(helmet());

const { PORT = 3000 } = process.env;

async function start() {
  try {
    await mongoose.connect('mongodb://localhost:27017/moestrodb', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    app.listen(PORT);
  } catch (e) {
    console.log(e);
  }
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = { _id: '5f2fc839e47a9c32d89d96d8' };
  next();
});

app.use('/users', users);
app.use('/cards', cards);
app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

start();
