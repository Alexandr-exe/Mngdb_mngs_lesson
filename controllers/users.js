const Users = require('../models/users');

module.exports.getUsers = (req, res) => {
  Users.find({})
    .then((user) => res.send({ user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
module.exports.findUser = (req, res) => {
  const { id } = req.params;
  Users.findById(id)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
