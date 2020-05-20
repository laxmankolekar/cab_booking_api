const SwaggerParser = require('swagger-parser');
const swaggerRoutes = require('swagger-routes-express');
const http = require('http');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const express = require('express');
const swaggerUi = require('swagger-ui-express');

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

var env = process.env.NODE_ENV || 'development';
const api = require('./handlers');
const { error, clear } = require('./shared/logger');
const config = require('./config/config')[env];
const models = require('./models');
const swaggerDocument = require('./config/swagger.json');

const bearerAuthMiddleware = (req, res, next) =>
	passport.authenticate('jwt', { session: false }, (err, token, jwtError) => {
		if (err || jwtError) {
			const message = (jwtError && jwtError.message) || (err && err.message);
			const error = new Error(message);
			error.errorCode = 401;
			next(error);
			return;
		} else {
			req.user = token.toJSON();
			next();
		}
	})(req, res, next);

const makeApp = async () => {
	const parser = new SwaggerParser();
	const apiDescription = await parser.validate('./config/swagger.json');
	const connect = swaggerRoutes(api, apiDescription, {
		apiSeparator: '_',
		scopes: {
			default: bearerAuthMiddleware,
		}
	});

	const app = express();
	app.use(passport.initialize());

	// do any other app stuff, such as wire in passport, use cors etc
	const env = process.env.NODE_ENV || 'development';
	const server = http.createServer(app);

	// enable cors to share cross domain
	app.use(cors());

	// enables file uploading.
	app.use(
		multer({
			storage: multer.memoryStorage(),
			limits: {
				fileSize: 2500000,
			},
		}).fields([
			{
				name: 'file',
				maxCount: 1,
			},
			{
				name: 'image',
				maxCount: 1,
			},
		])
	);

	app.use(bodyparser.json());
	app.use(
		bodyparser.urlencoded({
			extended: true,
		})
	);
	if (env != 'production') {
		const publicDir = path.join(__dirname);
		app.use(express.static(publicDir));
	}
	// Then attach the routes
	connect(app);
	app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
	
	// add any error handlers last
	app.use((err, req, res, next) => {
		const message = err.message;
		let statusCode = 500;
		if (err.errorCode) {
			statusCode = err.errorCode;
		}
		error(message);
		res.status(statusCode)
			.json({ message })
			.end();
	});

	// Adding passport jwt authentication.
	const opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
	opts.secretOrKey = config.auth_client_secret;

	// opts.issuer = `https://${config.auth_domain}/`;
	// opts.audience = config.auth_identifier;
	// opts.algorithms = ['RS256'];
	passport.use(
		new JwtStrategy(opts, async function(jwt_payload, done) {
			try {
				const user = await models.User.findOne({
					where: { id: jwt_payload.id },					
					attributes: { exclude: ['password'] },
				});

				if (user) {
					done(null, user);
				} else {
					done({ message: 'unauthorized' }, false);
				}
			} catch (e) {
				done(e, false);
			}
		})
	);

	return server;
};
module.exports = makeApp;
