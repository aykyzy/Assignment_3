var express = require('express');
var router = express.Router();

/* getting my splash page */
router.get('/', function(req, res) {
  res.render('index', { title: 'Recipe Manager' });
});

module.exports = router;