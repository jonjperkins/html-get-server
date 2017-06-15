var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const request = require('request');

PORT = process.env.PORT || 8080;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());


app.post('/', function(req, res, next) {
	//var webpage_html = ''
	//var fields = ''
	//var webpage_regex = /<input.*name="(.*?)"/g;
    console.log("Webhook received!");
    console.log("Url to GET: " + req.body.get_url)
    var request_url = req.body.get_url;

	request(request_url, function (error, response, body) {
  		console.log('body:', body);
  		var fields = []
  		var regex = /<input[\s\S]*?name="(.*?)"/g
		var item
		while (item = regex.exec(body))
			fields.push(item[1]);
      fields = fields.join(',');
  		res.send(fields);
	});
	
});


app.listen(PORT, function () {
  	console.log('Listening on port 8080!');
});

