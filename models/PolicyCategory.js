const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const policyCategorySchema = new Schema({
	category_name: {
		type: String,
		required: true,
		unique: true
	}
}, { timestamps: true });

policyCategorySchema.index({ 'category_name': 1 })

const PolicyCategory = mongoose.model('policyCategory', policyCategorySchema);

module.exports = PolicyCategory;