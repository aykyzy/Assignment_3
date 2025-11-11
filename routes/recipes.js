var express = require('express');
var router = express.Router();

//temp just to get it working and make sure
router.get('/', function(req, res) { 
    res.render('recipes/list', { title: 'My Recipes', recipes: [] });
});

module.exports = router;