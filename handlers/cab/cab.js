const models = require('../../models');
const { error } = require('../../shared/logger');
const { requestRequiredParams, queryListHandler, pagedHeaders } = require('../../shared/request');
module.exports = {
	getCabList: async (req, res, next) => {
		const required = [];
		const matches = [];
		const search = [];
		const include = [];
		const options = { include, matches, search }

		requestRequiredParams(req, required).then(() => {
			return queryListHandler(req, options)
		}).then((query) => {
			return models.Cab.findAndCountAll(query);
		}).then(function (data) {
			res.set(pagedHeaders(data.count)).status(200).send(data.rows);
		}).catch(err => {
			error(err.message);
			next(err);
		});
	},

	createCab: async (req, res, next) => {

		const newObject = req.body;
		models.Cab.create(newObject)
			.then(function (object) {
				if (object) {
					res.status(200).json(object);
				}
			}).catch(err => {
				error(err.message);
				next(err);
			});
	}
};
