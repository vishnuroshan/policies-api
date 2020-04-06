const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carrierSchema = new Schema({
	company_name: {
		type: String,
		required: true,
		unique: true
	}
}, { timestamps: true });

const Carrier = mongoose.model('carrier', carrierSchema);

module.exports = Carrier;