var http = require('http');
const PORT=1668;
const hashtag = "pizza";
var isTweetAvailable = false;

function handleRequest(request, response){
	response.end(isTweetAvailable? '{"result":true}' : '{"result":false}');
	isTweetAvailable = false;
}

var server = http.createServer(handleRequest);
server.listen(PORT, function(){
	console.log("Server listening on: http://localhost:%s", PORT);
	startTwitterStream();
});


function startTwitterStream() {
	var Twitter = require('node-tweet-stream')
	  , t = new Twitter({
		consumer_key: 'xxx',
		consumer_secret: 'xxx',
		token: 'xxx',
		token_secret: 'xxx'
	  })

	t.on('tweet', function (tweet) {
		console.log('tweet received', tweet.text);
		isTweetAvailable = true;
	})

	t.on('error', function (err) {
		console.log('Shit.. tweets loading failed :(')
	})

	t.track('#' + hashtag);
}