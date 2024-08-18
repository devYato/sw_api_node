const Movie = require('../models/movie');
const mongoose = require('mongoose');


// study gow to use Joy or express validator for complex validations
// create a new Movie
exports.createMovie = async (req, res) => {
    try{
        const{ title, description, img_url, trailer_url } = req.body;

        //Basic Validation (in case i can use Joi lib for complex validations)
        if(!title || !description){
            return res.status(400).json({error: "Title and Description are required"});
        }

        const movie = new Movie({
            title,
            description,
            img_url,
            trailer_url
        });
        
        await movie.save();

        return re.status(201).json(movie); // 201 created
    } catch(err){
        return res.status(500).json({error: err.message});
    }
};

// get all movies
exports.getMovies = async (req, res) => {
    try{
        const movies = await Movie.find();
        return res.status(200).json(movies);
    } catch(err){
        return res.status(500).json({error: err.message});
    }
};

//delete a Movie
exports.deleteMovies = async (req, res) => {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({error: "Invalid ID"});
        }

        try{
            const movie = await Movie.findByIdAndDelete(id);

            if(!movie){
                return res.status(404).json({error: "Movie not found"});
            }
            
            return res.status(200).json({message: "Movie deleted successfully"}); // 200 ok
        }catch(error) {
            console.error('error deleting movie', error);
            return res.status(500).json({error: error.message});
        }
    
};

//update a Movie
exports.updateMovies = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: "Invalid ID"});
    }

    try {
        const movie = await Movie.findByIdAndUpdate(id,{
            title: req.body.title,
            description: req.body.description,
            img_url: req.body.img_url,  
            trailer_url: req.body.trailer_url
        }, {new : true}); //new:true returns the updated movie

        if(!movie){
            return res.status(404).json({error: "Movie not found"});
        }

        return res.status(200).json(movie); // 200 ok
    }catch(error){
        console.error('error updating movie', error);
        return res.status(500).json({error: error.message});
    }
};