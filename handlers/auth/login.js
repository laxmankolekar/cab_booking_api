const models = require('../../models');
const { getToken } = require('../../shared/auth');
const { validatePassword } = require('../../shared/auth');
const { error, info } = require('../../shared/logger');
const uuid4 = require('uuid4');
const generateRefreshToken = userId => {
	return models.RefreshToken.findOne({
		where: {
			user_id: userId,
			status: 'active',
		},
	}).then(tokenInfo => {
		if (!tokenInfo) {
			const refreshToken = uuid4();
			const newRefreshToken = {
				user_id: userId,
				refresh_token: refreshToken,
				status: 'active',
			};
			return models.RefreshToken.create(newRefreshToken);
		}
		return tokenInfo;
	});
};

module.exports = {
	/**
	 * summary: Login User
	 * description: Login User
	 * parameters:
	 * produces: application/json
	 * responses: 200
	 * operationId: login
	 */
	login: async (req, res, next) => {
		
		if (!req.body.email || !req.body.password) {
			const error = new Error('Parameters provided are invalid');
			error.errorCode = 400;
			next(error);
			return;
		}
		var condition = {
			where: { email: req.body.email },
		};

		//let kk = await models.User.findAll();

		models.User.findOne(condition)
			.then(function(user) {
				if (!user) {
					const error = new Error('User not found.');
					error.errorCode = 404;
					return next(error);
				} else if (user && !validatePassword(user.dataValues.password, req.body.password)) {
					const error = new Error('Password not matched');
					error.errorCode = 400;
					return next(error);
				} else {
					delete user.dataValues.password;
					generateRefreshToken(user.dataValues.id).then(refreshTokenInfo => {
						const refreshTokenData = refreshTokenInfo.toJSON();

						const authToken = getToken(user.dataValues);
						const token = {
							authToken,
							refreshToken: refreshTokenData.refresh_token
						};

						res.status(200).json({ status: 'success', token });
					});
				}
			})
			.catch(err => {
				error(err.message);
				next(err);
			});
	},
};
