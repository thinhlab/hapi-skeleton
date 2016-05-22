var Sequelize = require('sequelize');

var host     = "localhost";
var user     = "root";
var password = "thinhaA@2";

module.exports = {
    
    'bxm_metadata': new Sequelize('bxm_metadata', user, password, {
        host: host,
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        define: {
            timestamps: false // true by default
        }
    }),
    
    'bxm_orders': new Sequelize('bxm_orders', user, password, {
        host: host,
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        define: {
            timestamps: false // true by default
        }
    })
}