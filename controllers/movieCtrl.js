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

module.exports = {
    index, newMovie,
}