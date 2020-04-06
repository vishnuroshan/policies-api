const { workerData, parentPort } = require('worker_threads');
const fileParser = require('../utils/sheetsParser');
const bluebird = require('bluebird');
const connectDb = require('../dbconn').connectDB
connectDb();
const Agent = require('../models/Agent');

const metadata = async (data) =>
	bluebird.mapSeries(data, async (each) => {
		await Agent.updateOne({ agent: each.agent }, { agent: each.agent }, { upsert: true });
		// const eachAgent = await Agent.findOne({ agent: each.agent });
	});

const worker = async ({ path, type }) => {
	const data = await fileParser.toJson(path, type);
	await metadata(data);
	parentPort.postMessage({ data });
};

worker(workerData);