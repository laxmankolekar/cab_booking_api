'use strict';
const chakram = require('chakram');
const request = chakram.request;
const expect = chakram.expect;
const hitApi = require('request');
let authorization;
// const mocha = require('mocha');
// const timestamp = new Date().getTime();


describe('tests for /cab_booking/{id}', function() {
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
            var response = request('get', `${API_URL}/cab_booking/1`, {
                headers: {
					authorization,
				},

                'time': true
            });

            expect(response).to.have.status(200);
            expect(response).to.comprise.of.json({"user_id":1,"cab_id":1,"status":"done"});
            return chakram.wait();

        });

        it('should respond 400 for "Invalid id supplied"', function() {
            const API_URL = process.env['TEST_URL'];
            var response = request('get', `${API_URL}/cab_booking/NotAValidID`, {
                headers: {
					authorization,
				},

                'time': true
            });

            expect(response).to.have.status(400);
            return chakram.wait();

        });

        it('should respond 404 for "CabBooking not found"', function() {
            const API_URL = process.env['TEST_URL'];
            var response = request('get', `${API_URL}/cab_booking/9999`, {
                headers: {
					authorization,
				},

                'time': true
            });

            expect(response).to.have.status(404);
            return chakram.wait();

        });    
    });
    
    describe('tests for put', function() {
        it('should respond 200 for "OK"', function() {
            const API_URL = process.env['TEST_URL'];
            var response = request('put', `${API_URL}/cab_booking/2`, {
                headers: {
					authorization,
				},
                'body': {"user_id":1,"cab_id":1,"status":"inprogress"},
                'time': true
            });

            expect(response).to.have.status(200);
            expect(response).to.comprise.of.json({"user_id":1,"cab_id":1,"status":"inprogress"});
            return chakram.wait();

        });

        it('should respond 400 for "Invalid id supplied"', function() {
            const API_URL = process.env['TEST_URL'];
            var response = request('put', `${API_URL}/cab_booking/NotAValidID`, {
                headers: {
					authorization,
				},

                'time': true
            });

            expect(response).to.have.status(400);
            return chakram.wait();

        });

        it('should respond 404 for "CabBooking not found"', function() {
            const API_URL = process.env['TEST_URL'];
            var response = request('put', `${API_URL}/cab_booking/9999`, {
                headers: {
					authorization,
				},
                'body': {"user_id":1,"cab_id":1,"status":"inprogress"},
                'time': true
            });

            expect(response).to.have.status(404);
            return chakram.wait();

        });    
    });
    
    describe('tests for delete', function() {
        it('should respond 200 for "OK"', function() {
            const API_URL = process.env['TEST_URL'];

            var response = request('delete', `${API_URL}/cab_booking/1`, {
                headers: {
                    authorization,
                },
                'time': true
            });


            expect(response).to.have.status(200);
            return chakram.wait();

        });

        it('should respond 400 for "Invalid id supplied"', function() {
            const API_URL = process.env['TEST_URL'];

            var response = request('delete', `${API_URL}/cab_booking/NotAValidID`, {
                headers: {
                    authorization,
                },

                'time': true
            });


            expect(response).to.have.status(400);
            return chakram.wait();

        });

        it('should respond 404 for "CabBooking not found"', function() {
            const API_URL = process.env['TEST_URL'];

            var response = request('delete', `${API_URL}/cab_booking/9999`, {
                headers: {
                    authorization,
                },

                'time': true
            });


            expect(response).to.have.status(404);
            return chakram.wait();

        });    
    });
});