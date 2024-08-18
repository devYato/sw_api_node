const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/', movieController.getMovies);
router.post('/', movieController.createMovie);
router.delete('/:id/', movieController.deleteMovies);
router.put('/', movieController.updateMovies);
module.exports = router;