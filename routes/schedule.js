const scheduleRouter = require('express').Router();
const scheduleController = require('../controllers/schedule');
const { celebrate, Joi, errors } = require('celebrate');

/**
 * 
 * @api {post} /schedule schedule
 * @apiName schedule
 * @apiDescription schedule message to be written in db at particular time and date
 * @apiGroup policies
 * @apiVersion  0.1.0
 * 
 * @apiParam {Object} date nested object.
 * @apiParam {Number} date[year] year (min current year and max next year).
 * @apiParam {Number} date[month] month (month starts from 0 [jan] and ends in 11 [dec]).
 * @apiParam {Number} date[day] day (min 1, max 31).
 * @apiParam {Number} date[hour] hour (min 0, max 23).
 * @apiParam {Number} date[minute] minute (min 0, max 59).
 * @apiParam {Number} date[second] second (min 0, max 59).
 * 
 * @apiSuccess (200) {Object} successMessage
 * 
 * @apiParamExample  {Object} Request-Example:
 *	{
 *	"date": {
 *		"year":2020,
 *		"month": 3,
 *		"day": 13,
 *		"hour": 0,
 *		"minute": 9,
 *		"second": 0
 *	    },
 *	 "message": "string is very good"
 *  }
 * 
 * 
 * @apiSuccessExample {Object} Success-Response:
 * {
 * status: 200,
 * message: "success"
 * }
 * 
 */

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