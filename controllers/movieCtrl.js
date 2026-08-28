const User = require('../models/user');

const index = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);

        res.render('movies/index.ejs', {
            movies: user.movies
        });

    } catch (err) {
        res.redirect('/');
    }
};

const newMovie = async(req,res)=>{
    try{
        res.render('movies/new.ejs');
        
    }catch(err){
        res.redirect('/')
    }

}

const createMovie = async(req,res)=>{
    try{
        const user = await User.findById(req.session.user._id);
        
        user.movies.push(req.body);

        await user.save();
        
        res.redirect('/movies');
    }catch(err){
        res.render('/movies/new')
    }
}

const showMovie = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);

    const movie = user.movies.id(req.params.movieId);

    if (!movie) {
            return res.redirect('/movies');
        }

    res.render('movies/show.ejs', { movie });
  } catch (err) {
    res.redirect('/movies');
  }
};

const editMovie = async(req,res)=>{
    try{
        const user = await User.findById(req.session.user._id);

        const movie = user.movies.id(req.params.movieId);

        res.render('movies/edit.ejs', {movie});
    
    }catch(err){
        res.redirect('/');
    }
}

const updateMovie = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);

    const movie = user.movies.id(req.params.movieId);

    movie.set(req.body);

    await user.save();

    res.redirect(`/movies/${movie._id}`);
  } catch (err) {
    res.redirect('/movies');
  }
};

const deleteMovie = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);

        const movie = user.movies.id(req.params.movieId);

        movie.deleteOne();

        await user.save();

        res.redirect('/movies');

    } catch (err) {
        res.redirect('/movies');
    }
};

const searchMovies = async (req, res) => {
    try {
        const response = await fetch(
            `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${encodeURIComponent(req.query.search)}&type=movie`
        );

        const data = await response.json();

        res.render('movies/search.ejs', {
            movies: data.Search || [],
            query: req.query.search
        });

    } catch (err) {
        res.redirect('/');
    }
};

const addNewMovie = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);

        user.movies.push({
            imdbID: req.body.imdbID,
            title: req.body.title,
            image: req.body.image
        });

        await user.save();

        res.redirect('/movies');

    } catch (err) {
        res.redirect('/');
        
    }
};
module.exports = {
    index, newMovie, createMovie, showMovie, editMovie, updateMovie, deleteMovie,searchMovies, addNewMovie,
}