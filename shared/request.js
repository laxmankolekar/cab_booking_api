const qs = require('query-string');
const models = require('../models');

String.prototype.toTitleCase = function() {
	return this.replace(/\w\S*/g, function(txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
};

const requestRequiredParams = (req, required) => {
	return new Promise((resolve, reject) => {
		const params = [];
		required.forEach(r => {
			if (!req.query[r]) {
				params.push(r);
			}
		});

		if (params.length > 0) {
			reject({
				errorCode: 400,
				message: `Following params are required ${required}`,
				meta: {
					required,
				},
			});
		} else {
			resolve();
		}
	});
};

const queryListHandler = (req, options) => {
	return new Promise(resolve => {
		let { include, matches } = options;

		var query = {
			order: [],
			where: {},
			include: include || [],
		};

		if (req.query.limit) query.limit = req.query.limit;
		if (req.query.offset > 0 && req.query.limit) query.offset = (req.query.offset - 1) * req.query.limit;
		if (req.query.order_by) {
			const isValid = req.query.order === 'ASC' || req.query.order === 'DESC';
			var order = isValid ? req.query.order : 'DESC';
			query.order.push([req.query.order_by, order]);
		} else {
			query.order.push(['id', 'DESC']);
		}

		if (req.query.id) {
			let ids;
			if (Array.isArray(req.query.id)) {
				ids = req.query.id;
			} else {
				ids = req.query.id.split(',');
			}
			query.where.id = { $in: ids };
		}

		matches.forEach(function(field_name) {
			if (req.query[field_name]) {
				query.where[field_name] = req.query[field_name];
			}
		});
		if (req.query.includes) {
			const includes = req.query.includes.split(',');
			includes.forEach(r => {
				query.include.push({
					model: models[r.toTitleCase()],
					as: r.toTitleCase(),
				});
			});
		}
		resolve(query);
	});
};

const pagedHeaders = count => ({
	'Access-Control-Expose-Headers': 'X-Total-Count',
	'X-Total-Count': count,
});

const requestRequiredIdParams = req => {
	return new Promise((resolve, reject) => {
		if (isNaN(req.params.id)) {
			reject({
				errorCode: 400,
				error: 'object_invalidid',
				message: 'Invalid Object ID',
			});
		} else {
			resolve();
		}
	});
};

const getUrlQueryParams = url => {
	// url=url||'';
	if (!url) {
		return {};
	}
	// const params=url.substring(url);
	return qs.parse(url);
};
module.exports = {
	requestRequiredParams,
	requestRequiredIdParams,
	queryListHandler,
	pagedHeaders,
	getUrlQueryParams,
};
