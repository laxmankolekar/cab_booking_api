'use strict';
const chakram = require('chakram');
const request = chakram.request;
const expect = chakram.expect;
const hitApi = require('request');
let authorization;
// const mocha = require('mocha');
// const timestamp = new Date().getTime();


describe('tests for /cab', function () {
    before(function (done) {
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

        hitApi(options, function (err, response, body) {
            authorization = `Bearer ${(body.token || {}).authToken || ''}`;
            done();
        });
    });

    describe('tests for get', function () {
        it('should respond 200 for "OK"', function () {
            const API_URL = process.env['TEST_URL'];
            var response = request('get', `${API_URL}/cab`, {
                headers: {
                    authorization,
                },

                'time': true
            });

            expect(response).to.have.status(200);
            expect(response).to.comprise.of.json({});
            return chakram.wait();

        });
    });

    describe('tests for post', function () {
        it('should respond 200 for "OK"', function () {
            const API_URL = process.env['TEST_URL'];
            var response = request('post', `${API_URL}/cab`, {
                headers: {
                    authorization,
                },
                'body': {
                    "cab_info": {
                        "cab_number": "MH11-CE-8226",
                        "driver_name": "deepak",
                        "driver_mobile": "8888225544"
                    },
                    "current_latitude": 133333333,
                    "current_longitude": 122222222
                },
                'time': true
            });

            expect(response).to.have.status(200);
            expect(response).to.comprise.of.json({
                "cab_info": {
                    "cab_number": "MH11-CE-8226",
                    "driver_name": "deepak",
                    "driver_mobile": "8888225544"
                },
                "current_latitude": 133333333,
                "current_longitude": 122222222
            });
            return chakram.wait();

        });
    });
});