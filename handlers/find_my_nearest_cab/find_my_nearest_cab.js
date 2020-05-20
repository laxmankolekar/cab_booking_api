const models = require('../../models');
const { error } = require('../../shared/logger');
const { requestRequiredParams, queryListHandler, pagedHeaders } = require('../../shared/request');
var env = process.env.NODE_ENV || 'development';
const config = require('../../config/config')[env];

module.exports = {
	getFindMyNearestCabList: async (req, res, next) => {
		const required = ['latitude', 'longitude'];
		const matches = [];
		const search = [];
		const include = [];
		const options = { include, matches, search }
		let search_cab_redius = config.search_cab_redius;
		requestRequiredParams(req, required).then(() => {
			return queryListHandler(req, options)
		}).then((query) => {

			query.where.current_latitude = { $between: [req.query.latitude - search_cab_redius, req.query.latitude + search_cab_redius] }
			query.where.current_longitude = { $between: [req.query.longitude - search_cab_redius, req.query.longitude + search_cab_redius] }
			return models.Cab.findAndCountAll(query);
		}).then(function (data) {
			res.set(pagedHeaders(data.count)).status(200).send(data.rows);
		}).catch(err => {
			error(err.message);
			next(err);
		});
	},


};
