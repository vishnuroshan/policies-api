const policyRouter = require('express').Router();
const policyController = require('../controllers/policy');
const { celebrate, Joi, errors } = require('celebrate');

policyRouter.get('/', celebrate({
	query: Joi.object().keys({
		user_id: Joi.string().required()
	})
}), errors(), (request, response) => {
	policyController.aggregatePolicies(request.query.user_id).then((result) => {
		response.status(200).send(result);
	}, err => { response.status(500).send(err) });
});

module.exports = policyRouter;