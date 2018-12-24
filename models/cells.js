const mongoose = require('mongoose');
const Prisoner = require('./prisoners')
const cellsSchema = new mongoose.Schema({

  name: String,
  capacity: Number,
  prisoner: [Prisoner.schema],

});
// numberOfPrisonCells: {
//   type: Number,
//   required: true
// },
// durationOfStay: Number,
// compadableWithOthers: Boolean
// cellNumber: String
// });

module.exports = mongoose.model('Cells', cellsSchema);