'use strict';
let date = require('date-and-time');
let now = new Date();
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('users', [
      {
        "id": 1,
        "email": "testuser@email.com",
        "password": "password123",
        "first_name": "Test",
        "last_name": "User"
      }
    ]).then(() => {
      return queryInterface.bulkInsert('cab', [
        {
          "id": 1,
          "cab_info": JSON.stringify({
            "cab_number": "MH11-CE-8226",
            "driver_name": "deepak",
            "driver_mobile": "8888225544"
          }),
          "current_latitude": 133333333,
          "current_longitude": 122222222
        },
        {
          "id": 2,
          "cab_info": JSON.stringify({
            "cab_number": "MH11-CE-8226",
            "driver_name": "deepak",
            "driver_mobile": "8888225544"
          }),
          "current_latitude": 133333333,
          "current_longitude": 122222222
        },
        {
          "id": 3,
          "cab_info": JSON.stringify({
            "cab_number": "MH11-CE-8226",
            "driver_name": "deepak",
            "driver_mobile": "8888225544"
          }),
          "current_latitude": 133333333,
          "current_longitude": 122222222
        }
      ])


    }).then(() => {
      return queryInterface.bulkInsert('cab_booking', [
        {
          "id": 1,
          "user_id": 1,
          "cab_id": 1,
          "pickup_info": JSON.stringify({
            "latitude": 133333333,
            "longitude": 122222222,
            "area": "Pune Univercity"
          }),
          "drop_info": JSON.stringify({
            "latitude": 133333333,
            "longitude": 122222222,
            "area": "IT Park Pune"
          }),
          "status": "done"
        },
        {
          "id": 2,
          "user_id": 1,
          "cab_id": 2,
          "pickup_info": JSON.stringify({
            "latitude": 133333333,
            "longitude": 122222222,
            "area": "Pune Univercity"
          }),
          "drop_info": JSON.stringify({
            "latitude": 133333333,
            "longitude": 122222222,
            "area": "IT Park Pune"
          }),
          "status": "inprogress"
        },
        {
          "id": 3,
          "user_id": 1,
          "cab_id": 3,
          "pickup_info": JSON.stringify({
            "latitude": 133333333,
            "longitude": 122222222,
            "area": "Pune Univercity"
          }),
          "drop_info": JSON.stringify({
            "latitude": 133333333,
            "longitude": 122222222,
            "area": "IT Park Pune"
          }),
          "status": "inprogress"
        }
      ])
    }).then(() => {
      return queryInterface.sequelize.query(
        "SELECT setval('users_id_seq', COALESCE((SELECT MAX(id)+1 FROM users), 1), false);" +
        "SELECT setval('refresh_token_id_seq', COALESCE((SELECT MAX(id)+1 FROM refresh_token), 1), false);" +
        "SELECT setval('cab_id_seq', COALESCE((SELECT MAX(id)+1 FROM cab), 1), false);" +
        "SELECT setval('cab_booking_id_seq', COALESCE((SELECT MAX(id)+1 FROM cab_booking), 1), false);"

      );
    });
  },

  down: (queryInterface, Sequelize) => {
    //queryInterface.bulkDelete('user', null, {});
  },
};
