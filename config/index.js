"use strict";
var path = require('path');
var fs   = require('fs');

class ConfigLoader {
    constructor(server, opts){
        this.server = server;
        this.opts   = opts;
    }
}

ConfigLoader.prototype.setConfig =  function (config_obj, prefix,  is_global ) {
    config_obj  = config_obj    || {};
    is_global   = is_global     || false;
    
    if(prefix == undefined || prefix == "" || prefix == null){
        throw new Error("Configuaration prefix must not empty !");
    }
    if(!this.server.app.config){
        this.server.app.config = {};
    }
    
    for (var config_key in config_obj) {
        if (config_obj.hasOwnProperty(config_key)) {
            var config_value = config_obj[config_key];
            if(is_global == true){
                global[config_key] = config_value;
            }
            if(!this.server.app.config[prefix]){
                this.server.app.config[prefix] = {};
            }
            this.server.app.config[prefix][config_key] = config_value;
             
            // Require database schema 
            
            if(prefix == 'databases' && this.opts && this.opts.models_dir ){
                var _list_file = [];
                try{
                    // fetch all file in dir 
                    _list_file = fs.readdirSync(path.join(this.opts.models_dir, config_key));
                    
                } catch(error){
                    throw new Error(error.message);
                }
                
                _list_file.map(function (value){
                    var file_name = value.split('.').length > 0 ? value.split('.')[0] : "";
                    // Require module and set global variables;
                    global[file_name] = require(path.join('../',this.opts.models_dir, config_key, value))(config_value);
                });
            }
        }
    }
    return this;
}



exports.register = (server, opts, next) =>{
    var Loader = new ConfigLoader(server, opts);
    Loader
        .setConfig(require('./globals'), 'global', true)
        .setConfig(require('./app'), 'app', false)
        .setConfig(require('./databases'), 'databases', false);
    
    return next();
}
exports.register.attributes = {
    "name": "config-loader"
}


