const searchController = {};
// const connectDb = require('../dbconn').connectDB;
// connectDb();
const User = require('../models/User');
const Policy = require('../models/Policy');
const PolicyCategory = require('../models/PolicyCategory');
const PolicyCarrier = require('../models/PolicyCarrier');

searchController.findUserPolicy = async (firstname) => {
	try {
		const user = await User.findOne({ firstname })
		if (user) {
			let policy = await Policy.findOne({ user_id: user._id });
			let policyCategory = await PolicyCarrier.findById(policy.company_id);
			let policyCarrier = await PolicyCategory.findById(policy.policy_category_id);
			return { status: 200, result: { policy, policyCategory, policyCarrier } };
		}
		return null;
	} catch (err) {
		console.log(err);
		return { status: 500, error, policy: [] };
	}
};


module.exports = searchController;