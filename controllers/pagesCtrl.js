const User = require('../models/user');

const home = async (req, res) => {
  try {

    if (req.session.user) {

      const user = await User.findById(req.session.user._id);

const movies = user.movies;

const totalMovies = movies.length;

const watchedMovies = movies.filter(
  movie => movie.status === 'Watched'
).length;

const toWatchMovies = movies.filter(
  movie => movie.status === 'To watch'
).length;

const ratedMovies = movies.filter(
  movie => movie.rating !== undefined
);

const averageRating = ratedMovies.length
  ? (
      ratedMovies.reduce(
        (total, movie) => total + movie.rating,
        0
      ) / ratedMovies.length
    ).toFixed(1)
  : 0;


      res.render('index.ejs', {
        user,
        movies,
        totalMovies,
        watchedMovies,
        toWatchMovies,
        averageRating
      });

    } else {

      res.render('index.ejs', {
        user: null,
        movies: []
      });

    }

  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
};

module.exports = {
  home,
};