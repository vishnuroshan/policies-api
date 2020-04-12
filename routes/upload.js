const uploadRouter = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');
const uploadController = require('../controllers/upload');

/**
 * 
 * @api {post} /upload upload
 * @apiName upload
 * @apiGroup policies
 * @apiVersion  0.1.0
 * @apiDescription upload data to be inserted into the database (multipart formdata. key: 'file')
 * 
 */

uploadRouter.post('/', celebrate({
	body: Joi.object().keys({
		files: Joi.object().required(),
		fields: Joi.object()
	})
}), errors(), (request, response) => {
	const file = request.body.files.file;
	uploadController.insertData(file).then((value) => {
		response.send(value);
	});
});

module.exports = uploadRouter;