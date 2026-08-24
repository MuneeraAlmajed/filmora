const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
    image: {
    type: String,
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
  }, 
  
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  movies: [movieSchema],

});
// initial the model

const User = mongoose.model('User', userSchema);

// export it
module.exports = User;
