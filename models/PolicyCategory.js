const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const policyCategorySchema = new Schema({
	category_name: {
		type: String,
		required: true,
		unique: true
	}
}, { timestamps: true });

const Carrier = mongoose.model('policyCategory', policyCategorySchema);

module.exports = Carrier;