const {requestLog} = require("../Functions")
const _ = require("lodash")
const express = require('express')
const model = require("../Models/message")
const { io } = require("../Server")
const router = express.Router()
router.post("/api/message",async (req,res)=>{
    requestLog(req)
    if(await model.count() >= process.env.MessageLimit) return res.status(400).send(`You cant add more than ${process.env.MessageLimit}`)
    let {content,sender} = req.body
    let message = await model.insert({content,sender})
    console.log()
    io.emit('newMessage', message)
    res.sendStatus(200);
})
router.get("/api/message",async (req,res)=>{
    requestLog(req)
    try {
        let {index,unit} = req.query
        index = index?index:0
        unit = unit?(unit>2000?2000:unit):100
        delete req.query.index, req.query.unit
        let messages = await model.select(req.query)
        let chunks = _.chunk(messages,unit)
        res.send({index,unit,length:messages.length,chunks:chunks.length,chunk:chunks[index]})
    }
    catch {
        res.send({index:0,unit:0,length:0,chunks:0,chunk:[]})
    }
})
router.put("/api/message", async (req,res)=>{
    requestLog(req)
    let {_id, content, sender} = req.body
    let prop = {}
    if(content) prop["content"] = content
    if(sender) prop["sender"] = sender
    await model.update({_id},{content,sender})
    let message = await model.select({_id},{multiple:false})
    io.emit('updateMessage', message)
    res.sendStatus(200);
})
router.delete("/api/message",async (req,res)=>{
    requestLog(req)
    let {_id} = req.body
    let message = await model.select({_id},{multiple:false})
    await model.delete({_id},{multiple:false})
    io.emit('deleteMessage', message)
    res.sendStatus(200);
})

router.get("/message/:_id",async (req,res)=>{
    requestLog(req)
    let message = await model.select(req.params,{multiple:false})
    res.render("message",message)
})
module.exports = router