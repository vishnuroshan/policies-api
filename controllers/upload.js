const ex = {};
const { Worker } = require('worker_threads');

ex.insertData = ({ path, type }) => {
	return new Promise((resolve, reject) => {
		let totalWorkers = 0;
		// const worker1 = new Worker(`${__dirname}/worker-1.js`, { workerData: { path, type } });
		const worker1 = new Worker(`${__dirname}/agent-worker.js`, { workerData: { path, type } });
		worker1.on('message', (val) => {
			console.log(val);
			++totalWorkers;
			if (totalWorkers >= 4) return resolve('agent');
		});
		worker1.on('error', reject);
		worker1.on('online', () => {
			console.log('agent worker online');
		});
		worker1.on('exit', (status) => {
			if (status !== 0)
				reject(new Error(`agent Worker stopped with exit code ${status}`));
		});

		// 2nd worker
		const worker2 = new Worker(`${__dirname}/account-worker.js`, { workerData: { path, type } });
		worker2.on('message', (val) => {
			console.log(val);
			++totalWorkers;
			if (totalWorkers >= 4) return resolve('account');
		});
		worker2.on('error', reject);
		worker2.on('online', () => {
			console.log('account worker online');
		});
		worker2.on('exit', (status) => {
			if (status !== 0)
				reject(new Error(`account Worker stopped with exit code ${status}`));
		});

		// 3rd worker
		const worker3 = new Worker(`${__dirname}/carrier-worker.js`, { workerData: { path, type } });
		worker3.on('message', (val) => {
			console.log(val);
			++totalWorkers;
			if (totalWorkers >= 4) return resolve('carrier');
		});
		worker3.on('error', reject);
		worker3.on('online', () => {
			console.log('account worker online');
		});
		worker3.on('exit', (status) => {
			if (status !== 0)
				reject(new Error(`account Worker stopped with exit code ${status}`));
		});

		// 4th worker
		const worker4 = new Worker(`${__dirname}/category-worker.js`, { workerData: { path, type } });
		worker4.on('message', (val) => {
			console.log(val);
			++totalWorkers;
			if (totalWorkers >= 4) return resolve('category');
		});
		worker4.on('error', reject);
		worker4.on('online', () => {
			console.log('account worker online');
		});
		worker4.on('exit', (status) => {
			if (status !== 0)
				reject(new Error(`account Worker stopped with exit code ${status}`));
		});
	});

}

const workerDispacther = (workerData) => {
}

module.exports = ex;