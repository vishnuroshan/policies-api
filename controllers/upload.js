const ex = {};
const { Worker } = require('worker_threads');


ex.insertData = ({ path, type }) => {
	return new Promise((resolve, reject) => {
		const options = { workerData: { path, type } }
		let count = 0;
		const totalWorkers = 4;
		const onMessage = (val) => {
			++count;
			if (count >= totalWorkers) return resolve(val);
		};
		const onError = () => { console.log(err); return reject(err) };
		const onExit = (status) => {
			if (status !== 0)
				reject(new Error(`agent Worker stopped with exit code ${status}`));
		}
		const worker1 = new Worker(`${__dirname}/agent-worker.js`, options);
		worker1.on('message', onMessage);
		worker1.on('error', onError);
		worker1.on('exit', onExit);
		const worker2 = new Worker(`${__dirname}/account-worker.js`, options);
		worker2.on('message', onMessage)
		worker2.on('error', onError);
		worker2.on('exit', onExit);
		const worker3 = new Worker(`${__dirname}/carrier-worker.js`, options);
		worker3.on('message', onMessage);
		worker3.on('error', onError);
		worker3.on('exit', onExit);
		const worker4 = new Worker(`${__dirname}/category-worker.js`, options);
		worker4.on('message', onMessage);
		worker4.on('error', onError);
		worker4.on('exit', onExit);
	});

}

module.exports = ex;