const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const agentSchema = new Schema({
	agent: {
		type: String,
		required: true,
		unique: true
	}
}, { timestamps: true });

agentSchema.index({ 'agent': 1 });

const Agent = mongoose.model('agent', agentSchema);

module.exports = Agent;