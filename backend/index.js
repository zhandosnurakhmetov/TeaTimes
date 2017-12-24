var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');

var api = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/prod',
  cloud: __dirname + '/cloud/main.js',
  appId: 'vm5lVClO04AYuSxqmcS0wpFjooVNuZbk9X6uN0xYrpo=',
  masterKey: 'uE2tekbwMzz4g0PVxFgjTeEsyEdWvJVCtOS0bSim+PA=',
  serverURL:
    'http://ec2-34-251-88-37.eu-west-1.compute.amazonaws.com:1337/parse',
});

var app = express();

app.use('/public', express.static(path.join(__dirname, '/public')));

var mountPath = '/parse';
app.use(mountPath, api);

app.get('/', function(req, res) {
  res
    .status(200)
    .send(
      'I dream of being a website.  Please star the parse-server repo on GitHub!',
    );
});

app.get('/test', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

var port = 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
  console.log('TeaTimes running on port ' + port + '.');
});
