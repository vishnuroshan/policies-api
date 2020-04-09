const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carrierSchema = new Schema({
	company_name: {
		type: String,
		required: true,
		unique: true
	}
}, { timestamps: true });

carrierSchema.index({ 'company_name': 1 }, { unique: true });
const Carrier = mongoose.model('carrier', carrierSchema);

module.exports = Carrier;