require('dotenv').config();
const path = require("path")
const express = require("express")
const { app } = require(path.join(__dirname,"src/Server.js"))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("cors")());

app.set("view engine","ejs")
app.set('views', path.join(__dirname, 'src/Views'));

app.use(require(path.join(__dirname,"src/Controllers/message")))
app.use(require(path.join(__dirname,"src/Controllers/index")))
app.use(express.static(path.join(__dirname,"src/public")))
app.use("/js",express.static(path.join(__dirname,"node_modules/socket.io/client-dist")))
app.use(function(req, res){
    try{
        res.status(404)
        if (req.accepts('html')) {
            res.send({ error: 'Not found' })
            return
        }
        if (req.accepts('json')) {
            res.send({ error: 'Not found' })
            return
        }
        res.type('txt').send('Not found')
    }
    catch(err){
        res.status(500).send("Internal Server Error")
    }
});