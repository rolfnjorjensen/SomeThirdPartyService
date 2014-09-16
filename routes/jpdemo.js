var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('blinds_away', { url: req.query.redirectto });
});
module.exports = router;