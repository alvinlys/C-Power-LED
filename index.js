const http = require('http');
const qs = require('querystring');
const net = require('net');
const _ = require('./services/common');

/*
Credits to microsocket/CP5200 https://github.com/microsocket/CP5200.git (page not found)
*/

http.createServer(function(req,res) {
    var body = '';
	req.on('data', function(data) {
		body += data;
		if (body.length > 1e6) {
			req.connection.destroy();
		}
	});
	req.on('end', function() {
        var post = qs.parse(body);
        post && intiConnection(post);
    });
	res.setHeader('Access-Control-Allow-Origin', '*');
    res.write('SUCCESS');
	res.end();
}).listen(8080);

console.log('LED Service Started. Listening Port: 8080');

process.on('uncaughtException', function(err) {
    console.log(new Error(err));
});

function intiConnection (data) {
    const socket = net.createConnection({ 
        port: 5200, 
        host: data.ip
    });
    
    socket.on('connect', () => {
        var res = _.CP5200Write(data);
        socket.write(res, 'hex');
    });
    
    socket.on('data', (data) => {
        socket.destroy();
    });

    socket.on('error', (err) => {
        console.log(new Error(err));
        socket.destroy();
    });
}
