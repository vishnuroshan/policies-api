require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes');
app.disable('x-powered-by');
const connectDb = require('./dbconn').connectDB
connectDb();
const formidable = require('formidable');

// form parser middleware
const formParser = (request, response, next) => {
	const contentType = request.headers['content-type'];
	if (!contentType || contentType.startsWith('multipart/form-data')) {

		const form = new formidable.IncomingForm();
		// default maxFileSize: 200mb 
		form.parse(request, (err, fields, files) => {
			if (err) response.send('form data parse-error');
			else {
				request.body = { fields, files };
				return next();
			}
		});
	} else next();
};
app.use(formParser, bodyParser.json());
app.use(morgan('common'));

// public routes
app.use('/upload/', routes.upload);
app.use('/policies/', routes.policies);
app.use('/search/', routes.search);
app.use('/schedule/', routes.schedule);


module.exports = app;