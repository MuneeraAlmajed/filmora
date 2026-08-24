const User = require('../models/user');

const index = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);

        const search = req.query.search || '';

        const movies = user.movies.filter(movie =>
            movie.title.toLowerCase().includes(search.toLowerCase())
        );

        res.render('movies/index.ejs', {
            movies,
            search
        });

    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
};

const newMovie = async(req,res)=>{
    try{
        res.render('movies/new.ejs');
        
    }catch(err){
        console.log(err)
        res.redirect('/')
    }

}

const createMovie = async(req,res)=>{
    try{
        console.log(req.body);

        const user = await User.findById(req.session.user._id);
        
        user.movies.push(req.body);

        await user.save();
        
        res.redirect('/movies');
    }catch(err){
        console.log(err)
        res.render('/movies/new')
    }
}

const showMovie = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);

    const movie = user.movies.id(req.params.movieId);

    res.render('movies/show.ejs', { movie });
  } catch (err) {
    console.log(err);
    res.redirect('/movies');
  }
};

const editMovie = async(req,res)=>{
    try{
        const user = await User.findById(req.session.user._id);

        const movie = user.movies.id(req.params.movieId);

        res.render('movies/edit.ejs', {movie});
    
    }catch(err){
        console.log(err)
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
    console.log(err);
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
        console.log(err);
        res.redirect('/movies');
    }
};

module.exports = {
    index, newMovie, createMovie, showMovie, editMovie, updateMovie, deleteMovie,
}