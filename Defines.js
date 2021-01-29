var mongo = require('mongoose')
var express = require('express')
app = express()
var mongoconnecturl = "mongodb://localhost:27017/db?retryWrites=true&w=majority"

mongo.connect(mongoconnecturl,{useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{if(err) throw err; console.log("Api connected to database")})
module.exports = {
    mongo,
    app,
    fs:require("fs"),
    _:require('lodash'),
    bodyparser:require('body-parser'),
    db:require('ez-mongoose'),
    cors:require('cors'),
    Models:require('./Models.js'),
    http:require('http'),
    port: {http:8080},
    dirname:__dirname,
}
