var Boom = require('boom');
exports.register = function (server, opts, next){
    
    server.route({
       method: "GET",
       path: '/',
       handler: function (req, res){
           return res(Boom.forbidden())   
       } 
    });   
    return next();
}
exports.register.attributes = {
    "name": "test-api"
}