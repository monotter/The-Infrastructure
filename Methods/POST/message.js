var {Models, db} = require("../../Defines.js")
app.post("/message",async (req,res)=>{
    var {content,sender} = req.body
    var message = await db.add(Models.message,{content,sender})
    res.status(200).send(message)
})