const mongoose = require('mongoose');

const prisonersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  crime: String,
  race: String,
  picture: String,
  durationOfStay: String,
  behavior: String,
  cellNumber: String
});

module.exports = mongoose.model('Prisoner', prisonersSchema);