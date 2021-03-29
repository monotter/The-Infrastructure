module.exports = {
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
