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
            "plugin": {
                'register': './config',
                "options": {
                    "model_dir": ['web']
                }
            }
        },
        {
            "plugin": './utils/customize-boom-response'
        },
        {
            "plugin": './modules/test-api'
        }
    ]
};


