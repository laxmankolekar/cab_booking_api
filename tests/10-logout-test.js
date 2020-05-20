'use strict';
const chakram = require('chakram');
const request = chakram.request;
const expect = chakram.expect;
const hitApi = require('request');
let authorization;
// const mocha = require('mocha');
// const timestamp = new Date().getTime();


describe('tests for /logout', function() {
    before(function(done) {
		const API_URL = process.env['TEST_URL'];
		var options = {
			url: `${API_URL}/login`,
			method: 'POST',
			headers: {
				'User-Agent': 'request',
			},
			body: { email: 'test@email.com', password: 'password123' },
			json: true,
		};

		hitApi(options, function(err, response, body) {
			authorization = `Bearer ${(body.token || {}).authToken || ''}`;
			done();
		});
	});
    
    describe('tests for get', function() {
        it('should respond 200 for "OK"', function() {
            const API_URL = process.env['TEST_URL'];
            var response = request('get', `${API_URL}/logout`, {
                headers: {
					authorization,
				},

                'time': true
            });

            expect(response).to.have.status(200);
            return chakram.wait();

        });    
    });
});