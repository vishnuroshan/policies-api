const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
	account_name: {
		type: String,
		required: true,
		unique: true
	}
}, { timestamps: true });

const Account = mongoose.model('account', accountSchema);

module.exports = Account;