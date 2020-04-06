const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const policySchema = new Schema({
	policy_number: {
		type: String,
		required: true
	},
	policy_start_date: {
		type: String
	},
	policy_end_date: {
		type: String
	},
	policy_type: {
		type: String
	},
	policy_category_id: {
		type: Schema.Types.ObjectId,
		ref: "policyCategory"
	},
	company_id: {
		type: Schema.Types.ObjectId,
		ref: "carrier"
	},
	user_id: {
		type: Schema.Types.ObjectId,
		ref: "user"
	}
}, {
	timestamps: true
});

const Policy = mongoose.model('policy', policySchema);

module.exports = Policy;