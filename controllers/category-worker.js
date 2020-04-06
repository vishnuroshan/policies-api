const { workerData, parentPort } = require('worker_threads');
const fileParser = require('../utils/sheetsParser');
const bluebird = require('bluebird');
const connectDb = require('../dbconn').connectDB
connectDb();
const PolicyCategory = require('../models/PolicyCategory');

const metadata = async (data) =>
	bluebird.mapSeries(data, async (each) => {
		await PolicyCategory.updateOne({ category_name: each.category_name }, { category_name: each.category_name }, { upsert: true });
		// const eachCategory = await PolicyCategory.findOne({ category_name: each.category_name });
	});

const worker = async ({ path, type }) => {
	const data = await fileParser.toJson(path, type);
	await metadata(data);
	parentPort.postMessage({ data: 'success' });
};

worker(workerData);