var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
var path = require('path');

var appId = 'vm5lVClO04AYuSxqmcS0wpFjooVNuZbk9X6uN0xYrpo=';
var masterKey = 'uE2tekbwMzz4g0PVxFgjTeEsyEdWvJVCtOS0bSim+PA=';
var fileKey = '0xMt9m/1ekpIP6Y7vo/FuSZ8xHmpWmV9FdhYbK6GuOo=';
var serverURL =
  'http://ec2-34-251-88-37.eu-west-1.compute.amazonaws.com:1337/parse';

var api = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/prod',
  cloud: __dirname + '/cloud/main.js',
  appId: appId,
  masterKey: masterKey,
  // fileKey: fileKey,
  serverURL: serverURL,
});

var dashboard = new ParseDashboard(
  {
    apps: [
      {
        appId: appId,
        masterKey: masterKey,
        serverURL: serverURL,
        // fileKey: fileKey,
        appName: 'TeaTimes',
      },
    ],
    users: [
      {
        user: 'tea',
        pass: 'pass',
      },
    ],
  },
  { allowInsecureHTTP: true },
);

var app = express();

app.use('/public', express.static(path.join(__dirname, '/public')));

app.use('/parse', api);

app.use('/dashboard', dashboard);

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
