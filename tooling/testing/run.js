const oatts = require('oatts');
const outputPath = './tests'
const templatesPath = './tooling/testing/templates'
const handlebars = require('handlebars')

handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

handlebars.registerHelper('trimId', function(url) {
    var url_components = url.split('/');
    url_components.pop();
    return( url_components.join('/') );
});

const services = {
    'gw-admin': 'Admin',
    'gw-app': 'App',
    // 'svc-auth': 'Auth',
}

/*const genTests = (svc, contract) => {
    const options = {
        templates: templatesPath,
        writeTo: `./tests/${svc}`,
        samples: true,
        host: contract,
        customValuesFile: `./external/contracts/${svc}-values.json`
    };
    const tests = oatts.generate(`./external/contracts/${svc}.json`, options);
}

for ( const svc in services ) {
    const contract = services[svc];
    genTests(svc,contract);
}*/

const options = {
    templates: templatesPath,
    writeTo: `./tests`,
    samples: true,
    host: 'TEST_URL',
    customValuesFile: `./config/values.json`
};
const tests = oatts.generate(`./config/swagger.json`, options);