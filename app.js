// Configuration File
var conf = require('./conf.json');
// Import Express
var express = require('express');
// Network Object
var net = require('net');
// Create Express Object
var app = express();

app.get('/tivo/channel/:channel', function (req, res) {
	// TiVo Configuration
	var tivoIp = conf.tivoIp;
    var tivoPort = conf.tivoPort;
    // Create Socket Object
    var client = new net.Socket();
    
    console.log(req.params.channel);

    client.connect(tivoPort, tivoIp, function() {
	console.log('Connected and sending: ' + 'SETCH ' + req.params.channel);
	client.write('SETCH ' + req.params.channel + '\r');
        client.destroy();
    });
    res.send('OK');
});
app.listen(8080);