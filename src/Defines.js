const mongo = require('mongoose')
const mongoconnecturl = "mongodb://localhost:27017/db?retryWrites=true&w=majority"
mongo.connect(mongoconnecturl,{useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{if(err) throw err; console.log("Api connected to database")})
module.exports = {
    mongo,
    port: {http:80},
    CScheme(DBName,scheme){
       return mongo.model(DBName, new mongo.Schema(scheme,{versionKey: false}))
    },
    requestLog(req){
        let data = {}
        console.group("New request:");
        console.log("Path: ",req.route.path)
        console.log("Methods: ",Object.keys(req.route.methods))
        console.log("Data:")
        Object.keys(req.body).length>0&&(data.body = req.body)
        Object.keys(req.query).length>0&&(data.query = req.query)
        Object.keys(req.params).length>0&&(data.params = req.params)
        console.table(data)
        console.groupEnd();
    }
}
