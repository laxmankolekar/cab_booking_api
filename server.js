require('dotenv').config();
var rooty = require('rooty');
rooty();

const { info, clear } = require('^shared/logger');
const PORT = process.env.PORT ? process.env.PORT : '8000';
const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

require('./app')()
	.then(server => server.listen(PORT))
	.then(() => {
		// clear();
		info('app running on %s:%d', 'http://localhost', PORT);
		info('NODE_ENV %s', NODE_ENV);
		info('PORT %d', PORT);
		info('DB host %s', process.env.DB_URL);

	});
