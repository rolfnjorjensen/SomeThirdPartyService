var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('http://localhost:8889/tradeshift-proxy/auth/login?response_type=code&client_id=BillysBilling.Billing&redirect_uri=http://localhost:3000/service&scope=openid');
});

module.exports = router;