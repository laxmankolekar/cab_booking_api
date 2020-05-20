const models = require('../../models');
const { error } = require('../../shared/logger');
const { requestRequiredParams, queryListHandler, pagedHeaders } = require('^shared/request');
module.exports = {
	getCabBookingList: async (req, res, next) => {
		const required = ['user_id'];
		const matches = [];
		const search = [];
		let include = [
			{
				model: models.User,
				as: 'User'
			},
			{
				model: models.Cab,
				as: 'Cab'
			}
		];

		const options = { include, matches, search };
		requestRequiredParams(req, required)
			.then(() => {
				return queryListHandler(req, options);
			})
			.then(query => {
				query.where.user_id = req.query.user_id;
				return models.CabBooking.findAndCountAll(query);
			})
			.then(function (data) {
				res.set(pagedHeaders(data.count))
					.status(200)
					.send(data.rows);
			})
			.catch(err => {
				error(err.message);
				next(err);
			});
	},

	createCabBooking: async (req, res, next) => {
		const newObject = req.body;
		models.CabBooking.create(newObject)
			.then(function (object) {
				if (object) {
					res.status(200).json(object);
				}
			})
			.catch(err => {
				error(err.message);
				next(err);
			});
	},
};
