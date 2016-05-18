"use strict";

module.exports = {
    "connections": [
        {
            "port": 3000,
            "labels": [
                "api2"
            ]
        }
    ],
    "server": {

    },
    "registrations": [
        {
            "plugin": './config'
        },
        {
            "plugin": './utils/customize-boom-response'
        },
        {
            "plugin": './modules/test-api'
        }
    ]
};


