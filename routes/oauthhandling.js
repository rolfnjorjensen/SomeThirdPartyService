var express = require('express');
var http = require('https');
var router = express.Router();

router.get('/', function(req, res) {
	if(req.query.code) {
		resolveTokens(req.query.code, function(tokens) {
			makeDemoAPICall(tokens.access_token, function(accountInfo) {
				res.render('oauth_success', { token : tokens.access_token, accountInfo: accountInfo});
			});
		});

	} else {
			res.send(400,'Bad Request');	
	}

});

function resolveTokens(code, callback) {
	var reqOptions = {
		hostname : 'api-apps-sandbox.tradeshift.com',
		path: '/tradeshift/auth/token',
		method: 'POST',
		auth: 'AcmeCorp.DemoService:abc123',
		headers: {
			"Accept" : "application/json",
			"Content-Type" : "application/x-www-form-urlencoded"
		}
	};

	var clientReq = http.request(reqOptions, function(clientRes) {
		clientRes.setEncoding('utf8');
		clientRes.on('data', function(data) {
			console.log('Got: ' + data);

			var tokens = JSON.parse(data);
			console.log(tokens.access_token);
			callback(tokens);				
		});
	});
	
	clientReq.write('grant_type=authorization_code&code=' + code);
	clientReq.end();
}

function makeDemoAPICall(accessToken, callback) {
	var reqOptions = {
		hostname : 'api-apps-sandbox.tradeshift.com',
		path: '/tradeshift-proxy/rest/external/account/info',
		headers: {
			"Accept" : "application/json",
			"Authorization" : "Bearer " + accessToken
		}
	};

	http.get(reqOptions, function(res) {
		res.on('data', function(data) {
			var accountInfo = JSON.parse(data);
			console.log("API response: " + accountInfo.CompanyName);
			callback(accountInfo);
		});
	});
}

module.exports = router;