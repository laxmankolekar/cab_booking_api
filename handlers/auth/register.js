const models = require('../../models');
const { error } = require('../../shared/logger');
const bcrypt = require('bcrypt');
let date = require('date-and-time');
let now = new Date();

module.exports = {
	register: async (req, res, next) => {
		const requiresParams = ['email', 'password', 'first_name', 'last_name'];
		const isInvalid = requiresParams.some(p => req.body[p] === undefined || req.body[p] === null || req.body[p] === '');
		if (isInvalid) {
			const error = new Error('Parameters provided are invalid');
			error.errorCode = 400;
			next(error);
			return;
		}
		const user = req.body;
		models.User.findOne({
			where: {
				email: user.email,
			},
		}).then(async existingUser => {
			if (existingUser) {
				const error = new Error('User already exists.');
				error.errorCode = 409;
				next(error);
			} else {
				user.password = bcrypt.hashSync(user.password, 10);
				user.status = "active";
				user.profile_image_url = user.profile_image_url ? user.profile_image_url : "";
				const newUser = await models.User.create(user);
				if (newUser) {
					const createdUser = newUser.dataValues;
					delete createdUser.password;
					res.status(200).json(createdUser);
				}
			}
		}).catch(err => {
			error(err.message);
			next(err);
		});
	},
};

