const { workerData, parentPort } = require('worker_threads');
const fileParser = require('../utils/sheetsParser');
const bluebird = require('bluebird');
const connectDb = require('../dbconn').connectDB
connectDb();
const PolicyCarrier = require('../models/PolicyCarrier');

const metadata = async (data) =>
	bluebird.mapSeries(data, async (each) => {
		await PolicyCarrier.updateOne({ company_name: each.company_name }, { company_name: each.company_name }, { upsert: true });
		// const eachCarrier = await PolicyCarrier.findOne({ company_name: each.company_name });
	});

const worker = async ({ path, type }) => {
	const data = await fileParser.toJson(path, type);
	await metadata(data);
	parentPort.postMessage({ data: 'success' });
};

worker(workerData);