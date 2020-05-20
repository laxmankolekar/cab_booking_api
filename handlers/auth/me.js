const models = require('../../models');
const { error } = require('../../shared/logger');
module.exports = {
	getMe: (req, res, next) => {
		if(req.user){
		res.status(200).json(req.user);
		}else{
			const error= new Error("User logged out");
			error.errorCode=404;
			next(error);
		}
	},
	updateCurrentUser: (req, res, next) => {
		const userId = req.user.id;
		const updateObj = req.body;

		if (isNaN(userId)) {
			res.status(400).json({
				errorCode: 400,
				error: 'object_invalidid',
				message: 'Invalid Object ID',
			});
			return;
		}
		if (updateObj.password) {
			delete updateObj.password;
		}
		models.User.find({
			where: {
				id: userId,
			},
		}).then((object) => {
			if (!object) {
				res.status(404).json({
					errorCode: 404,
					error: 'object_invalidid',
					message: 'User not Updated',
				});
				return;
			}
			return object.update(updateObj);
		}).then((object) => {
			const objectJSON = object.toJSON();
			delete objectJSON.password;
			res.status(200).json(objectJSON);
		}).catch((err) => {
			error(err.message);
			next(err);
		});
	}
};
