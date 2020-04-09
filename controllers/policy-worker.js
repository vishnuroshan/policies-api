const { workerData, parentPort } = require('worker_threads');
const fileParser = require('../utils/sheetsParser');
const bluebird = require('bluebird');
const connectDb = require('../dbconn').connectDB
connectDb();
const UserAccount = require('../models/UserAccount');
const PolicyCarrier = require('../models/PolicyCarrier');
const PolicyCategory = require('../models/PolicyCategory');
const Policy = require('../models/Policy');
const User = require('../models/User');

const metadata = async (data) =>
	bluebird.mapSeries(data, async (each) => {
		const eachAccount = await UserAccount.findOne({ account_name: each.account_name });
		await User.create({ ...each, user_account_id: eachAccount._id });
		const eachUser = await User.findOne({ firstname: each.firstname });
		const eachCarrier = await PolicyCarrier.findOne({ company_name: each.company_name });
		const eachCategory = await PolicyCategory.findOne({ category_name: each.category_name });
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
	parentPort.postMessage('account');
};

worker(workerData);