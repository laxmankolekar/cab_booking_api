const { RefreshToken, User } = require('../../models');
const { getToken } = require('../../shared/auth');
const { error } = require('../../shared/logger');

module.exports = {
	refreshToken: async (req, res, next) => {
		const { user_id, refreshToken } = req.body;

		if (!user_id || !refreshToken) {
			const error = new Error('Invalid Parameters');
			error.errorCode = 400;
			next(error);
			return;
		}
		RefreshToken.findOne({
			where: {
				user_id: user_id,
				refresh_token: refreshToken,
				status: 'active',
			},
			include: [{ model: User, as: 'User' }],
		})
			.then(refreshTokenInfo => {
				if (refreshTokenInfo) {
					const refreshTokenData = refreshTokenInfo.toJSON();
					const { User } = refreshTokenData;
					delete User.password;
					const authToken = getToken(User);
					const token = {
						authToken,
						refreshToken: refreshTokenData.refresh_token,
					};
					res.status(200).json({ status: 'success', token });
				} else {
					const error = new Error('Unauthorised');
					error.errorCode = 401;
					throw error;
				}
			})
			.catch(err => {
				error(err.message);
				next(err);
			});
	}
};
