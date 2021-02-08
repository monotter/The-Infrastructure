const {port} = require("./src/Defines")
const cors = require("cors")
const bodyparser = require("body-parser")
const express = require("express")
const path = require("path")
const app = require("express")()

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
app.set("view engine","ejs")
app.set('views', path.join(__dirname, '/src/Views'));

app.use(require("./src/Controllers/message"))
app.use(require("./src/Controllers/user"))
app.use(require("./src/Controllers/index"))
app.use(express.static('src/public'))
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

app.listen(port.http,function() {
    console.log(`App Served on ${port.http} port.`)
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
        else if(middleware.name === 'router'){
            middleware.handle.stack.forEach(function(handler){
                let route = handler.route;
                route && Routes.push(new Route(route.path, route.stack[0].method));
            });
        }
    });
    console.log(`Table Of App Routes:`)
    console.table(Routes);
})