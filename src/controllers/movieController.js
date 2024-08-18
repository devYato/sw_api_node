const Movie = require('../models/movie');
const mongoose = require('mongoose');

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
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('Invalid ID');
    }

    try {
        const movie = await Movie.findByIdAndDelete(id);

        if (!movie) {
            return res.status(404).send('Movie Not Found!');
        }

        return res.send(movie);
    } catch (error) {
        console.log(error)
        return res.status(500).send('Server Error!');
    }
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