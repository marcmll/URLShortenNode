// Require
var express = require('express'),
    app = express(),
    redis = require("redis"),
    client = redis.createClient(),
    bodyParser = require("body-parser");
    
// Check for Redis
client.on("error", function (err) {
    console.log("Error " + err);
});

// Static Files
app.use(express.static('public'));
// Parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Views und pug templating
app.set('views', './views');
app.set('view engine', 'pug');

// Index
app.get('/', function (req, res) {

	var passedVariable = req.query.error;
	if(passedVariable && passedVariable != 'undefinded' && passedVariable == 'notFound') {
		res.render('index', { 'error' : `The link you entered is invalid and can't be found in our database` } );
	} else {
		res.render('index');
	}

	
})

// Post ID + Link
app.post('/addLink', function(req, res, next) {

	var link = req.body.link;

	function addLink() {

		// Create random id
		var id = '';
	    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	    for( var i = 0; i < 5; i++ ){
	    	id += possible.charAt(Math.floor(Math.random() * possible.length));
	    }

	    client.get(id, function(err, reply) {
		    if (reply == '' || reply == null) {
		    	client.set(id, link, function(err, reply) {
		    		var stats = id + 'stats';
		    		client.set(stats, 0);
		    		console.log(reply);
		    		console.log(id);
		    		var data = {
		    			id: id
		    		}
		    		res.send(data);
		    	});
		    } else {
		    	addLink();
		    }
		});

	}

	addLink();

});

// Get ID
app.get('/:id', function(req, res, next) {

    var id = req.params.id,
    	stats = id + 'stats';

    client.get(id, function(err, reply) {
	    if(reply != '' && reply != null && reply != 'nil') {
	    	client.incr(stats);
	    	console.log(reply);
	    	res.redirect(reply);
	    } else {
	    	res.redirect('/?error=notFound');
	    }
	});

});

// Get Stats
app.get('/:id/stats', function(req, res, next) {

    var id = req.params.id,
    	stats = id + 'stats',
    	shortUrl = '/' + id,
    	shortDisplayUrl = 'localhost:3000/' + id;

    client.get(id, function(err, idReply) {
	    if(idReply != '' && idReply != null && idReply != 'nil') {
	    	client.get(stats, function(err, statsReply) {
			    if(statsReply != '' && statsReply != null && statsReply != 'nil') {
			    	console.log(statsReply);
			    	res.render('stats', { shortUrl: shortUrl, shortDisplayUrl: shortDisplayUrl, url: idReply, stats: statsReply });
			    } else {
			    	res.redirect('/?error=notFound');
			    }
			});
	    } else {
	    	res.redirect('/?error=notFound');
	    }
	});

});
 
// Listen
var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("App listening at http://%s:%s", host, port);
});