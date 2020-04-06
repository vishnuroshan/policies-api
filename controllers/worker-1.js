const { workerData, parentPort, isMainThread } = require('worker_threads');
const fileParser = require('../utils/sheetsParser');
const bluebird = require('bluebird');
const Agent = require('../models/Agent');
const connectDb = require('../dbconn').connectDB
connectDb()
const Policy = require('../models/Policy');
const PolicyCarrier = require('../models/PolicyCarrier');
const PolicyCategory = require('../models/PolicyCategory');
const User = require('../models/User');
const UserAccount = require('../models/UserAccount');

const metadata = async (data) =>
	bluebird.mapSeries(data, async (each) => {
		await Agent.updateOne({ agent: each.agent }, { agent: each.agent }, { upsert: true });
		// const eachAgent = await Agent.findOne({ agent: each.agent });
		await UserAccount.updateOne({ account_name: each.account_name }, { account_name: each.account_name }, { upsert: true });
		const eachAccount = await UserAccount.findOne({ account_name: each.account_name });
		await PolicyCarrier.updateOne({ company_name: each.company_name }, { company_name: each.company_name }, { upsert: true });
		const eachCarrier = await PolicyCarrier.findOne({ company_name: each.company_name });
		await PolicyCategory.updateOne({ category_name: each.category_name }, { category_name: each.category_name }, { upsert: true });
		const eachCategory = await PolicyCategory.findOne({ category_name: each.category_name });
		const eachUser = await User.create({ ...each, user_account_id: eachAccount._id });
		await Policy.create({
			...each,
			user_id: eachUser._id,
			company_id: eachCarrier._id,
			policy_category_id: eachCategory._id
		});
	});

const worker = async ({ path, type }) => {
	const data = await fileParser.toJson(path, type);
	await metadata(data);
	parentPort.postMessage({ data: 'success' });
};

worker(workerData);


