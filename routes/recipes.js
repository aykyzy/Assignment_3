let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Recipe = require('../models/recipe');

//READ: display list of recipes
router.get('/', async function(req, res, next){
  try{
    let recipes = await Recipe.find().sort({ createdAt: -1 }).lean();
    res.render('recipes/list', { title: 'My Recipes', recipes});
  } catch(err){
    next(err);
  }
});

//CREATE: add recipe form
router.get('/new', function(req, res) {
  res.render('recipes/new', { title: 'Add Recipe' });
});

//CREATE: form submission
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

//UPDATE: show edit form
router.get('/:id/edit', async function(req, res, next) {
  try {
    let recipe = await Recipe.findById(req.params.id).lean();
    if (!recipe) return res.status(404).send('Recipe not found!');
    res.render('recipes/edit', { title: 'Edit Recipe', recipe });
  } catch (err) {
    next(err);
  }
});

//UPDATE: form submission
router.post('/:id/edit', async function(req, res, next) {
  try {
    let title = req.body.title;
    let ingredients = req.body.ingredients;
    let steps = req.body.steps;
    let tags = (req.body.tags || '')
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    await Recipe.findByIdAndUpdate(req.params.id, {
      title, ingredients, steps, tags
    });

    res.redirect('/recipes');
  } catch (err) {
    next(err);
  }
});

//DELETE: confirmation delete
router.get('/:id/delete', async function(req, res, next) {
  try {
    let recipe = await Recipe.findById(req.params.id).lean();
    if (!recipe) return res.status(404).send('Recipe not found');
    res.render('recipes/delete', { title: 'Delete Recipe', recipe });
  } catch (err) {
    next(err);
  }
});

//DELETE: deletion
router.post('/:id/delete', async function(req, res, next) {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.redirect('/recipes');
  } catch (err) {
    next(err);
  }
});

module.exports = router;