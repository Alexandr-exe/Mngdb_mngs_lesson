const bcrypt = require('bcryptjs');
const Users = require('../models/user');

const getUsers = (req, res) => {
  Users.find({})
    .then((users) => {
      if (users) {
        res.send({ users });
        return;
      }
      res.status(404).send({ message: 'Пользователи отсутствуют' });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

const findUser = (req, res) => {
  res.set({ 'Content-Type': 'Application/json; charset=utf-8' });
  Users.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
        return;
      }
      res.status(404).send({ message: 'Пользователь не найден' });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

const createUser = (req, res) => {
  const {
    name, about, avatar, email,
  } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => Users.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports = {
  getUsers,
  findUser,
  createUser,
};
