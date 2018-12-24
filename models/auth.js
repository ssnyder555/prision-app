const mongoose = require('mongoose');

const Auth = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  adress: String,
  phone: Number
});

module.exports = mongoose.model('Auth', Auth)