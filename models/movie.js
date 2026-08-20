const mongoose = require('mongoose');

// create the schema
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  notes: {
    type: String
  },

  status: {
    type: String,
    enum: ['To watch','Watched','Not yet', 'Watching'],
    default: 'Not yet'
  },

  rating: {
    type: Number,
    min: 0,
    max: 5,
  }
});
// initial the model

const User = mongoose.model('Movie', movieSchema);

// export it
module.exports = User;
