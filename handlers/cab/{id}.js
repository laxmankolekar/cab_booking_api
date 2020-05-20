const models = require('^models');
const { error } = require('^shared/logger');
const { requestRequiredIdParams } = require('^shared/request');
module.exports = {

	getCabById: async (req, res, next) => {
		requestRequiredIdParams(req).then(() => {
			const query = { where: { id: req.params.id } };
			return query;
		}).then((query) => {
			return models.Cab.find(query);
		}).then(function (object) {
			if (!object) {
				const error = new Error('Cab not found');
				error.errorCode = 404;
				throw error;
			}
			res.status(200).json(object);
		}).catch(err => {
			error(err.message);
			next(err);
		});
	},

	updateCab: async (req, res, next) => {
		requestRequiredIdParams(req).then(() => {
			const query = { where: { id: req.params.id } };
			return query;
		}).then((query) => {
			if (!Object.keys(req.body).length) {
				const error = new Error('Validation Failed: invalid inputs');
				error.errorCode = 400;
				throw error;
			}
			return models.Cab.find(query);
		}).then(function (object) {
			if (!object) {
				const error = new Error('Cab not found');
				error.errorCode = 404;
				throw error;
			}
			let payload = req.body;
			return object.update(payload);
		}).then((object) => {
			res.status(200).json(object);
		}).catch(err => {
			error(err.message);
			next(err);
		});		
	},

	deleteCab: async (req, res, next) => {
		requestRequiredIdParams(req).then(() => {
			const query = { where: { id: req.params.id } };
			return query;
		}).then((query) => {
			return models.Cab.find(query);
		}).then(function (object) {
			if (!object) {				 
				const error = new Error('Cab not found');
				error.errorCode = 404;
				throw error;				
			}
			return object.destroy();
		}).then(function () {
			res.status(200).json({ status: 'success' });
		}).catch(err => {
			error(err.message);
			next(err);
		});
	}
};
