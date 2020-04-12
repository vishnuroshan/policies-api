const policyRouter = require('express').Router();
const policyController = require('../controllers/policy');
const { celebrate, Joi, errors } = require('celebrate');

/**
 * 
 * @api {get} /policies policies
 * @apiName policies
 * @apiDescription aggregated policies for each user
 * @apiGroup policies
 * @apiVersion  0.1.0
 * 
 * @apiParam  {String} user_id user's id (ObjectId)
 * 
 * @apiSuccess (200) {Array} policyAggregate policy data for the particular user
 * 
 * @apiParamExample  {Object} Request-Example:
 * {
 *     user_id : "5e9360445a35926560b7e351"
 * }
 * 
 * 
 * @apiSuccessExample {Array} Success-Response:
 * [
 * 	{
 *   "5e9360445a35926560b7e351": {
 *     "_id": "5e8ea34bb7dff531a7409ba5",
 *     "policy_number": "YEEX9MOIBU7X",
 *     "policy_type": "Single",
 *     "policy_start_date": "2018-11-02",
 *     "policy_end_date": "2019-11-02",
 *     "user_id": "5e8ea34bb7dff531a7409ba4",
 *     "company_id": "5e8ea34ba2897aa75f479863",
 *     "policy_category_id": "5e8ea34ba2897aa75f479865",
 *     "createdAt": "2020-04-09T04:23:39.696Z",
 *     "updatedAt": "2020-04-09T04:23:39.696Z",
 *     "__v": 0
 *   }
 * }
 * 
 */
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