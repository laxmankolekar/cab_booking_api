const fs = require('fs');
const path = require('path');
const basepath = `${__dirname}/`;
const isRoute = file => ((file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'));
const basename = path.basename(module.filename);
	
// getting all the handlers and export to swagger apis.
const readdir = (dirname, routes) => {
	fs.readdirSync(dirname)
    .forEach(function(file) {
		let filepath = path.join(dirname, file);
		if (fs.lstatSync(filepath).isDirectory()) {
			readdir(filepath, routes)
		} else if(isRoute(file)) {
			const route = filepath.replace(basepath,'').replace('.js','');
			const handler = require(`./${route}`);
			routes.push(handler)
		}
	});
}

let routesArray = [];
readdir(__dirname, routesArray);
// routesArray.splice(-1,1);

let routes = Object.assign(...routesArray)
module.exports = routes;