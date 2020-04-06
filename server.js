const app = require('./app');
const http = require('http');
const config = require('./config');
// eslint-disable-next-line no-undef
const port = process.argv[2] || config.PORT;
const server = http.createServer();
server.on('request', app);
const db = require("./dbconn");
// db.connectDB();
db.connectToServer((err) => {
	if (err) console.log(err);
	else server.listen(port, () => {
		console.log('server started!');
	});
})





