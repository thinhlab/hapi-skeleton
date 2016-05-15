"use strict";
class ConfigLoader {
    constructor(server, opts){
        this.server = server;
        this.opts   = opts;
    }
}

ConfigLoader.prototype.loadGlobalConfig = function (_config){
    const config = _config || {};
    for (var atrribute in config){
        if(config.hasOwnProperty(atrribute)){
            global[atrribute] = config[atrribute];
        }
    }
    return this; 
}
ConfigLoader.prototype.loadDatabaseConfig = function (_config){
    return this;
}



exports.register = (server, opts, next) =>{
    var Loader = new ConfigLoader(server, opts);
    Loader
        .loadDatabaseConfig()
        .loadGlobalConfig(require('./globals'));
    
    return next();
}
exports.register.attributes = {
    "name": "config-loader"
}


