var {db, Models, app} = require("../../Defines.js")
app.delete("/message",async (req,res)=>{
  var {_id} = req.body
  var message = await db.get(Models.message,{_id})
  await db.remove(Models.message,{_id})
  res.status(200).send(message)
})