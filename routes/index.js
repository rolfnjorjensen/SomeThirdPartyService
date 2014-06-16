var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('https://api-apps-sandbox.tradeshift.com/tradeshift/auth/login?response_type=code&client_id=AcmeCorp.DemoService2&redirect_uri=https://somethirdpartyservice.heroku.com/service&scope=openid');
});

module.exports = router;