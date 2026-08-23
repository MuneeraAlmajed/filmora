const Movie = require('../models/movie');

const index = async(req,res)=>{
    try{
        const movies = await Movie.find();
        res.render('movies/index.ejs', {movies});;
    }catch(err){
        console.log(err)
            res.redirect('/');
        
    }
}

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
        const movie = await Movie.create(req.body);
        
        res.redirect('/movies');
    }catch(err){
        console.log(err)
        res.render('/movies/new')
    }
}

const showMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId);

    res.render('movies/show.ejs', { movie });
  } catch (err) {
    console.log(err);
    res.redirect('/movies');
  }
};

const editMovie = async(req,res)=>{
    try{
        const movie = await Movie.findById(req.params.movieId);
        res.render('movies/edit.ejs', {movie});
    
    }catch(err){
        console.log(err)
        res.redirect('/');
    }
}

const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId);

    movie.set(req.body);

    await movie.save();

    res.redirect(`/movies/${movie._id}`);
  } catch (err) {
    console.log(err);
    res.redirect('/movies');
  }
};

const deleteMovie = async(req,res)=>{
    try{
       const movie = await Movie.findByIdAndDelete(req.params.movieId);
       await movie.save();
       res.redirect(`/movies/${movie._id}`);

    }catch(err){
        console.log(err)
        res.redirect('/movies')
    }
}

module.exports = {
    index, newMovie, createMovie, showMovie, editMovie, updateMovie, deleteMovie,
}