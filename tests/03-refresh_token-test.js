'use strict';
const chakram = require('chakram');
const request = chakram.request;
const expect = chakram.expect;
const hitApi = require('request');
let authorization;
let refreshToken;
// const mocha = require('mocha');
// const timestamp = new Date().getTime();


describe('tests for /refresh_token', function() {
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
            refreshToken = (body.token || {}).refreshToken;
			done();
		});
	});
    
    describe('tests for post', function() {
        it('should respond 200 for "OK"', function() {
            const API_URL = process.env['TEST_URL'];
            var response = request('post', `${API_URL}/refresh_token`, {
                headers: {
					authorization,
				},
                body:{
                    "user_id": 2,
                    "refreshToken": refreshToken
                  },
                'time': true
            });

            expect(response).to.have.status(200);
            return chakram.wait();

        });

        it('should respond 400 for "Parameters provided are invalid"', function() {
            const API_URL = process.env['TEST_URL'];
            var response = request('post', `${API_URL}/refresh_token`, {
                headers: {
					authorization,
				},

                'time': true
            });

            expect(response).to.have.status(400);
            return chakram.wait();

        });    
    });
});