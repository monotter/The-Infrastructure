const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app);
const io = require('socket.io')(server);
const mongo = require("mongoose")
mongo.connect(process.env.DataBaseURL,{useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{if(err) throw err; console.log("Api connected to database")})
server.listen(process.env.PORT,function() {
    console.log(`App Served on ${process.env.HTTP_Port} port.`)
    function Route(Path, Method) {
        this.Path = Path
        this.Method = Method
    }
    let Routes = []
    app._router.stack.forEach(function(middleware){
        if(middleware.route){
            let route = middleware.route
            Routes.push(new Route(route.path, route.stack[0].method));
        }
        else if(middleware.name === "router"){
            middleware.handle.stack.forEach(function(handler){
                let route = handler.route;
                route && Routes.push(new Route(route.path, route.stack[0].method));
            });
        }
    });
    console.log("Table Of App Routes:")
    console.table(Routes);
})
module.exports = {
    server,
    mongo,
    app,
    io,
}