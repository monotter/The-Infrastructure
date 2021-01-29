var {app, db, Models} = require("../../Defines.js")

app.put("/message", async (req,res)=>{
  var {_id, content, sender} = req.body
  var prop = {}
  if(content) prop["content"] = content
  if(sender) prop["sender"] = sender
  await db.save(Models.message,{_id},{content,sender})
  var message = await db.get(Models.message,{_id})
  res.status(200).send(message)
})