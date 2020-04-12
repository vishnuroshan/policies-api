const searchRouter = require('express').Router();
const searchController = require('../controllers/search');
const { celebrate, Joi, errors } = require('celebrate');

searchRouter.get('/', celebrate({
	query: Joi.object().keys({
		username: Joi.string().required()
	})
}), errors(), (request, response) => {
	searchController.findUserPolicy(request.query.username).then((searchRes) => {
		response.status(200).json(searchRes);
	}, err => {
		response.status(500).json(err);
	});
});

module.exports = searchRouter;