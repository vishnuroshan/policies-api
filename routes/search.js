const searchRouter = require('express').Router();
const searchController = require('../controllers/search');
const { celebrate, Joi, errors } = require('celebrate');

/**
 * 
 * @api {get} /search search
 * @apiName search
 * @apiGroup policies
 * @apiDescription search user policy
 * @apiVersion  0.1.0
 * 
 * @apiParam {String} username user's firstname.
 * 
 * @apiSuccess (200) {Object} policyDetails
 * 
 * @apiParamExample  {Object} Request-Example:
 *	{
 *	"username": "5e9360445a35926560b7e351"
 * 	}
 * 
 */
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