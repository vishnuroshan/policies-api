const { workerData, parentPort } = require('worker_threads');
const fileParser = require('../utils/sheetsParser');
const bluebird = require('bluebird');
const connectDb = require('../dbconn').connectDB
connectDb();
const UserAccount = require('../models/UserAccount');

const metadata = async (data) =>
	bluebird.mapSeries(data, async (each) => {
		await UserAccount.updateOne({ account_name: each.account_name }, { account_name: each.account_name }, { upsert: true });
		// const eachAccount = await UserAccount.findOne({ account_name: each.account_name });
	});

const worker = async ({ path, type }) => {
	const data = await fileParser.toJson(path, type);
	await metadata(data);
	parentPort.postMessage({ data });
};

worker(workerData);