const mongoose = require("mongoose");
const config = require('../config');
let MongoClient = require('mongodb').MongoClient;
require('mongodb').Db
/**
 * @type {D}
 */
let _db;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
	socketTimeoutMS: 30000,
	keepAlive: true,
	poolSize: 50,
	autoIndex: true,
	// reconnectTries: 30000,
};

const connectDB = async () => {
	const conn = await mongoose.connect(config.MONGO_URL, options);
	console.log(`MongoDB Connected: ${conn.connection.host}`);
	return conn;
};

module.exports = {
	connectToServer: async function (callback) {
		await MongoClient.connect(config.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		},
			function (err, client) {
				_db = client.db(config.DBNAME);
				return callback(err);
			});
	},

	/**
	 * @type {()=>import('mongodb').Db}
	 */
	getDb: function (data) {
		return _db;
	},
	connectDB: connectDB
};
