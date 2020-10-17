// check env.

const env = process.env.NODE_ENV || "development";
console.log(env);
// fetch env. config
var config = require("./config.json");
var dbconfig  = config[env];
Object.keys(dbconfig).forEach((key)=>{
    process.env[key] = dbconfig[key]
});

// var envConfig = config[env];
// // add env. config values to process.envconst env = process.env.NODE_ENV;
// Object.keys(envConfig).forEach(key => (process.env[key] = envConfig[key]));