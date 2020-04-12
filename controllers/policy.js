const policyController = {};
const Policy = require('../models/Policy');
const User = require('../models/User');

policyController.aggregatePolicies = async () => {
	const res = [];
	const aggregate = await Policy.find();
	aggregate.map((val) => {
		res.push({
			[val.user_id]: val
		});
	})
	return res;
};

module.exports = policyController;
