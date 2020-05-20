'use strict';
const chakram = require('chakram');
const request = chakram.request;
const expect = chakram.expect;
const hitApi = require('request');
let authorization;
// const mocha = require('mocha');
// const timestamp = new Date().getTime();


describe('tests for /login', function() {
    describe('tests for post', function() {
        it('should respond 200 for "OK"', function() {
            const API_URL = process.env['TEST_URL'];
            var response = request('post', `${API_URL}/login`, {
                headers: {
					authorization,
				},
                body: { email: 'test@email.com', password: 'password123' },
                'time': true
            });

            expect(response).to.have.status(200);
            return chakram.wait();

        });

        it('should respond 400 for "Parameters provided are invalid"', function() {
            const API_URL = process.env['TEST_URL'];
            var response = request('post', `${API_URL}/login`, {
                headers: {
					authorization,
				},

                'time': true
            });

            expect(response).to.have.status(400);
            return chakram.wait();

        });

        it('should respond 404 for "User not found"', function() {
            const API_URL = process.env['TEST_URL'];
            var response = request('post', `${API_URL}/login`, {
                headers: {
					authorization,
				},
                body: { email: 'nousertest@email.com', password: 'password123' },
                'time': true
            });

            expect(response).to.have.status(404);
            return chakram.wait();

        });    
    });
});