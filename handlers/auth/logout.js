module.exports = {
	logout: (req, res, next) => {
		try {
			req.logout();
			res.status(200).json({ message: 'You have been logged out successfully.' });
		} catch (e) {
			const error = new Error('Something went wrong.');
			next(error);
		}
	},
};
