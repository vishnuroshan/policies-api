const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const agentSchema = new Schema({
	agent: {
		type: String,
		required: true,
		unique: true
	}
}, { timestamps: true });

const Agent = mongoose.model('agent', agentSchema);

module.exports = Agent;