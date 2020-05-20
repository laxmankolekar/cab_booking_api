const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const helpers = {
	validatePassword: (value, value2) => {
		return bcrypt.compareSync(value2,value);
	},
	getPasswordHash: data => {
		return bcrypt.hashSync(data, 10);
	},
	getToken: data => {
		const opts = {
			// issuer: `https://${config.auth_domain}/`,
			// audience: config.auth_identifier,
			expiresIn: '2h',
			// subject: data.id.toString(),
			// algorithm: 'RS256',
		};
		let token;
		token = jwt.sign(data, config.auth_client_secret, opts);
		return token;
	}
};
module.exports = helpers;
