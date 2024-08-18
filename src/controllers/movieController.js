const Movie = require('../models/movie');


exports.createMovie = async (req, res) => {
    const movie = new Movie({
        title : req.body.title,
        description : req.body.description,
        img_url : req.body.img_url,
        trailer_url : req.body.trailer_url
    });
    await movie.save();
    res.send(movie);
};

exports.getMovies = async (req, res) => {
    const movies = await Movie.find()
    res.send(movies)
};

exports.deleteMovies = async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id)
    return res.send(movie)
}

exports.updateMovies = async(req, res) => {
    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        title : req.body.title,
        description : req.body.description,
        img_url : req.body.img_url,
        trailer_url : req.body.trailer_url
    })

    return res.send(movie)
}