const scheduleRouter = require('express').Router();
const scheduleController = require('../controllers/schedule');
const { celebrate, Joi, errors } = require('celebrate');

scheduleRouter.post('/', celebrate({
	body: Joi.object().keys({
		date: Joi.object().keys({
			year: Joi.number().required().min(new Date().getFullYear()).max(2021),
			month: Joi.number().required().min(0).max(11).example(0).note('jan is 0 and december is 11'),
			day: Joi.number().required().min(1).max(31),
			hour: Joi.number().required().min(0).max(23),
			minute: Joi.number().required().min(0).max(59),
			second: Joi.number().required().min(0).max(59)
		}),
		message: Joi.string().required()
	})
}), errors(), (request, response) => {
	const res = scheduleController.scheduleinsert(request.body.date, request.body.message);
	response.send(res);
});

module.exports = scheduleRouter;