let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Recipe = require('../models/recipe');

//GET /recipes -> list
router.get('/', async function(req, res, next){
  try{
    let recipes = await Recipe.find().sort({ createdAt: -1 }).lean();
    res.render('recipes/list', { title: 'My Recipes', recipes});
  } catch(err){
    next(err);
  }
});

//GET /recipes/new -> form
router.get('/new', function(req, res) {
  res.render('recipes/new', { title: 'Add Recipe' });
});

//POST /recipes -> create
router.post('/', async function(req, res, next) {
  try {
    let title = req.body.title;
    let ingredients = req.body.ingredients;
    let steps = req.body.steps;
    let tags = (req.body.tags || '')
      //split string into array, removes spaces, removes any empty string
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);
    
    await Recipe.create({ title, ingredients, steps, tags});
    res.redirect('/recipes');

  } catch (err){
    next(err);
  }
});

module.exports = router;