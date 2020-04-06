const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	firstname: {
		type: String,
		required: true
	},
	city: {
		type: String
	},
	gender: {
		type: String
	},
	email: {
		type: String
	},
	phone: {
		type: String
	},
	address: {
		type: String
	},
	state: {
		type: String
	},
	zip: {
		type: String
	},
	dob: {
		type: Date
	},
	userType: {
		type: String
	},
	user_account_id: {
		type: Schema.Types.ObjectId,
		ref: "account"
	}
}, { timestamps: true });

const User = mongoose.model('user', userSchema);

module.exports = User;