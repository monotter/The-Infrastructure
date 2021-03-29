const DBModel = require("simple-db-model")
const mongo = require("mongoose")
module.exports = new DBModel("message", {
    content: String,
    sender: String
},mongo)