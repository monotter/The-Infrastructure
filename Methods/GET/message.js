var {db, Models, app, _} = require("../../Defines.js")

app.get("/message",async (req,res)=>{
  try{
    var {index,unit} = req.query
    var index = index?index:0
    var unit = unit?(unit>2000?2000:unit):100
    delete req.query.index, req.query.unit
    var messages = await db.getMany(Models.message,req.query)
    var chunks = _.chunk(messages,unit)
    res.send({index,unit,length:messages.length,chunks:chunks.length,chunk:chunks[index]})
  }
  catch{
    res.send([])
  }
})