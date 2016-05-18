var Boom        = require('boom');
var knex        = require('knex');
var bookshelf   = require('bookshelf');

exports.register = function (server, opts, next){
    
    server.route({
       method: "GET",
       path: '/',
       handler: function (req, res){
           console.log(req.url, req.query, req.params);
            var knexConnection = knex({
                client      : 'mysql',
                connection  : {
                    host: 'localhost',
                    user: 'root',
                    password: 'thinhaA@2',
                    database: 'bxm_orders',
                    charset: 'utf8'

                } 
           });
           
           var BookshelfInstance = bookshelf(knexConnection);
           var Orders = BookshelfInstance.Model.extend({
                tableName: 'orders'
            });
            
            
            Orders.where('id', 1250468).fetch({   
                pageSize: 15, // Defaults to 10 if not specified
                page: 3, // Defaults to 1 if not specified
            }).then(function (row){
            })
            
            
           return res(Boom.forbidden())   
       } 
    });   
    return next();
}
exports.register.attributes = {
    "name": "test-api"
}