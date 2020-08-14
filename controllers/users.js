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
  const { name, about, avatar } = req.body;
  Users.create({ name, about, avatar })
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Неверно сформирован запрос ' });
        return;
      }
      res.status(500).send({ message: err.message });
    });
};

module.exports = {
  getUsers,
  findUser,
  createUser,
};
