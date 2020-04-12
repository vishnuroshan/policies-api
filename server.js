const app = require('./app');
const http = require('http');
const config = require('./config');
// eslint-disable-next-line no-undef
const port = process.argv[2] || config.PORT;
const server = http.createServer();
const cpu = require('./utils/os-load');
const { spawn } = require('child_process');

const restartProcess = () => {
	spawn('node', ['server.js'], {
		detached: false,
		// stdio: ['ignore', out, err]
	}).unref()
	process.exit(0);
}

server.on('request', app);
server.listen(port, () => {
	let start = cpu.calculateStartMessure
	setInterval(function () {
		let usage = cpu.calculateCPUusage(start);
		if (usage > 40) console.log(usage + '% usage');
		if (usage > 70) {
			console.log(usage + '% usage')
			console.log('restarting server!...')
			restartProcess();
		}
	}, 500);
	console.log('server started!');
});
