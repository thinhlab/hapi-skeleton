"use strict";
class Response {
    constructor(opts) {
        this.error = false;
        this.message = "";
        this.error_message = "";
        this.status_code = 200;
        this.meta = {
            total: 0
        }
        this.data = [];
        if (opts) {
            _.assignIn(this, opts);
        }
    }
}

Response.prototype.isError = function() {
    return this.error;
}

Response.prototype.setData = function(data) {
    this.data = data || [];
}

exports.register = (server, opts, next) => {
    server.ext('onPreResponse', function(request, reply) {
        var response = request.response;
        if (response.isBoom ) {
            var new_response = new Response();
            new_response.status_code = response.output.payload.statusCode || 500;
            new_response.error_message = response.output.payload.error;
            new_response.error = response.output.payload.error.length > 0 ? true : false;
            response.output.payload = new_response;
        }

        return reply.continue();
    });
    return next();
}
exports.register.attributes = {
    "name": "customize-boom-response"
}
