const Hapi      = require("hapi");
const fs        = require('fs');
const Glue      = require('glue');

Glue.compose(require('./manifest'), { relativeTo: process.cwd() }, function(error, server) {
    if(error){
        throw new Error(error);
    }
    server.start();
})


