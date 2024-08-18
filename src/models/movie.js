const mongoose = require ('mongoose');

const movieSchema = new mongoose.Schema({
    title: String,
    description: String,
    img_url: String,
    trailer_url: String
});

const Movie = mongoose.model("movie", movieSchema);

module.exports = Movie;