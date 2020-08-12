const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 30,
  },
  about: {
    type: String,
    required: true,
    min: 2,
    max: 30,
  },
  avatar: {
    type: String,
    validate: (link) => validator.isUrl(link),
    required: true,
  },
},
{
  versionKey: false,
});

module.exports = mongoose.model('user', userSchema);
