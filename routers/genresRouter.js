

const express = require("express");

const router = express.Router();
const genresController=require('../controllers/genresController')
router.route('/').get(genresController.getAllGenres).post(genresController.createGenres)
router.route('/:id').get(genresController.getGenres).patch(genresController.updateGenres).delete(genresController.deleteGenres)


module.exports=router;