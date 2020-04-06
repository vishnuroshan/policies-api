const uploadRouter = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');
const uploadController = require('../controllers/upload');


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