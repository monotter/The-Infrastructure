var mongo = require('mongoose')
var _ = require('lodash')
module.exports = {
    message:{content: String, sender: String},
}

_.forIn(module.exports,(val,key)=>{
    module.exports[key] = mongo.model(key, new mongo.Schema(val,{versionKey: false}), key)
})

