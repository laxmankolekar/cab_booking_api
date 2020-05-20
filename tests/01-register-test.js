'use strict';
const chakram = require('chakram');
const request = chakram.request;
const expect = chakram.expect;
const hitApi = require('request');
let authorization;
// const mocha = require('mocha');
// const timestamp = new Date().getTime();


describe('tests for /register', function () {
    
    describe('tests for post', function () {
        it('should respond 200 for "OK"', function () {
            const API_URL = process.env['TEST_URL'];
            var response = request('post', `${API_URL}/register`, {
                headers: {
                    authorization,
                },
                'body': { "email": "test@email.com", "password": "password123", "first_name": "Test", "last_name": "User" },
                'time': true
            });

            expect(response).to.have.status(200);
            expect(response).to.comprise.of.json({
                email: "test@email.com",
                first_name: "Test",
                last_name: "User",
                mobile_number: "",
                profile_image_url: "",
                status: "active"
            });
            return chakram.wait();

        });

        it('should respond 400 for "Parameters provided are invalid"', function () {
            const API_URL = process.env['TEST_URL'];
            var response = request('post', `${API_URL}/register`, {
                headers: {
                    authorization,
                },

                'time': true
            });

            expect(response).to.have.status(400);
            return chakram.wait();

        });

        it('should respond 409 for "User already exists"', function () {
            const API_URL = process.env['TEST_URL'];
            var response = request('post', `${API_URL}/register`, {
                headers: {
                    authorization,
                },
                'body': { "email": "test@email.com", "password": "password123", "first_name": "Test", "last_name": "User" },
                'time': true
            });

            expect(response).to.have.status(409);
            return chakram.wait();

        });
    });
});