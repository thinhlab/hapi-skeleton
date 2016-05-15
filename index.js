const Hapi      = require("hapi");
const fs        = require('fs');
const Glue      = require('glue');

Glue.compose(require('./manifest'), { relativeTo: process.cwd() }, (error, server) => {
    if(error){
        console.log(error);
        throw error;
    }
    server.start((err) => {
        if(err){
            console.log(err);
            throw err;
        }
        console.log("Hapi server start at", server.info.uri);
        
    });
})


